const { PrismaClient } = require('@prisma/client');
const matchList = require('./master-list.json')

const adder = async () => {
  const prisma = new PrismaClient()

  for (let i = 0; i < matchList.length; i++) {
    const match = matchList[i]

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
        stadiumName: match.location,
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

// adder()

// const test = async () => {
//   const prisma = new PrismaClient()

  // const test = await prisma.availableTickets.findUnique({
  //   where: {
  //     matchNumber: 21
  //   },
  //   select: {
  //     id: true
  //   }
  // })

//   const test2 = await prisma.availableTickets.findFirst({
//     where: {
//       matchNumber: 21,
//       category: {
//         equals: 1
//       }
//     },
//     select: {
//       pending: true
//     }
//   })

//   console.log(test2)
// }

// test()

