import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import { PORT } from './constants'
import { CLIENT_URL } from 'tickets22-shop/src/constants'
const { startKafkaConsumer } = require('./connectors/kafka');

const server = express()

server.use(cors())
server.use(cookieParser())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))


startKafkaConsumer()

server.get('/', (req, res) => {
  res.redirect(`${CLIENT_URL}/help/microservices/shop-consumer`)
})

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

export default server