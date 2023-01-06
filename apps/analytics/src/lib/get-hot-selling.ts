import TicketStatus from "../controllers/TicketStatus"

const getHotSellingMatch = async (prisma: any, currentDate: Date) => {

  const hotSellingMatchQuery = await prisma.reservedTicket.groupBy({
    by: ['matchNumber'],
    where: {
      match: {
        date: {
          gt: currentDate
        },
        availableTickets: {
          some: {
            available: {
              gt: 0
            }
          }
        }
      },
      status: TicketStatus.PURCHASED
    },
    orderBy: {
      _count: {
        matchNumber: 'desc'
      }
    },
    _count: {
      matchNumber: true,
    },
    take: 1
  })

  const hotSellingMatch = await prisma.match.findUnique({
    where: {
      matchNumber: hotSellingMatchQuery[0].matchNumber
    },
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

  return hotSellingMatch
}

export default getHotSellingMatch