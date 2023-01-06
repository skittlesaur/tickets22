import PerCategory from '@components/analytics/category'
import Games from '@components/analytics/games'
import PerGame from '@components/analytics/game'

const Analytics = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-black text-4xl">
        Analytics
      </h1>
      <div className="grid grid-cols-3 gap-4">
        <Games />
        <PerCategory />
        <PerGame />
      </div>
    </div>
  )
}

export default Analytics