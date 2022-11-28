import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import { PORT } from './constants'

const server = express()

server.use(cors())
server.use(cookieParser())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.get('/', (req, res) => {
  res.send('Hello Tickets22!')
})

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

export default server