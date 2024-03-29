import { Request, Response } from 'express'

const processReservedTicket = async (req: Request, res: Response) => {
  try {

    const message = req.body

    const reservedTickets = await req.context.prisma.availableTickets.findFirst({
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

    if (!reservedTickets) {
      return res.status(400).json({ message: 'there are no available tickets such as these' })
    }

    const newPending = reservedTickets.pending - message.body.tickets.quantity;

    if (newPending < 0) {
      return res.status(400).json({ message: 'cannot reserve as pending tickets value would be less than zero' })
    }

    const tickets = await req.context.prisma.availableTickets.update({
      where: {
        id: reservedTickets.id,
      },
      data: {
        pending: newPending,
      },


    })

    res.status(200).json(tickets)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export default processReservedTicket