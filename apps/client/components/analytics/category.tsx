import { VictoryBar, VictoryChart, VictoryGroup, VictoryTooltip } from 'victory'
import useOverall from '@services/analytics/overall'
import { useMemo } from 'react'
import Loader from '@components/loader'

const Category = () => {
  const { data, isLoading } = useOverall()
  const chartData: any = useMemo(() => {
    if (!data || isLoading) return []

    const categoryOne = {
      purchased: data.purchasedTicketsCategories[0],
      pending: data.pendingTicketsCategories[0],
      canceled: data.cancelledTicketsCategories[0],
    }

    const categoryTwo = {
      purchased: data.purchasedTicketsCategories[1],
      pending: data.pendingTicketsCategories[1],
      canceled: data.cancelledTicketsCategories[1],
    }

    const categoryThree = {
      purchased: data.purchasedTicketsCategories[2],
      pending: data.pendingTicketsCategories[2],
      canceled: data.cancelledTicketsCategories[2],
    }

    return [
      categoryOne,
      categoryTwo,
      categoryThree,
    ]
  }, [data])

  const yMax = useMemo(() => {
    if (!data || isLoading) return 0

    const max = Math.max(...data.purchasedTicketsCategories, ...data.pendingTicketsCategories, ...data.cancelledTicketsCategories)
    return max + 2
  }, [data])

  return (
    <div className="bg-gray-100 dark:bg-gray-900 rounded-lg flex flex-col gap-10 px-8 py-4">
      <div className="flex flex-col">
        <h1 className="font-semibold text-xl">
          Per Category
        </h1>
        <p className="text-gray-500 text-sm">
          An overview of tickets sold per category.
        </p>
      </div>
      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="h-64 graph">
          <VictoryChart
            domain={{ y: [0, yMax] }}
          >
            {chartData.map((data: any, index: number) => (
              <VictoryGroup
                key={index}
                offset={20}
              >
                {Object.keys(data).map((key, j) => (
                  <VictoryBar
                    key={(index + 1) * (j + 1)}
                    data={[
                      {
                        x: `Category ${index + 1}`,
                        y: data[key],
                      },
                    ]}
                    style={{
                      data: {
                        fill: key === 'purchased' ? '#20e5cb' : key === 'pending' ? '#f8c14c' : '#ce3131',
                      },
                    }}
                    labels={({ datum }) => `${datum.y} ${key}`}
                    labelComponent={<VictoryTooltip
                      cornerRadius={8}
                      flyoutStyle={{
                        fill: 'white',
                        stroke: 'black',
                      }}
                      flyoutPadding={4}
                    />}
                  />
                ))}
              </VictoryGroup>
            ))}
          </VictoryChart>
        </div>
      )}
    </div>
  )
}

export default Category