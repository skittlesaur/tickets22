import { Request, Response } from 'express'
import reserveTickets from '../../../reservations/src/controllers/tickets/reserve-tickets';

const getTopSellingMatches = async (req: Request, res: Response) => {
  try {

    // @todo: make it more efficient, take any number

    const { prisma } = req.context

    const tickets = await prisma.reservedTicket.findMany({
      select: {
        matchNumber: true, // for most reserved match
        // userId: true, // to see how many purchases were from registered users
        category: true, // for most reserved category
        status: true, // for counting what % of tickets that are reserved vs cancelled vs pending
        // externalSeller: true, // to see how many ticket sales are from external sales if it is implemented (can be done using availableTickets) 
      }
    })

    if (!tickets) {
      throw new Error('There are no ticket entries to analyze')
    }

    // array to track the amount of tickets sold for each match (idk how to do it in prisma ngl)
    let ticketsSold: number[] = Array(64).fill(0)

    tickets.map((ticket) => {
      ticketsSold[ticket.matchNumber]++
    })

    let top3Matches: number[] = Array(3).fill(0)

    for (let i = 1; i <= ticketsSold.length; i++) {
      if (ticketsSold[i] > top3Matches[0] || ticketsSold[i] > top3Matches[1] || ticketsSold[i] > top3Matches[2]) {
        top3Matches[top3Matches.indexOf(Math.min(...top3Matches))] = i
      }
    }

    top3Matches.sort().reverse()

    let top3MatchesObjects = []

    for (let j = 0; j < 3; j++) {
      top3MatchesObjects[j] = await prisma.match.findUnique({
        where: {
          matchNumber: top3Matches[j]
        },
        select: {
          matchNumber: true,
          date: true,
          stadium: true,
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
          _count: {
            select: {
              reservedTickets: true
            }
          }
        }
      })
    }

    res.status(200).json({
      top3SellingMatches: {
        1: top3Matches[0], 2: top3Matches[1], 3: top3Matches[2]
      }, top3MatchesObjects
    })

  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

export default getTopSellingMatches