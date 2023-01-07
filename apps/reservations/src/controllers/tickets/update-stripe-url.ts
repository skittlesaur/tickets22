import { Request, Response } from 'express'

const updateStripeUrl = async (req: Request, res: Response) => {
  try {
    const { ticketIds, url } = req.body

    const tickets = await req.context.prisma.reservedTicket.updateMany({
      where: {
        id: {
          in: ticketIds,
        },
      },
      data: {
        stripeCheckoutUrl: url,
      },
    })

    res.status(200).json(tickets)
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

export default updateStripeUrl