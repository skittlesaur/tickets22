const getUpcomingMatch = async (prisma: any, currentDate: Date) => {

  const upcomingMatch = await prisma.match.findFirst({
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

  return upcomingMatch

}

export default getUpcomingMatch