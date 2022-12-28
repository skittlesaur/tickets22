import { Request, Response } from 'express'

const getTeamGames = async (req: Request, res: Response) => {
  try {
    const { teamId } = req.params

    const teamGames = await req.context.prisma.team.findUnique({
      where: {
        id: teamId
      },
      select: {
        name: true,
        homeMatches: {
          orderBy: { date: 'asc' },
          select: {
            matchNumber: true,
            roundNumber: true,
            date: true,
            stadium: {
              select: {
                name: true
              }
            },
            awayTeam: {
              select: {
                name: true
              }
            },
            homeScore: true,
            awayScore: true,
            group: true,
            ended: true
          }
        },
        awayMatches: {
          orderBy: { date: 'asc' },
          select: {
            matchNumber: true,
            roundNumber: true,
            date: true,
            stadium: {
              select: {
                name: true
              }
            },
            awayTeam: {
              select: {
                name: true
              }
            },
            homeScore: true,
            awayScore: true,
            group: true,
            ended: true
          }
        },
      }
    })

    res.status(200).json(teamGames)
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

export default getTeamGames