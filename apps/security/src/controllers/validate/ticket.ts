import { Request, Response } from 'express'

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

    if (ticket.ipAddress === ipAddress) {
      return res.status(200).json({
        message: 'Ticket validated',
      })
    }

    return res.status(403).json({
      message: 'Ticket validation failed',
    })
  } catch (e) {
    return res.status(400).json({
      message: 'Ticket validation failed',
    })
  }
}

export default validateTicket