import { MatchEventType, PrismaClient } from '@prisma/client'
import axios from 'axios'

const url = 'https://api.fifa.com/api/v3/timelines/17/255711/285063/400128082'
const prisma = new PrismaClient()

const getEventType = (type: string): MatchEventType | undefined => {
  switch (type) {
    case 'Start Time':
      return MatchEventType.KICK_OFF
    case 'End Time':
      return MatchEventType.MATCH_END
    case 'Foul':
      return MatchEventType.FOUL
    case 'VAR':
      return MatchEventType.VAR
    case 'Corner':
      return MatchEventType.CORNER
    case 'Offside':
      return MatchEventType.OFFSIDE
    case 'Yellow card':
      return MatchEventType.YELLOW_CARD
    case 'Red card':
      return MatchEventType.RED_CARD
    case 'Penalty Awarded':
      return MatchEventType.PENALTY_AWARDED
    case 'Penalty Goal':
      return MatchEventType.GOAL_PENALTY
    case 'Goal':
      return MatchEventType.GOAL
    case 'Attempt at Goal':
      return MatchEventType.ATTEMPT_AT_GOAL
    case 'Substitution':
      return MatchEventType.SUBSTITUTION
  }
}

const scrapeEvents = async () => {
  try {
    const { data } = await axios.get(url)
    const events = data.Event
    console.log(Array.isArray(events) ? 'yes' : 'no')

    const matchId = 'clb4zmk8t0006v0ygcjpd77fa'
    const homeId = 'clb4za9lz0002v0p8l1fl6rng'
    const awayId = 'clb4zaa6u0004v0p8s3smkqfk'
    const fifaHomeId = 43834

    for (const event of events) {
      const eventType = getEventType(event.TypeLocalized?.[0]?.Description)
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