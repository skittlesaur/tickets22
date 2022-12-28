import { Request, Response } from 'express'

const getMatches = async (req: Request, res: Response) => {
  try {
    const matches = await req.context.prisma.match.findMany({
      orderBy: { date: 'asc' },
      select: {
        id: true,
        matchNumber: true,
        roundNumber: true,
        date: true,
        stadium: {
          select: {
            id: true,
            name: true,
          },
        },
        homeTeam: {
          select: {
            id: true,
            name: true,
          },
        },
        homeScore: true,
        awayTeam: {
          select: {
            id: true,
            name: true,
          },
        },
        awayScore: true,
        group: true,
        ended: true,
      },
    })

    res.status(200).json(matches)
  } catch (err) {
    res.status(500).json({ 'error': err })
  }
}

export default getMatches