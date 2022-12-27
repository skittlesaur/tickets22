require("dotenv").config();
const { Kafka } = require("kafkajs");
const validate = require("../validation/kafka");
const messages = require("../constants");

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

const topic = `${process.env.TOPIC_FIFA_TICKET_SALES}-${process.env.ENV}`;
const producer = kafka.producer();

const startKafkaProducer = async () => {
  await producer.connect();
};

const sendKafkaMessage = async (messageType, message) => {
  try {
    // validate kafka message against schema prior to sending
    const validationError = validate.kafkaMessage(message);
    if (validationError) {
      throw new Error(validationError.message);
    }

    //send message to kafka broker
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });

    // successfully exit
    console.log("kafka message successfully sent");
  } catch (error) {
    console.log({ messageValidationError: error.message });
  }
};

module.exports = {
  startKafkaProducer,
  sendKafkaMessage,
};
