import TicketStatus from '../controllers/TicketStatus'

const getHotSellingMatch = async (prisma: any, currentDate: Date, recommended: any) => {

  const hotSellingMatchQuery = await prisma.reservedTicket.groupBy({
    by: ['matchNumber'],
    where: {
      match: {
        date: {
          gt: currentDate,
        },
        availableTickets: {
          some: {
            available: {
              gt: 0,
            },
          },
        },
      },
      status: TicketStatus.PURCHASED,
    },
    orderBy: {
      _count: {
        matchNumber: 'desc',
      },
    },
    _count: {
      matchNumber: true,
    },
    take: 5,
  })

  const possibleMatchNumbers = hotSellingMatchQuery.map((match: any) => match.matchNumber).filter((matchNumber: number) => matchNumber !== recommended.matchNumber)

  const randomHotSellingMatch = possibleMatchNumbers[Math.floor(Math.random() * possibleMatchNumbers.length)]

  const hotSellingMatch = await prisma.match.findUnique({
    where: {
      matchNumber: randomHotSellingMatch,
    },
    select: {
      matchNumber: true,
      roundNumber: true,
      date: true,
      stadium: {
        select: {
          name: true,
        },
      },
      homeTeam: {
        select: {
          name: true,
        },
      },
      homeScore: true,
      awayTeam: {
        select: {
          name: true,
        },
      },
      awayScore: true,
      group: true,

    },
  })

  return hotSellingMatch
}

export default getHotSellingMatch