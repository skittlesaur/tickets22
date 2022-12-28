import { Request, Response } from 'express'

const getTeamPlayers = async (req: Request, res: Response) => {
  try {
    const { teamId } = req.params

    const allTeams = await req.context.prisma.team.findUnique({
      where: {
        id: teamId
      },
      select: {
        name: true,
        players: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            position: true,
            imageUri: true
          }
        },

      }
    })

    res.status(200).json({ allTeams })
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

export default getTeamPlayers