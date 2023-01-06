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

    const matchNumber = parseInt(id)

    if (isNaN(matchNumber))
      return res.status(400).json({
        message: 'Invalid match number',
        details: `The match number is not a number. Received: ${id} (type: ${typeof id})`,
        help: `${CLIENT_URL}/help/microservices/shop#matches/{matchNumber}`,
      })

    const match = await req.context.prisma.match.findUnique({
      where: { matchNumber },
      select: {
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

    if (!match)
      return res.status(404).json({
        message: 'Match not found',
        details: `The match with match number ${matchNumber} was not found`,
        help: `${CLIENT_URL}/help/microservices/shop#matches/{matchNumber}`,
      })

    return res.status(200).json(match)
  } catch (e: any) {
    return res.status(500).json({
      message: 'Internal server error',
      details: e.message,
    })
  }
}

export default getMatch