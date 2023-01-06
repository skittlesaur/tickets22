import useMatchSummaryQuery from '@services/shop/match-summary-query'
import Goal from '@components/matches/details/timeline/goal'
import { useMemo, useState } from 'react'
import DefaultStyle from '@components/matches/details/timeline/default-style'
import YellowCard from '@components/matches/details/timeline/yellow-card'
import RedCard from '@components/matches/details/timeline/red-card'
import WhistleIcon from '@images/whistle.svg'
import SubstitutionIcon from '@images/substitution.svg'
import AttemptIcon from '@images/attempt.svg'
import CornerIcon from '@images/corner.svg'
import OffsideIcon from '@images/offside.svg'
import PenaltyIcon from '@images/penalty.svg'
import TimeIcon from '@images/time.svg'
import VarIcon from '@images/var.svg'
import YellowCardIcon from '@images/yellow-card.svg'
import RedCardIcon from '@images/red-card.svg'
import Kickoff from '@components/matches/details/timeline/kickoff'
import MatchEnd from '@components/matches/details/timeline/matchEnd'
import PenaltyAwarded from '@components/matches/details/timeline/penalty-awarded'

const toggles = [
  {
    name: 'Yellow card',
    eventType: 'YELLOW_CARD',
    Icon: YellowCardIcon,
  },
  {
    name: 'Red card',
    eventType: 'RED_CARD',
    Icon: RedCardIcon,
  },
  {
    name: 'Attempt at goal',
    eventType: 'ATTEMPT_AT_GOAL',
    Icon: AttemptIcon,
  },
  {
    name: 'Corner',
    eventType: 'CORNER',
    Icon: CornerIcon,
  },
  {
    name: 'Foul',
    eventType: 'FOUL',
    Icon: WhistleIcon,
  },
  {
    name: 'Substitution',
    eventType: 'SUBSTITUTION',
    Icon: SubstitutionIcon,
  },
  {
    name: 'Offside',
    eventType: 'OFFSIDE',
    Icon: OffsideIcon,
  },
  {
    name: 'VAR',
    eventType: 'VAR',
    Icon: VarIcon,
  },
]

interface TimelineProps {
  match: any
}

const Timeline = ({ match }: TimelineProps) => {
  const { data: timeline, isLoading } = useMatchSummaryQuery(match.matchNumber)
  const sortedTimeline = useMemo(() => [...timeline ?? []].reverse(), [timeline])
  const [hiddenEvents, setHiddenEvents] = useState<any>([])


  if (isLoading || !timeline)
    return null

  const getEventComponent = (event: any) => {
    if (hiddenEvents.includes(event.eventType)) return null

    switch (event.eventType.toUpperCase()) {
      case 'GOAL_PENALTY':
      case 'GOAL':
        return <Goal key={event.id} event={event} match={match} />
      case 'YELLOW_CARD':
        return <YellowCard key={event.id} event={event} match={match} />
      case 'RED_CARD':
        return <RedCard key={event.id} event={event} match={match} />
      case 'KICK_OFF':
        return <Kickoff key={event.id} event={event} match={match} Icon={TimeIcon} />
      case 'MATCH_END':
        return <MatchEnd key={event.id} event={event} match={match} Icon={WhistleIcon} />
      case 'PENALTY_AWARDED':
        return <PenaltyAwarded key={event.id} event={event} match={match} Icon={PenaltyIcon} />
      case 'FOUL':
        return <DefaultStyle key={event.id} event={event} match={match} Icon={WhistleIcon} />
      case 'SUBSTITUTION':
        return <DefaultStyle key={event.id} event={event} match={match} Icon={SubstitutionIcon} />
      case 'ATTEMPT_AT_GOAL':
        return <DefaultStyle key={event.id} event={event} match={match} Icon={AttemptIcon} />
      case 'CORNER':
        return <DefaultStyle key={event.id} event={event} match={match} Icon={CornerIcon} />
      case 'OFFSIDE':
        return <DefaultStyle key={event.id} event={event} match={match} Icon={OffsideIcon} />
      case 'PENALTY':
        return <DefaultStyle key={event.id} event={event} match={match} Icon={PenaltyIcon} />
      case 'VAR':
        return <DefaultStyle key={event.id} event={event} match={match} Icon={VarIcon} />
      default:
        return <DefaultStyle key={event.id} event={event} match={match} />
    }
  }

  const handleHideEvent = (eventType: string) => {
    setHiddenEvents((prev: any) => (prev.includes(eventType) ? prev.filter((e: any) => e !== eventType) : [...prev, eventType]))
  }

  return (
    <div className="py-8 flex flex-col gap-8 max-w-screen-xl mx-auto w-full">
      <div className="flex items-center justify-center gap-2">
        {toggles.map((toggle) => (
          <div key={toggle.eventType} className="relative group">
            <div
              className="hidden group-hover:block bg-gray-900 text-white px-2 py-1 text-sm rounded-lg absolute whitespace-nowrap z-10 left-full ml-2 top-1/2 -translate-y-1/2"
            >
              {hiddenEvents.includes(toggle.eventType) ? 'Show' : 'Hide'} {toggle.name} events
            </div>
            <button
              className={`w-10 flex items-center justify-center aspect-square ${hiddenEvents.includes(toggle.eventType) ? 'opacity-60' : 'opacity-100'} hover:opacity-80 transition-all duration-200 ease-in-out`}
              onClick={() => {
                handleHideEvent(toggle.eventType)
              }}
            >
              <toggle.Icon />
            </button>
          </div>
        ))}
      </div>
      {sortedTimeline.map((event) => getEventComponent(event))}
    </div>
  )
}

export default Timeline