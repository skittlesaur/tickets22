import { Request, Response } from 'express'

const getGeneralAnalytics = async (req: Request, res: Response) => {
  try {

    // @todo: do analytics breakdown of how much of each category sold
    // and how many tickets sold and their statuses.
    // - top 3 best selling matches
    // - most watched country maybe?
    // - return information about the matches with prisma
    const { prisma } = req.context

    const tickets = await prisma.reservedTicket.findMany({
      select: {
        matchNumber: true, // for most reserved match
        // userId: true, // to see how many purchases were from registered users
        category: true, // for most reserved category
        status: true, // for counting what % of tickets that are reserved vs cancelled vs pending
        // externalSeller: true, // to see how many ticket sales are from external sales if it is implemented (can be done using availableTickets) 
      }
    })

    if (!tickets) {
      throw new Error('There are no ticket entries to analyze')
    }

    console.log(tickets)

    let reservedPER = 0
    let cancelledPER = 0
    let pendingPER = 0
    const totalTickets = tickets.length

    let mostMatchSoldCount: number[] = []
    let maxMatchSold: number = 0
    let mostCategorySoldCount: number[] = []
    let maxCategorySold: number = 0

    tickets.map((ticket) => {

      mostMatchSoldCount[ticket.matchNumber] = !mostMatchSoldCount[ticket.matchNumber] ? 1 : mostMatchSoldCount[ticket.matchNumber] + 1

      maxMatchSold = (mostMatchSoldCount[ticket.matchNumber] > maxMatchSold) ? mostMatchSoldCount[ticket.matchNumber] : maxMatchSold

      mostCategorySoldCount[ticket.category] = !mostCategorySoldCount[ticket.category] ? 1 : mostCategorySoldCount[ticket.category] + 1

      maxCategorySold = (mostCategorySoldCount[ticket.category] > maxCategorySold) ? mostCategorySoldCount[ticket.category] : maxCategorySold

      switch (ticket.status) {
        case ('PURCHASED'):
          reservedPER++
          break
        case ('CANCELLED'):
          cancelledPER++
          break
        case ('PENDING_TIMEOUT'):
          cancelledPER
          break
        case ('PENDING'):
          pendingPER++
          break
      }
    })

    reservedPER = (reservedPER / totalTickets) * 100
    cancelledPER = (cancelledPER / totalTickets) * 100
    pendingPER = (pendingPER / totalTickets) * 100

    let mostSoldMatches = []
    let mostSoldCategory = []

    for (let i = 0; i < mostMatchSoldCount.length; i++) {
      if (mostMatchSoldCount[i] === maxMatchSold) {
        mostSoldMatches.push(i);
      }
    }

    for (let j = 1; j <= mostCategorySoldCount.length; j++) {
      if (mostCategorySoldCount[j] === maxCategorySold) {
        mostSoldCategory.push(j);
      }
    }

    res.status(200).json({
      reservedPER, cancelledPER, pendingPER, totalTickets, mostSoldMatches: {
        mostSoldMatches,
        amountSold: maxMatchSold
      }, mostSoldCategory: {
        mostSoldCategory,
        amountSold: maxCategorySold
      }
    })
  } catch (e: any) {
    res.status(500).json({ error_message: e.message })

  }
}

export default getGeneralAnalytics