import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import { CLIENT_URL, PORT } from './constants'
import { PrismaClient, User } from '@prisma/client'
import matches from './routes/matches'
import stadiums from './routes/stadiums'
import team from './routes/team'

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

export const app = express()

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

app.use('/matches', matches)
app.use('/stadiums', stadiums)
app.use('/team', team)

app.get('/', (req, res) => {
  res.redirect(`${CLIENT_URL}/help/microservices/shop`)
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
  })
}

// scrapeEvents()
export default app