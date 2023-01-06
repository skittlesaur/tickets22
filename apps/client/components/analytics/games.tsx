import useMatches from '@services/analytics/matches'
import { VictoryArea, VictoryChart } from 'victory'
import { useMemo } from 'react'
import Loader from '@components/loader'

const Games = () => {
  const { data, isLoading } = useMatches()

  const chartData = useMemo(() => {
    if (!data || isLoading) return []

    return data.map((datum: any) => ({
      x: datum.match.matchNumber,
      y: datum.purchasedTickets,
    }))
  }, [data])

  const yMax = useMemo(() => {
    if (!data || isLoading) return 0

    const max = Math.max(...data.map((datum: any) => datum.purchasedTickets))

    return max + 1
  }, [data])

  return (
    <div className="col-span-3 bg-gray-100 dark:bg-gray-900 rounded-lg flex flex-col gap-10 px-8 py-4">
      <div className="flex flex-col">
        <h1 className="font-semibold text-xl">
          Matches
        </h1>
        <p className="text-gray-500 text-sm">
          An overview of tickets sold per match.
        </p>
      </div>
      {isLoading ? (
        <div className="h-96 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="h-96 graph">
          <VictoryChart
            domain={{ x: [1, 64], y: [0, yMax] }}
            width={1000}
          >
            <VictoryArea
              interpolation="natural"
              style={{
                data: {
                  fill: '#83113A',
                },
              }}
              data={chartData}
            />
          </VictoryChart>
        </div>
      )}
    </div>
  )
}

export default Games