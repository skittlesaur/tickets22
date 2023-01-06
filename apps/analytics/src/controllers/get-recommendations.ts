import { Request, Response } from 'express'

const getRecommendations = async (req: Request, res: Response) => {
  try {

    const { prisma } = req.context
    const randomDay = Math.floor(Math.random() * 12)
    const currentDate = new Date(`2022-11-${20 + randomDay}`)

    //console.log(currentDate)

    // const tickets = await prisma.reservedTicket.findMany({
    //   select: {
    //     matchNumber: true, // for most reserved match
    //     category: true, // for most reserved category
    //     status: true, // for counting what % of tickets that are reserved vs cancelled vs pending
    //   }
    // })

    const matches = await prisma.match.findMany({
      where: {
        date: {
          gt: currentDate
        },
        availableTickets: {
          some: {
            available: {
              gt: 0
            },
          }
        }
      },
      take: 3,
      select: {
        matchNumber: true,
        roundNumber: true,
        date: true,
        stadium: {
          select: {
            name: true
          }
        },
        homeTeam: {
          select: {
            name: true
          }
        },
        homeScore: true,
        awayTeam: {
          select: {
            name: true
          }
        },
        awayScore: true,
        group: true,
      }
    })



    if (!matches) {
      throw new Error('There are no match entries to analyze')
    }


    res.status(200).json({ RecommendedForYou: matches[0], HotRightNow: matches[1], upcoming: matches[2] })
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

export default getRecommendations