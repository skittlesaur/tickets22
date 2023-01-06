import getDynamicQuery from '@lib/get-dynamic-query'
import useMatchSummaryQuery from '@services/shop/match-summary-query'
import BallIcon from '@images/ball.svg'
import formatPlayerName from '@lib/format-player-name'
import { Fragment } from 'react'

interface HeaderSummaryProps {
  homeTeamId: string
  homeScore: number
  awayTeamId: string
  awayScore: number
}

const HeaderSummary = ({ homeTeamId, homeScore, awayTeamId, awayScore }: HeaderSummaryProps) => {
  const matchId = getDynamicQuery('id')
  const { data: events, isLoading } = useMatchSummaryQuery(matchId)
  const mainEvents = events?.filter((event: any) => ['GOAL', 'GOAL_PENALTY'].includes(event.eventType)) ?? []

  if (isLoading) {
    const totalGoals = homeScore + awayScore
    return (
      <div className="grid grid-cols-[2fr_0.25fr_2fr] gap-4">
        {Array.from(Array(totalGoals)).map((_, index) => (
          <Fragment key={index}>
            <div className="flex items-center gap-2 animate-pulse justify-self-end">
              <div className="w-32 h-5 bg-gray-200 rounded-md" />
              <div className="w-5 h-5 bg-gray-200 rounded-full" />
            </div>
            <div className="w-5 h-5 rounded-md bg-gray-200 justify-self-center animate-pulse" />
            <div className="flex items-center gap-2 animate-pulse">
              <div className="w-5 h-5 bg-gray-200 rounded-full" />
              <div className="w-32 h-5 bg-gray-200 rounded-md" />
            </div>
          </Fragment>
        ))}
      </div>
    )
  }
  return (
    <div className="grid grid-cols-[2fr_0.25fr_2fr] gap-4 text-sm">
      {mainEvents.map((goal, index) => (
        <Fragment key={index}>
          {goal.team.id === homeTeamId ? (
            <div key={goal.id} className="flex gap-2 justify-end">
              <p>
                <span>
                  {formatPlayerName(goal.description.substring(0, goal.description.indexOf('(') - 1))}
                </span>
                {goal.eventType === 'GOAL_PENALTY' && (
                  <span className="font-medium text-xs text-gray-500">
                    {' '} (P)
                  </span>
                )}
              </p>
              <BallIcon className="w-5 aspect-square fill-black" />
            </div>
          ) : (
            <div />
          )}
          <p className="text-center text-gray-400">{goal.minute}</p>
          {goal.team.id === awayTeamId ? (
            <div key={goal.id} className="flex gap-2 justify-start">
              <BallIcon className="w-5 aspect-square fill-black" />
              <p>
                <span>
                  {formatPlayerName(goal.description.substring(0, goal.description.indexOf('(') - 1))}
                </span>
                {goal.eventType === 'GOAL_PENALTY' && (
                  <span className="font-medium text-xs text-gray-500">
                    {' '} (P)
                  </span>
                )}
              </p>
            </div>
          ) : (
            <div />
          )}
        </Fragment>
      ))}
    </div>
  )
}

export default HeaderSummary