import { Request, Response } from 'express'

const getAllMatchesAnalytics = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context

    const matches = await prisma.match.findMany({
      include: {
        homeTeam: true,
        awayTeam: true,
      },
    })

    if (!matches) {
      return res.status(404).json({
        message: 'No matches found',
      })
    }

    const matchesWithAnalytics = await Promise.all(matches.map(async (match) => {
      const tickets = await prisma.reservedTicket.findMany({
        where: {
          matchNumber: match.matchNumber,
        },
        select: {
          category: true, // for most reserved category
          status: true, // for counting what % of tickets that are reserved vs cancelled vs pending
        },
      })

      let purchasedTickets: number = 0
      let pendingTickets: number = 0
      let cancelledTickets: number = 0

      let purchasedTicketsCategories: number[] = [0, 0, 0]

      tickets.map((ticket) => {
        switch (ticket.status) {
          case ('PURCHASED'):
            purchasedTickets++
            switch (ticket.category) {
              case (1):
                purchasedTicketsCategories[0]++
                break
              case (2):
                purchasedTicketsCategories[1]++
                break
              case (3):
                purchasedTicketsCategories[2]++
                break
            }
            break
          case ('CANCELLED' || 'PENDING_TIMEOUT'):
            cancelledTickets++
            break
          case ('PENDING'):
            pendingTickets++
            break
        }
      })

      const mostReservedCategory = purchasedTicketsCategories.indexOf(Math.max(...purchasedTicketsCategories)) + 1

      const matchAnalytics = {
        match,
        mostReservedCategory,
        purchasedTickets,
        cancelledTickets,
        pendingTickets,
      }

      return matchAnalytics
    }))

    return res.status(200).json(matchesWithAnalytics)
  } catch (e: any) {
    return res.status(500).json({
      message: e.message,
    })
  }
}

export default getAllMatchesAnalytics