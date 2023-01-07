import { Request, Response } from 'express'
import axios from 'axios'
import { SECURE_ENDPOINT_SECRET, SECURITY_URL } from '../../constants'
import { PrismaClient, User } from '@prisma/client'

const select = {
  id: true,
  userId: true,
  price: true,
  createdAt: true,
  status: true,
  ipAddress: true,
  email: true,
  stripeCheckoutUrl: true,
  match: {
    select: {
      matchNumber: true,
      date: true,
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
}

const getUserTickets = async (prisma: PrismaClient, user?: User) => {
  if (!user)
    return []

  const tickets = await prisma.reservedTicket.findMany({
    where: {
      OR: [
        {
          userId: user.id,
        },
        {
          email: user.email,
        },
      ],
    },
    select,
    orderBy: {
      createdAt: 'desc',
    }
  })

  return tickets
}

const getImportedTickets = async (prisma: PrismaClient, req: Request, userTickets: any[]) => {
  const ticketsCookie = req.cookies['tickets']

  if (!ticketsCookie)
    return []

  const { data: decodedTickets } = await axios.get(`${SECURITY_URL}/decode-${SECURE_ENDPOINT_SECRET}/${ticketsCookie}`)
  const ticketIds = decodedTickets.tickets?.map((ticket: any) => ticket.id)

  const tickets = await prisma.reservedTicket.findMany({
    where: {
      id: {
        in: ticketIds,
      },
    },
    select,
    orderBy: {
      createdAt: 'desc',
    }
  })

  return tickets.filter((ticket) => ticketIds.includes(ticket.id) && !userTickets.some((userTicket) => userTicket.id === ticket.id))
}

const getIpTickets = async (prisma: PrismaClient, req: Request, userTickets: any[], importedTickets: any[]) => {
  const ipAddress = (req.headers['x-forwarded-for'] || req.socket.remoteAddress) as string

  const tickets = await prisma.reservedTicket.findMany({
    where: {
      ipAddress,
    },
    select,
    orderBy: {
      createdAt: 'desc',
    }
  })

  return tickets.filter((ticket) => !userTickets.some((userTicket) => userTicket.id === ticket.id) && !importedTickets.some((importedTicket) => importedTicket.id === ticket.id))
}

const userTickets = async (req: Request, res: Response) => {
  try {
    const { user, prisma } = req.context
    const userTickets = await getUserTickets(prisma, user)
    const importedTickets = await getImportedTickets(prisma, req, userTickets)
    const guestTickets = await getIpTickets(prisma, req, userTickets, importedTickets)

    return res.json({
      userTickets,
      importedTickets,
      guestTickets,
    })
  } catch (e: any) {
    console.log(e)
    return res.status(500).json({
      message: e.message,
    })
  }
}

export default userTickets