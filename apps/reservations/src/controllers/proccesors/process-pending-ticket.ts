import { Request, Response } from 'express'

const processPendingTicket = async (req: Request, res: Response) => {
  try {
    const message = req.body

    const pendingTickets = await req.context.prisma.availableTickets.findFirst({
      where: {
        matchNumber: message.body.matchNumber,
        category: { equals: message.body.tickets.category },
      },
      select: {
        id: true,
        pending: true,
      },
    });

    if (!pendingTickets) {
      throw new Error('there are no available tickets such as these')
    }

    const newPending = pendingTickets.pending + message.body.tickets.quantity;

    const tickets = await req.context.prisma.availableTickets.update({
      where: {
        id: pendingTickets.id,
      },
      data: {
        pending: newPending,
      },
    });

    res.status(200).json(tickets)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
};

export default processPendingTicket