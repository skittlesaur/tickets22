import { Request, Response } from 'express'

const getRandomPlayer = async (req: Request, res: Response) => {
  try {
    const { teamId } = req.params

    const players = await req.context.prisma.player.findMany({
      where: {
        teamId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        position: true,
        imageUri: true,
      },
    })

    const randomPlayer = players[Math.floor(Math.random() * players.length)]

    res.status(200).json(randomPlayer)
  } catch (e) {
    console.log(e)
  }
}

export default getRandomPlayer