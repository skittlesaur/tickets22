import { Request, Response } from 'express'

const updateMasterlist = async (req: Request, res: Response) => {
  try {

    const match = req.body

    let stadium = await req.context.prisma.stadium.findUnique({
      where: {
        name: match.location
      },
      select: {
        id: true
      }
    })

    if (!stadium) {
      stadium = await req.context.prisma.stadium.create({
        data: {
          name: match.location
        }
      })
    }

    // Home Team
    let homeTeam = await req.context.prisma.team.findUnique({
      where: {
        name: match.homeTeam
      },
      select: {
        id: true
      }
    })

    if (!homeTeam) {
      homeTeam = await req.context.prisma.team.create({
        data: {
          name: match.homeTeam
        }
      })
    }

    // Away Team
    let awayTeam = await req.context.prisma.team.findUnique({
      where: {
        name: match.awayTeam
      },
      select: {
        id: true
      }
    })

    if (!awayTeam) {
      awayTeam = await req.context.prisma.team.create({
        data: {
          name: match.awayTeam
        }
      })

    }

    // Creating the match
    const matchEntry = await req.context.prisma.match.upsert({
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

    const updateTickets = await req.context.prisma

    res.status(200).json({ message: `${matchEntry.matchNumber} is done` })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export default updateMasterlist