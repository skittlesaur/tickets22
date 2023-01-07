import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import { CLIENT_URL, PORT } from './constants'
import tickets from './routes/tickets'
import { PrismaClient, User } from '@prisma/client'
import { startKafkaProducer } from './connectors/kafka'

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

const app = express()

app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
}))

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  req.context = {
    prisma: new PrismaClient(),
  }
  next()
})


// Start Kafka Producer
startKafkaProducer()

app.use('/tickets', tickets)
app.get('/', (req, res) => {
  res.redirect(`${CLIENT_URL}/help/microservices/reservations`)
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
  })
}

export default app