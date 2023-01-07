import { Request, Response } from 'express'

const processPendingTicket = async (req: Request, res: Response) => {
  try {
    const message = req.body

    const tickets = await req.context.prisma.availableTickets.findFirst({
      where: {
        matchNumber: message.body.matchNumber,
        category: { equals: message.body.tickets.category },
      },
      select: {
        id: true,
        available: true,
        pending: true,
      },
    })

    if (!tickets) {
      return res.status(400).json({
        message: 'No tickets available',
      })
    }

    const newPending = tickets.pending + message.body.tickets.quantity
    const newAvailable = tickets.available - message.body.tickets.quantity

    await req.context.prisma.availableTickets.update({
      where: {
        id: tickets.id,
      },
      data: {
        pending: newPending,
        available: newAvailable,
      },
    })

    res.status(200).json({
      message: 'Pending ticket processed',
    })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export default processPendingTicket