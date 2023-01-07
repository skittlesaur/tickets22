import { Request, Response } from 'express'
import axios from 'axios'
import { CLIENT_URL, SHOP_URL } from '../../constants'
import { TicketStatus } from '@prisma/client'

const getAvailableTickets = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const { data: match } = await axios.get(`${SHOP_URL}/matches/${id}`)

    if (match.ended)
      return res.status(400).json({
        message: 'Match has ended',
        details: 'The match you are trying to get tickets for has already ended',
        help: `${CLIENT_URL}/help/microservices/reservations#match/{id}/available`,
      })

    const availableTickets = await req.context.prisma.availableTickets.findMany({
      where: {
        matchNumber: match.matchNumber,
      },
    })

    const tickets: any[] = []

    for (const ticket of availableTickets) {
      if (ticket.available === 0 && ticket.pending > 0) {
        const nextAvailableTicket = await req.context.prisma.reservedTicket.findFirst({
          where: {
            matchNumber: match.matchNumber,
            category: ticket.category,
            status: TicketStatus.PENDING,
          },
          orderBy: {
            createdAt: 'asc',
          },
          select: {
            createdAt: true,
          },
        })

        if (nextAvailableTicket) {
          tickets.push({
            ...ticket,
            nextAvailableTicket: {
              createdAt: nextAvailableTicket?.createdAt,
              availableAt: new Date(nextAvailableTicket?.createdAt.getTime() + 1000 * 60 * 10),
            },
          })
          continue
        }
      }

      tickets.push(ticket)
    }

    return res.status(200).json(tickets)
  } catch (e: any) {
    if (e.isAxiosError) {
      const { data, status } = e.response
      res.status(status).json(data)
    }
  }
}

export default getAvailableTickets