import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../constants'

const validateTicket = async (req: Request, res: Response) => {
  try {
    const user = req.context.user
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const { ticket } = req.body

    if (user && user.id === ticket.userId) {
      return res.status(200).json({
        message: 'Ticket validated',
      })
    }

    console.log(ipAddress, ticket.ipAddress)
    if (ticket.ipAddress === ipAddress) {
      return res.status(200).json({
        message: 'Ticket validated',
      })
    }

    const ticketsCookie = req.cookies['tickets']

    if (ticketsCookie) {
      const decoded = jwt.verify(ticketsCookie, JWT_SECRET) as any
      const tickets = decoded.tickets?.map((ticket: any) => ticket.id)

      if (tickets.includes(ticket.id)) {
        return res.status(200).json({
          message: 'Ticket validated',
        })
      }
    }

    return res.status(403).json({
      message: 'Ticket validation failed',
    })
  } catch (e: any) {
    return res.status(400).json({
      message: 'Ticket validation failed',
    })
  }
}

export default validateTicket