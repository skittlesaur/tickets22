const { PrismaClient } = require('@prisma/client');
const matchList = require('./master-list.json')

const adder = async () => {
  const prisma = new PrismaClient()

  for (let i = 0; i < matchList.length; i++) {
    const match = matchList[i]

    // Stadium
    let stadium = await prisma.stadium.findUnique({
      where: {
        name: match.location
      },
      select: {
        id: true
      }
    })

    if (!stadium) {
      stadium = await prisma.team.create({
        data: {
          name: match.location
        }
      })
    }

    // Home Team
    let homeTeam = await prisma.team.findUnique({
      where: {
        name: match.homeTeam
      },
      select: {
        id: true
      }
    })

    if (!homeTeam) {
      homeTeam = await prisma.team.create({
        data: {
          name: match.homeTeam
        }
      })
    }

    // Away Team
    let awayTeam = await prisma.team.findUnique({
      where: {
        name: match.awayTeam
      },
      select: {
        id: true
      }
    })

    if (!awayTeam) {
      awayTeam = await prisma.team.create({
        data: {
          name: match.awayTeam
        }
      })

    }

    // Creating the match
    const matchEntry = await prisma.match.create({
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
    const ticket1 = await prisma.availableTickets.create({
      data: {
        matchNumber: match.matchNumber,
        category: 1,
        available: match.availability.category1.available,
        price: match.availability.category1.price
      }
    })

    const ticket2 = await prisma.availableTickets.create({
      data: {
        matchNumber: match.matchNumber,
        category: 2,
        available: match.availability.category2.available,
        price: match.availability.category2.price
      }
    })

    const ticket3 = await prisma.availableTickets.create({
      data: {
        matchNumber: match.matchNumber,
        category: 3,
        available: match.availability.category3.available,
        price: match.availability.category3.price
      }
    })

    console.log(`${i + 1}: ${matchEntry.id}`)
  }
}


//adder()

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