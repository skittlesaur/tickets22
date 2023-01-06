import { Request, Response } from 'express'
import TicketStatus from './TicketStatus'
import { IpregistryClient } from '@ipregistry/client'


const getRecommendations = async (req: Request, res: Response) => {
  try {

    const { prisma } = req.context
    const client = new IpregistryClient('rxa3qkj3xba0jt2f')
    const ipAddress = (req.headers['x-forwarded-for'] || req.socket.remoteAddress) as string

    const randomDay = Math.floor(Math.random() * 12)
    //const currentDate = new Date(`2022-11-${20 + randomDay}`)
    const currentDate = new Date(`2022-11-20`)

    let locationData = (await client.lookup('73.2.2.2' /*'103.68.134.0' */ /*ipAddress*/)).data.location
    // Get location, threat data and more
    locationData.country.name = locationData.country.name === 'United States' ? 'USA' : locationData.country.name
    console.log(locationData.country.name);
    console.log(locationData.continent.name);


    //console.log(currentDate)


    const hotSellingMatchQuery = await prisma.reservedTicket.groupBy({
      by: ['matchNumber'],
      where: {
        match: {
          date: {
            gt: currentDate
          },
          availableTickets: {
            some: {
              available: {
                gt: 0
              }
            }
          }
        },
        status: TicketStatus.PURCHASED
      },
      orderBy: {
        _count: {
          matchNumber: 'desc'
        }
      },
      _count: {
        matchNumber: true,
      },
      take: 1
    })

    const hotSellingMatch = await prisma.match.findUnique({
      where: {
        matchNumber: hotSellingMatchQuery[0].matchNumber
      },
      select: {
        matchNumber: true,
        roundNumber: true,
        date: true,
        stadium: {
          select: {
            name: true
          }
        },
        homeTeam: {
          select: {
            name: true
          }
        },
        homeScore: true,
        awayTeam: {
          select: {
            name: true
          }
        },
        awayScore: true,
        group: true,

      }
    })

    const upcomingMatch = await prisma.match.findFirst({
      where: {
        date: {
          gt: currentDate
        },
        availableTickets: {
          some: {
            available: {
              gt: 0
            },
          }
        }
      },
      select: {
        matchNumber: true,
        roundNumber: true,
        date: true,
        stadium: {
          select: {
            name: true
          }
        },
        homeTeam: {
          select: {
            name: true
          }
        },
        homeScore: true,
        awayTeam: {
          select: {
            name: true
          }
        },
        awayScore: true,
        group: true,
      }
    })

    res.status(200).json([hotSellingMatch, hotSellingMatch, upcomingMatch])
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

export default getRecommendations