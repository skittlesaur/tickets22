import { Request, Response } from 'express'

const getGeneralAnalytics = async (req: Request, res: Response) => {
  try {

    const { prisma } = req.context

    const tickets = await prisma.reservedTicket.findMany({
      select: {
        matchNumber: true, // for most reserved match
        category: true, // for most reserved category
        status: true, // for counting what % of tickets that are reserved vs cancelled vs pending
      }
    })

    if (!tickets) {
      throw new Error('There are no ticket entries to analyze')
    }

    let purchasedTickets: number = 0
    let pendingTickets: number = 0
    let cancelledTickets: number = 0

    let purchasedTicketsCategories: number[] = [0, 0, 0]
    let pendingTicketsCategories: number[] = [0, 0, 0]
    let cancelledTicketsCategories: number[] = [0, 0, 0]

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
          switch (ticket.category) {
            case (1):
              cancelledTicketsCategories[0]++
              break
            case (2):
              cancelledTicketsCategories[1]++
              break
            case (3):
              cancelledTicketsCategories[2]++
              break
          }
          break
        case ('PENDING'):
          pendingTickets++
          switch (ticket.category) {
            case (1):
              pendingTicketsCategories[0]++
              break
            case (2):
              pendingTicketsCategories[1]++
              break
            case (3):
              pendingTicketsCategories[2]++
              break
          }
          break
      }
    })

    // Category breakdown
    const categoryOne: number = purchasedTicketsCategories[0] + cancelledTicketsCategories[0] + pendingTicketsCategories[0]
    const categoryTwo: number = purchasedTicketsCategories[1] + cancelledTicketsCategories[1] + pendingTicketsCategories[1]
    const categoryThree: number = purchasedTicketsCategories[2] + cancelledTicketsCategories[2] + pendingTicketsCategories[2]

    res.status(200).json({
      purchasedTickets: purchasedTickets, purchasedTicketsCategories: {
        categoryOne: purchasedTicketsCategories[0],
        categoryTwo: purchasedTicketsCategories[1],
        categoryThree: purchasedTicketsCategories[2],
      }, pendingTickets: pendingTickets, pendingTicketsCategories: {
        categoryOne: pendingTicketsCategories[0],
        categoryTwo: pendingTicketsCategories[1],
        categoryThree: pendingTicketsCategories[2]
      }, cancelledTickets: cancelledTickets, cancelledTicketsCategories: {
        categoryOne: cancelledTicketsCategories[0],
        categoryTwo: cancelledTicketsCategories[1],
        categoryThree: cancelledTicketsCategories[2]
      }, categoryBreakdown: {
        categoryOne: categoryOne, categoryTwo: categoryTwo, categoryThree: categoryThree
      }
    })

  } catch (e: any) {
    res.status(500).json({ error_message: e.message })

  }
}

export default getGeneralAnalytics