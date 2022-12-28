import { Request, Response } from 'express'
import { CLIENT_URL } from '../../constants'

const getMatchSummary = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const match = await req.context.prisma.match.findUnique({
      where: {
        id: id,
      },
      select: {
        matchEvents: {
          select: {
            id: true,
            eventType: true,
            minute: true,
            description: true,
            homeScore: true,
            awayScore: true,
            team: {
              select: {
                id: true,
                name: true,
                primaryColor: true,
                secondaryColor: true,
              },
            },
          },
        },
      },
    })

    if (!match)
      return res.status(404).json({
        message: 'Match not found',
        details: `Match with id ${id} not found`,
        code: 'not_found',
        help: `${CLIENT_URL}/help/microservices/shop?code=not_found#matches/:id/summary`,
      })

    return res.status(200).json(match.matchEvents)
  } catch (e) {
    console.log(e)
  }
}

export default getMatchSummary