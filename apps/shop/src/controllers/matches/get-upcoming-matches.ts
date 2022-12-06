import { Request, Response } from 'express'

const getUpcomingMatches = async (req: Request, res: Response) => {
  try {
    const upcomingMatches = await req.context.prisma.match.findMany({
      where: {
        date: {
          gte: new Date('2021-01-01'), // TODO: update this to current date, this is just for testing
        },
      },
      orderBy: {
        date: 'asc',
      },
      take: 4,
      select: {
        id: true,
        date: true,
        roundNumber: true,
        matchNumber: true,
        group: true,
        homeTeam: {
          select: {
            id: true,
            name: true,
          },
        },
        awayTeam: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    res.status(200).json(upcomingMatches)
  } catch (error) {

  }
}

export default getUpcomingMatches