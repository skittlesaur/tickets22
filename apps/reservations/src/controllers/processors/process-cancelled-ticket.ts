import { Request, Response } from 'express'

const processCancelledTicket = async (req: Request, res: Response) => {
  try {

    const message = req.body

    const cancelledTickets = await req.context.prisma.availableTickets.findFirst({
      where: {
        matchNumber: message.body.matchNumber,
        category: { equals: message.body.tickets.category },
      },
      select: {
        id: true,
        pending: true,
      },
    });

    if (!cancelledTickets) {
      return res.status(400).json({ message: 'there are no available tickets such as these' })
    }

    const newCancelled = cancelledTickets.pending - message.body.tickets.quantity;

    if (newCancelled < 0) {
      return res.status(400).json({ message: 'Cannot cancel ticket sales as new value is lower than zero' })
    }

    const tickets = await req.context.prisma.availableTickets.update({
      where: {
        id: cancelledTickets.id,
      },
      data: {
        pending: newCancelled,
      },
    });

    res.status(200).json(tickets)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }

};

export default processCancelledTicket