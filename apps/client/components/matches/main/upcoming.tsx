import UpcomingCard from '@components/matches/main/upcoming-card'
import { useState } from 'react'
import BallIcon from '@images/ball.svg'
import LinedSparkles from '@images/lined-sparkles.svg'
import Sparkle from '@images/sparkle.svg'
import Diamond from '@images/diamond.svg'

const MAX_TICKETS = 1
const Upcoming = () => {
  const [current, setCurrent] = useState(0)

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-black text-4xl">
        Upcoming
      </h1>
      <div className="relative overflow-hidden rounded-lg shadow-lg border border-primary md:h-[18em]">
        <div className="relative w-full flex flex-col gap-3 p-4 md:p-6">
          <div className="flex items-center gap-2 z-[2]">
            <BallIcon className="w-5 aspect-square fill-primary" />
            <LinedSparkles className="w-24" />
          </div>
          {Array.from({ length: MAX_TICKETS }).map((_, i) => (
            <UpcomingCard key={i} />
          ))}
          <div className="flex justify-end z-[2]">
            <Sparkle className="w-4 md:w-6 aspect-square" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: MAX_TICKETS }).map((_, i) => (
          <Diamond
            key={i}
            className={`w-5 md:w-6 aspect-square cursor-pointer ${i === current ? 'fill-primary' : 'fill-secondary'} hover:drop-shadow-md transition-all duration-300 ease-in-out`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  )
}

export default Upcoming