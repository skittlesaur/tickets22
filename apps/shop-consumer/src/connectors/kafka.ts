require('dotenv').config()
import { TICKET_RESERVED, TICKET_PENDING, TICKET_CANCELLED } from '../constants';
import { processPendingTicket, processReservedTicket, processCancelledTicket, processMasterlist } from '../proccesors/shop'
import { kafkaMasterlistMessage, kafkaMessage } from '../validation/kafka';
import { Kafka } from 'kafkajs'
import { isEmpty } from 'lodash'

const kafka = new Kafka({
  clientId: `${process.env.CLIENT_ID}-${process.env.ENV}`,
  brokers: [`${process.env.KAFKA_BROKERS}`],
  ssl: true,
  logLevel: 2,
  sasl: {
    mechanism: 'plain',
    username: `${process.env.KAFKA_SASL_USERNAME}`,
    password: `${process.env.KAFKA_SASL_PASSWORD}`,
  },
})

// Kafka Topics
const topic = `${process.env.TOPIC_FIFA_TICKET_SALES}-${process.env.ENV}`
const masterlistTopic = `${process.env.TOPIC_FIFA_MASTER_LIST}-${process.env.ENV}`

// Kafka Consumers
const consumer = kafka.consumer({
  groupId: `${process.env.TICKETS_GROUP_ID}-${process.env.ENV}`,
})
const masterlistConsumer = kafka.consumer({
  groupId: `${process.env.MASTERLIST_GROUP_ID}-${process.env.ENV}`,
})

export const startKafkaConsumer = async () => {
  // Connect consumers
  await consumer.connect()
  await masterlistConsumer.connect()

  // Subscribe consumers to topics
  await consumer.subscribe({ topic, fromBeginning: true })
  await masterlistConsumer.subscribe({
    topic: masterlistTopic,
    fromBeginning: true,
  })

  // Ticket Sales Message Handler
  await consumer.run({
    eachMessage: async ({ topic, partition, message }: any) => {
      try {
        // Deserialize message body
        const parsedMessage = JSON.parse(message.value)
        if (isEmpty(parsedMessage)) {
          throw new Error('cannot process empty message')
        }

        // process message if there is no validation error
        const validationError = kafkaMessage(parsedMessage)
        if (!isEmpty(validationError)) {
          throw new Error(
            `cannot process message with validation error: ${validationError.message}`)
        }

        console.log('kafka message recieved successfully')

        // determine which processor to call
        const messageType = parsedMessage.meta.action
        switch (messageType) {
          case TICKET_PENDING:
            await processPendingTicket(parsedMessage)
            break
          case (TICKET_RESERVED):
            await processReservedTicket(parsedMessage)
            break
          case (TICKET_CANCELLED):
            await processCancelledTicket(parsedMessage)
            break
        }

      } catch (error: any) {
        console.log(error)
      }
    },
  })

  await masterlistConsumer.run({
    eachMessage: async ({ topic: masterlistTopic, partition, message }: any) => {
      try {
        // Deserialize message body
        const parsedMessage = JSON.parse(message.value)
        if (isEmpty(parsedMessage)) {
          throw new Error(`cannot process empty message`)
        }

        // process message if there is no validation error
        const validationError = kafkaMasterlistMessage(parsedMessage)
        if (!isEmpty(validationError)) {
          throw new Error(`cannot process master list message with validation error: ${validationError.message}`)
        }

        console.log('masterlist message received succesfully')
        // call the processor
        await processMasterlist(parsedMessage)
      } catch (error: any) {
        console.log(error)
      }
    },
  })
}

module.exports = {
  startKafkaConsumer,
}
