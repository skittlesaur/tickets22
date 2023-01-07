import { Request, Response } from 'express'
import { CLIENT_URL } from '../../constants'

const getTeamGames = async (req: Request, res: Response) => {
  try {
    const { teamId } = req.params

    const teamExists = await req.context.prisma.team.findUnique({
      where: {
        id: teamId
      }
    })

    if (!teamExists) {
      return res.status(404).json({
        message: 'Team not found',
        details: `The team with id ${teamId} was not found`,
        help: `${CLIENT_URL}/help/microservices/shop#teams/{teamId}/matches`,
      })
    }

    const teamGames = await req.context.prisma.match.findMany({
      where: {
        OR: [
          {
            homeTeamId: teamId,
          },
          {
            awayTeamId: teamId,
          },
        ],
      },
      include: {
        homeTeam: true,
        awayTeam: true,
      },
    })

    res.status(200).json(teamGames)
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

export default getTeamGames