import { Request, Response } from 'express'

const updateMasterlist = async (req: Request, res: Response) => {
  try {

    const { prisma } = req.context
    const match = req.body

    const stadium = await prisma.stadium.findUnique({
      where: {
        name: match.location
      },
      select: {
        id: true
      }
    })

    if (!stadium) return res.status(400).json({ message: 'This stadium does not exist' })

    const homeTeam = await prisma.team.findUnique({
      where: {
        name: match.homeTeam
      },
      select: {
        id: true
      }
    })

    if (!homeTeam) return res.status(400).json({ message: 'This home team does not exist' })

    const awayTeam = await prisma.team.findUnique({
      where: {
        name: match.awayTeam
      },
      select: {
        id: true
      }
    })

    if (!awayTeam) return res.status(400).json({ message: 'This away team does not exist' })

    // Creating the match

    const matchEntry = await prisma.match.upsert({
      where: {
        matchNumber: match.matchNumber
      },
      update: {
        roundNumber: match.roundNumber,
        date: match.dateUtc,
        stadiumId: stadium.id,
        homeTeamId: homeTeam.id,
        homeScore: 0,
        awayTeamId: awayTeam.id,
        awayScore: 0,
        group: match.group,
      },
      create: {
        matchNumber: match.matchNumber,
        roundNumber: match.roundNumber,
        date: match.dateUtc,
        stadiumId: stadium.id,
        homeTeamId: homeTeam.id,
        homeScore: 0,
        awayTeamId: awayTeam.id,
        awayScore: 0,
        group: match.group,
        availableTickets: {
          create: [{
            category: 1,
            available: match.availability.category1.available,
            price: match.availability.category1.price
          }, {
            category: 2,
            available: match.availability.category2.available,
            price: match.availability.category2.price
          }, {
            category: 3,
            available: match.availability.category3.available,
            price: match.availability.category3.price
          }
          ]
        }
      }
    })

    res.status(200).json({ message: `${matchEntry.matchNumber} is committed` })
  } catch (error: any) {
  }
}

export default updateMasterlist