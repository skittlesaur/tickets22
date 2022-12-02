import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import { CLIENT_URL, PORT } from './constants'
import { PrismaClient, User } from '@prisma/client'
import matches from './routes/matches'

declare global {
  namespace Express {
    interface Request {
      context: {
        prisma: PrismaClient,
        user?: User
      }
    }
  }
}

const server = express()

server.use(cors())
server.use(cookieParser())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.use((req, res, next) => {
  req.context = {
    prisma: new PrismaClient(),
  }
  next()
})

server.use('/matches', matches)

server.get('/', (req, res) => {
  res.redirect(`${CLIENT_URL}/help/microservices/shop`)
})

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

export default server