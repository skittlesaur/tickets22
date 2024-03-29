import { Request, Response } from 'express'
import { CLIENT_URL } from '../../constants'


const formatTeamName = (teamName: string) => {
  if (teamName.toLowerCase() === 'usa')
    return 'USA'
  return teamName.replace('-', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())
}

const getTeam = async (req: Request, res: Response) => {
  try {
    const { teamName } = req.params

    const team = await req.context.prisma.team.findFirst({
      where: {
        name: formatTeamName(teamName),
      },
      select: {
        id: true,
        name: true,
        primaryColor: true,
        secondaryColor: true,
      },
    })

    if (!team)
      return res.status(404).json({
        message: 'Team not found',
        details: `The team with name ${teamName} was not found`,
        help: `${CLIENT_URL}/help/microservices/shop#teams/{teamName}`,
      })

    res.status(200).json(team)
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

export default getTeam