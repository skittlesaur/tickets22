import { Request, Response } from 'express'
import axios from 'axios'
import { CLIENT_URL, SECURE_ENDPOINT_SECRET, SECURITY_URL } from '../../constants'

const isTicketValid = async (ticket: any, user: any, ipAddress: String, cookies: any) => {
  if (user && (user.id === ticket.userId || user.email === ticket.email))
    return {
      isValid: true,
      method: 'authenticated user',
    }

  if (ticket.ipAddress === ipAddress)
    return {
      isValid: true,
      method: 'ip address',
    }

  if (cookies) {
    const { data } = await axios.get(`${SECURITY_URL}/decode-${SECURE_ENDPOINT_SECRET}/${cookies}`)
    const tickets = data.tickets?.map((ticket: any) => ticket.id)

    if (tickets.includes(ticket.id))
      return {
        isValid: true,
        method: 'cookie',
      }
  }

  return {
    isValid: false,
  }
}

const getReservedTicket = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { prisma, user } = req.context

    const ticket: any = await prisma.reservedTicket.findUnique({
      where: {
        id: id,
      },
      include: {
        match: {
          select: {
            matchNumber: true,
            roundNumber: true,
            group: true,
            date: true,
            stadium: {
              select: {
                name: true,
                capacity: true,
              },
            },
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

    if (!ticket) {
      return res.status(404).json({
        redirect: '/tickets?error=Ticket not found',
        message: 'Ticket not found',
        details: `Ticket with id ${id} not found`,
        help: `${CLIENT_URL}/help/microservices/reservations#tickets/{id}`
      })
    }


    // validate ticket
    const ipAddress = (req.headers['x-forwarded-for'] || req.socket.remoteAddress) as string
    const ticketsCookie = req.cookies['tickets']

    const validate = await isTicketValid(ticket, user, ipAddress, ticketsCookie)
    if(!validate.isValid) {
      return res.status(403).json({
        redirect: '/tickets?error=Ticket validation failed',
        message: 'Ticket validation failed',
        details: `You are not allowed to access this ticket`,
        help: `${CLIENT_URL}/help/microservices/reservations#tickets/{id}`
      })
    }

    delete ticket.ipAddress
    delete ticket.externalSeller
    delete ticket.userId
    delete ticket.createdAt
    delete ticket.updatedAt
    return res.status(200).json(ticket)
  } catch (e: any) {
    return res.status(400).json({
      status: 400,
      redirect: '/tickets?error=Ticket validation failed',
      message: 'Ticket validation failed',
      error: e.response.data,
    })
  }
}

export default getReservedTicket