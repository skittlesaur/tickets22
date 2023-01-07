import { Request, Response } from 'express'
import axios from 'axios'
import { PAYMENTS_URL, TICKET_PENDING } from '../../constants'
import { sendKafkaMessage } from '../../connectors/kafka'
import { TicketStatus } from '@prisma/client'
import generateSeat from '../lib/generateSeat'

const startTicketCheckout = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context

    const user = req.context.user
    const userId = user?.id
    const ipAddress = (req.headers['x-forwarded-for'] || req.socket.remoteAddress) as string

    const check = await prisma.availableTickets.findFirst({
      where: {
        matchNumber: req.body.matchNumber,
        category: parseInt(req.body.ticketType),
      },
      select: {
        available: true,
        pending: true,
        price: true,
        match: {
          select: {
            homeTeam: {
              select: {
                name: true,
              },
            },
            awayTeam: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    if (!check) return res.status(400).json({ message: 'These tickets dont exist' })

    const data = {
      email: req.body.email,
      seatPosition: req.body.seatPosition.toUpperCase(),
      matchNumber: req.body.matchNumber,
      tickets: {
        category: parseInt(req.body.ticketType),
        quantity: req.body.quantity,
        price: check.price,
      },

    }

    if (data.tickets.quantity > check?.available) return res.status(400).json({ message: `The quantity you ordered isn\'t available, only ${check.available} tickets left` })

    if (check.pending + data.tickets.quantity > check.available) return res.status(400).json({ message: `There are ${check.pending} purchases pending out of ${check.available} tickets available, please try again later` })

    let ticketIds: string[] = []

    for (let i = 0; i < data.tickets.quantity; i++) {

      const ticket = await prisma.reservedTicket.create({
        data: {
          userId: userId,
          email: data.email,
          matchNumber: data.matchNumber,
          price: check.price,
          category: data.tickets.category,
          status: TicketStatus.PENDING,
          ipAddress: ipAddress,
          seatPosition: data.seatPosition,
          seatRow: generateSeat(data.tickets.category).seatRow,
          seatNumber: Math.floor(Math.random() * (100 - 1) + 1),
        },
      })

      ticketIds.push(ticket.id)
    }

    await sendKafkaMessage(TICKET_PENDING, {
      meta: { action: TICKET_PENDING },
      body: {
        matchNumber: data.matchNumber,
        tickets: data.tickets,
      },
    })

    let tries = 5

    do {
      try {
        const stripeSession = await axios.post(`${PAYMENTS_URL}/payments/`, {
          data: {
            ...data,
            match: check.match,
          },
          ticketIds,
        })

        return res.status(200).json({ url: stripeSession.data.url })
      } catch (e) {
        console.log(`Error creating stripe session ${5 - tries}/5`)
      }
    } while (tries--)

    return res.status(500).json({
      message: 'Something went wrong',
      details: 'Couldn\'t create stripe session',
    })
  } catch (e: any) {
    if (e.isAxiosError)
      return res.status(e.response.statusCode).json(e.response.data)
    return res.status(500).json({ message: e.message })
  }
}

export default startTicketCheckout