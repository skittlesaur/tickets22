import { Request, Response } from 'express'

const getMatchAnalytics = async (req: Request, res: Response) => {
  try {

    // @todo: categories sold, and tickets sold and stuff

    const { prisma } = req.context
    const matchNumber = parseInt(req.params.matchNumber)

    if (!matchNumber) throw new Error('matchNumber is undefined')

    const tickets = await prisma.reservedTicket.findMany({
      where: {
        matchNumber: matchNumber
      },
      select: {
        // userId: true, // to see how many purchases were from registered users
        category: true, // for most reserved category
        status: true, // for counting what % of tickets that are reserved vs cancelled vs pending
        // externalSeller: true, // to see how many ticket sales are from external sales if it is implemented (can be done using availableTickets) 
      }
    })

    if (!tickets) {
      throw new Error('There are no ticket entries to analyze')
    }

    let reservedPER = 0
    let cancelledPER = 0
    let pendingPER = 0
    const totalTickets = tickets.length

    let mostCategorySoldCount: number[] = []
    let maxCategorySold: number = 0

    tickets.map((ticket) => {

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

    let mostSoldCategory = []

    for (let j = 1; j <= mostCategorySoldCount.length; j++) {
      if (mostCategorySoldCount[j] === maxCategorySold) {
        mostSoldCategory.push(j);
      }
    }

    res.status(200).json({
      reservedPER, cancelledPER, pendingPER, totalTickets, mostSoldCategory: {
        mostSoldCategory,
        amountSold: maxCategorySold
      }
    })

  } catch (e: any) {
    res.status(500).json({ error_message: e.message })
  }
}

export default getMatchAnalytics    