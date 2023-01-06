import MatchesQuery from '@services/shop/matches-query'
import Loader from '@components/loader'
import getType from '@lib/get-type'
import { useMemo, useState } from 'react'
import { VictoryBar, VictoryChart } from 'victory'
import useMatches from '@services/analytics/matches'

const Game = () => {
  const { data: matches, isLoading: isLoadingMatches } = MatchesQuery()
  const { data, isLoading } = useMatches()
  const [activeMatch, setActiveMatch] = useState(1)

  const activeMatchData = useMemo(() => {
    if (!data || isLoading) return []

    return data.find((datum: any) => datum.match.matchNumber === activeMatch)
  }, [data, activeMatch])

  const yMax = useMemo(() => {
    if (!data || isLoading) return 0

    const max = Math.max(activeMatchData.purchasedTickets, activeMatchData.pendingTickets, activeMatchData.cancelledTickets)

    return max + 1
  }, [activeMatchData])

  return (
    <div className="col-span-2 bg-gray-100 dark:bg-gray-900 rounded-lg flex flex-col gap-10 px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="font-semibold text-xl">
            Per Match
          </h1>
          <p className="text-gray-500 text-sm">
            An overview of tickets sold per match.
          </p>
        </div>
        {!isLoadingMatches && matches && (
          <select
            value={activeMatch}
            onChange={(e) => setActiveMatch(Number(e.target.value))}
            className="border border-gray-300 dark:border-gray-700 rounded-md text-sm px-4 py-2"
          >
            {matches.map((match: any) => (
              <option key={match.matchNumber} value={match.matchNumber}>
                {getType(match.roundNumber, match.matchNumber, match.group)}: {match.homeTeam.name} vs {match.awayTeam.name}
              </option>
            ))}
          </select>
        )}
      </div>
      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex gap-4">
          <div className="h-64 graph">
            <VictoryChart
              domain={{ y: [0, yMax] }}
              domainPadding={{ x: 40 }}
            >
              <VictoryBar
                data={[
                  { x: 'Purchased', y: activeMatchData?.purchasedTickets },
                  { x: 'Pending', y: activeMatchData?.pendingTickets },
                  { x: 'Canceled', y: activeMatchData?.cancelledTickets },
                ]}
                style={{
                  data: {
                    fill: '#83113A',
                  },
                }}
              />
            </VictoryChart>
          </div>
          <div className="flex flex-col grow gap-4">
            <div className="flex items-end gap-4">
              <p className="text-gray-500 text-4xl w-14">
                {activeMatchData?.purchasedTickets}
              </p>
              <h2 className="font-semibold">
                Purchased Tickets
              </h2>
            </div>
            <div className="flex items-end gap-4">
              <p className="text-gray-500 text-4xl w-14">
                {activeMatchData?.pendingTickets}
              </p>
              <h2 className="font-semibold">
                Pending Tickets
              </h2>
            </div>
            <div className="flex items-end gap-4">
              <p className="text-gray-500 text-4xl w-14">
                {activeMatchData?.cancelledTickets}
              </p>
              <h2 className="font-semibold">
                Canceled Tickets
              </h2>
            </div>
            <div className="flex items-end gap-4">
              <p className="text-gray-500 text-4xl w-14">
                {activeMatchData?.purchasedTickets + activeMatchData?.pendingTickets + activeMatchData?.cancelledTickets}
              </p>
              <h2 className="font-semibold">
                Total Tickets
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Game