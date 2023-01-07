const getUpcomingMatch = async (prisma: any, currentDate: Date, recommended: any, hotSelling: any) => {

  const upcomingMatch = await prisma.match.findMany({
    take: 5,
    where: {
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

  const possibleRandomMatches = upcomingMatch.filter((match: any) => {
    return match.matchNumber !== recommended.matchNumber && match.matchNumber !== hotSelling.matchNumber
  })

  const randomUpcomingMatch = possibleRandomMatches[Math.floor(Math.random() * possibleRandomMatches.length)]

  return randomUpcomingMatch
}

export default getUpcomingMatch