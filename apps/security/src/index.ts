import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import { CLIENT_URL, PORT, SECURE_ENDPOINT_SECRET } from './constants'
import { PrismaClient, User } from '@prisma/client'
import auth from './routes/auth'
import me from './routes/me'
import validate from './routes/validate'
import verify from './routes/verify'
import decode from './controllers/decode'

declare global {
  namespace Express {
    interface Request {
      context: {
        prisma: PrismaClient,
        user?: User | any,
      }
    }
  }
}

const server = express()

server.use(cors({
  origin: CLIENT_URL,
  credentials: true,
}))
server.use(cookieParser())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.use((req, res, next) => {
  try {
    req.context = {
      prisma: new PrismaClient(),
    }
    next()
  } catch (e) {
    return res.status(400).json({
      message: 'Prisma initialization failure',
    })
  }
})

server.use('/auth', auth)
server.use('/me', me)
server.use('/verify', verify)
server.use('/validate', validate)
server.get(`/decode-${SECURE_ENDPOINT_SECRET}/:token`, decode)

server.get('/', (req, res) => {
  res.redirect(`${CLIENT_URL}/help/microservices/security`)
})

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

export default server