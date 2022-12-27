import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import { PORT } from './constants'
import { CLIENT_URL } from 'tickets22-shop/src/constants'
import payments from './routes/payments'

const server = express()

server.use(cors())
server.use(cookieParser())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.use('/payements', payments)
server.get('/', (req, res) => {
  res.redirect(`${CLIENT_URL}/help/microservices/payments`)
})

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

export default server