import { Request, Response } from 'express'
const matchList = require('./master-list.json')

const initilaize = async (req: Request, res: Response) => {

  for (let i = 0; i < 1/*matchList.length */; i++) {
    const match = matchList[i]

    // Stadium
    let stadium = await req.context.prisma.stadium.findUnique({
      where: {
        name: match.location
      },
      select: {
        id: true
      }
    })

    if (!stadium) {
      stadium = await req.context.prisma.team.create({
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
    const matchEntry = await req.context.prisma.match.create({
      data: {
        matchNumber: match.matchNumber,
        roundNumber: match.roundNumber,
        date: match.dateUtc,
        stadiumId: stadium.id,
        homeTeamId: homeTeam.id,
        homeScore: 0,
        awayTeamId: awayTeam.id,
        awayScore: 0,
        group: match.group
      }
    })

    // Creating the available tickets 
    const ticket1 = await req.context.prisma.availableTickets.create({
      data: {
        matchNumber: match.matchNumber,
        category: 1,
        available: match.availability.category1.available,
        price: match.availability.category1.price
      }
    })

    const ticket2 = await req.context.prisma.availableTickets.create({
      data: {
        matchNumber: match.matchNumber,
        category: 2,
        available: match.availability.category2.available,
        price: match.availability.category2.price
      }
    })

    const ticket3 = await req.context.prisma.availableTickets.create({
      data: {
        matchNumber: match.matchNumber,
        category: 3,
        available: match.availability.category3.available,
        price: match.availability.category3.price
      }
    })

    console.log(`${i + 1}: ${matchEntry.id}`)
  }

  res.status(200).json({ message: 'initialized' })
}

export default initilaize

// const test = async () => {
//   try {
//     const prisma = new PrismaClient()

//     const pendingTickets = await prisma.availableTickets.findFirst({
//       where: {
//         matchNumber: 2,
//         category: { equals: 1 },
//       },
//       select: {
//         id: true,
//         pending: true,
//       },
//     });

//     console.log(pendingTickets)
//   } catch (error) {
//     console.log(error)
//   }
// }

// test()