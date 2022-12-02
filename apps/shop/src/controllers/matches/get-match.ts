import { Request, Response } from 'express'
import { CLIENT_URL } from '../../constants'

const getMatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!id)
      return res.status(400).json({
        message: 'Missing matches id',
        details: 'The matches id is missing from the request parameters',
        code: 'invalid_parameters',
        help: `${CLIENT_URL}/help/microservices/shop?status=400&code=invalid_parameters&endpoint=matches/:id`,
      })

    const match = await req.context.prisma.match.findUnique({
      where: { id },
      select: {
        id: true,
        matchNumber: true,
        roundNumber: true,
        date: true,
        stadium: {
          select: {
            id: true,
            name: true,
            capacity: true,
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

    if (!match)
      return res.status(404).json({
        message: 'Match not found',
        details: 'The match with the given id does not exist',
        code: 'not_found',
        help: `${CLIENT_URL}/help/microservices/shop?status=404&code=not_found&endpoint=matches/:id`,
      })

    return res.status(200).json(match)
  } catch (e) {
    res.status(400).json(e)
  }
}

export default getMatch