import { Request, Response } from 'express'

const secureUserTickets = async (req: Request, res: Response) => {
  try {
    const { email, select } = req.body
    const { prisma } = req.context

    if (!email) {
      return res.status(400).json({
        message: 'Email is required',
      })
    }

    const tickets = await prisma.reservedTicket.findMany({
      where: {
        email,
      },
      select,
    })

    return res.status(200).json(tickets)
  } catch (e) {
    return res.status(500).json({
      message: 'Something went wrong',
    })
  }
}

export default secureUserTickets