import { Request, Response } from 'express'

const getReservedTicket = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { user, prisma } = req.context

    if (!user) {
      return res.status(401).json({
        status: 401,
        code: 'UNAUTHORIZED',
        message: 'Unauthorized',
      })
    }

    const ticket = await prisma.reservedTicket.findUnique({
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
              }
            },
            homeTeam: {
              select: {
                name: true,
              }
            },
            awayTeam: {
              select: {
                name: true,
              }
            }
          }
        },
      }
    })

    if (!ticket) {
      return res.status(404).json({
        status: 404,
        redirect: '/me/tickets?error=Ticket not found',
        message: 'Ticket not found',
      })
    }

    if (ticket.userId !== user.id) {
      return res.status(401).json({
        status: 401,
        redirect: '/login?error=You are not authorized to view this ticket',
        message: 'You are not authorized to view this ticket',
      })
    }

    return res.status(200).json(ticket)
  } catch (e) {
    console.log(e)
    return res.status(500).json(e)
  }
}

export default getReservedTicket