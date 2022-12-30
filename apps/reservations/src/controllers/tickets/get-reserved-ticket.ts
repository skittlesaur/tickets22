import { Request, Response } from 'express'
import axios from 'axios'
import { SECURITY_URL } from '../../constants'

const getReservedTicket = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { prisma } = req.context

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
        status: 404,
        redirect: '/tickets?error=Ticket not found',
        message: 'Ticket not found',
      })
    }

    // validate ticket
    await axios.post(`${SECURITY_URL}/validate/ticket`, {
      ticket,
    }, {
      headers: {
        Authorization: req.headers.authorization,
        cookie: req.headers.cookie,
        x_forwarded_for: req.headers['x-forwarded-for'],
        socket_remote_address: req.socket.remoteAddress,
      },
    })

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
    })
  }
}

export default getReservedTicket