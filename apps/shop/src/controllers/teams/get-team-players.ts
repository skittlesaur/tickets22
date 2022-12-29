import { Request, Response } from 'express'

const getTeamPlayers = async (req: Request, res: Response) => {
  try {
    const { teamId } = req.params

    const players = await req.context.prisma.team.findUnique({
      where: {
        id: teamId,
      },
      select: {
        name: true,
        players: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            position: true,
            imageUri: true,
          },
        },

      },
    })

    if (!players)
      return res.status(404).json({ message: 'Team not found' })

    res.status(200).json(players.players)
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

export default getTeamPlayers