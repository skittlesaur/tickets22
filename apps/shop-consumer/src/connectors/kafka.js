require("dotenv").config();
const { isEmpty } = require("lodash");
const { Kafka } = require("kafkajs");
const validate = require("../validation/kafka");
import {
  TICKET_RESERVED,
  TICKET_PENDING,
  TICKET_CANCELLED,
} from "../constants";
const shopProcessor = require("../proccesors/shop");

const kafka = new Kafka({
  clientId: `${process.env.CLIENT_ID}-${process.env.ENV}`,
  brokers: [process.env.KAFKA_BROKERS],
  ssl: true,
  logLevel: 2,
  sasl: {
    mechanism: "plain",
    username: process.env.KAFKA_SASL_USERNAME,
    password: process.env.KAFKA_SASL_PASSWORD,
  },
});

// Kafka Topics
const topic = `${process.env.TOPIC_FIFA_TICKET_SALES}-${process.env.ENV}`;
const masterlistTopic = `${process.env.TOPIC_FIFA_MASTER_LIST}-${process.env.ENV}`;

// Kafka Consumers
const consumer = kafka.consumer({
  groupId: `${process.env.TOPIC_FIFA_TICKET_SALES}-${process.env.ENV}`,
});
const masterlistConsumer = kafka.consumer({
  groupId: `${process.env.TOPIC_FIFA_MASTER_LIST}-${process.env.ENV}`,
});

const startKafkaConsumer = async () => {
  // Connect consumers
  await consumer.connect();
  await masterlistConsumer.connect();

  // Subscribe consumers to topics
  await consumer.subscribe({ topic, fromBeginning: true });
  await masterlistConsumer.subscribe({
    topic: masterlistTopic,
    fromBeginning: true,
  });

  // Ticket Sales Message Handler
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        // Deserialize message body
        const parsedMessage = JSON.parse(message.value);
        if (isEmpty(parsedMessage)) {
          console.log("cannot process empty message");
          return;
        }

        // process message if there is no validation error
        const validationError = validate.kafkaMessage(parsedMessage);
        if (!isEmpty(validationError)) {
          console.log(
            "cannot process message with validation error:",
            validationError.message
          );
          return;
        }

        // determine which processor to call
        const messageType = parsedMessage.meta.action;
        const processMessage = {
          [TICKET_PENDING]: shopProcessor.processPendingTicket,
          [TICKET_CANCELLED]: shopProcessor.processCancelledTicket,
          [TICKET_RESERVED]: shopProcessor.processReservedTicket,
        }[messageType];

        // call the processor
        await processMessage(parsedMessage);
      } catch (e) {
        console.log("Unable to process message");
      }
    },
  });

  await masterlistConsumer.run({
    eachMessage: async ({ topic: masterlistTopic, partition, message }) => {
      try {
        // Deserialize message body
        const parsedMessage = JSON.parse(message.value);
        if (isEmpty(parsedMessage)) {
          console.log("cannot process empty message");
          return;
        }

        // process message if there is no validation error
        const validationError = validate.kafkaMasterlistMessage(parsedMessage);
        if (!isEmpty(validationError)) {
          console.log(
            "cannot process master list message with validation error:",
            validationError.message
          );
          return;
        }

        // call the processor
        await shopProcessor.processMasterlist(parsedMessage);
      } catch (e) {
        console.log("Unable to process message");
      }
    },
  });
};

module.exports = {
  startKafkaConsumer,
};
