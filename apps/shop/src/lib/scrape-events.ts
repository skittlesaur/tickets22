import { MatchEventType, PrismaClient } from '@prisma/client'
import axios from 'axios'

const url = 'https://api.fifa.com/api/v3/timelines/17/255711/285063/400128082'
const prisma = new PrismaClient()

const getEventType = (type: number): MatchEventType | undefined => {
  switch (type) {
    case 7:
      return MatchEventType.KICK_OFF
    case 8:
      return MatchEventType.MATCH_END
    case 18:
      return MatchEventType.FOUL
    case 71:
      return MatchEventType.VAR
    case 16:
      return MatchEventType.CORNER
    case 15:
      return MatchEventType.OFFSIDE
    case 2:
      return MatchEventType.YELLOW_CARD
    case 3:
      return MatchEventType.RED_CARD
    case 6:
      return MatchEventType.PENALTY_AWARDED
    case 41:
      return MatchEventType.GOAL_PENALTY
    case 0:
      return MatchEventType.GOAL
    case 12:
      return MatchEventType.ATTEMPT_AT_GOAL
    case 5:
      return MatchEventType.SUBSTITUTION
  }
}

const scrapeEvents = async () => {
  try {
    const { data } = await axios.get(url)
    const events = data.Event
    console.log(Array.isArray(events) ? 'yes' : 'no')

    if(!Array.isArray(events)) {
      return
    }

    const matchId = 'clc64k78i0006v0zs51ml5147'
    const homeId = 'clc64k5ni0002v0zsl3ymiveh'
    const awayId = 'clc64k6ro0004v0zsrcp4obzt'
    const fifaHomeId = '43834'

    for (const event of events) {
      const eventType = getEventType(event.Type)
      if (!eventType) continue

      const additional: any = {}

      if (
        eventType !== MatchEventType.KICK_OFF
        && eventType !== MatchEventType.MATCH_END
      ) {
        additional.teamId = event.IdTeam === fifaHomeId ? homeId : awayId
        additional.description = event.EventDescription?.[0]?.Description
      }

      await prisma.matchEvent.create({
        data: {
          matchId,
          eventType,
          minute: event.MatchMinute,
          homeScore: event.HomeGoals,
          awayScore: event.AwayGoals,
          ...additional,
        },
      })
    }

    console.log('done')
  } catch (e) {
    console.error(e)
  }
}

export default scrapeEvents