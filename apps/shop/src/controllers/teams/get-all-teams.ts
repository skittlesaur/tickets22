import { Request, Response } from 'express'

const getAllTeams = async (req: Request, res: Response) => {
  try {
    const allTeams = await req.context.prisma.team.findMany({
      select: {
        id: true,
        name: true,
        primaryColor: true,
        secondaryColor: true,
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
        players: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            position: true,
            imageUri: true
          }
        },
        Manager: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          }
        }
      }
    })

    res.status(200).json({ allTeams })
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

export default getAllTeams