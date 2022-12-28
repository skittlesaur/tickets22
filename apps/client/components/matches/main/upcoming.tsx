import UpcomingCard from '@components/matches/main/upcoming-card'
import { useState } from 'react'
import BallIcon from '@images/ball.svg'
import LinedSparkles from '@images/lined-sparkles.svg'
import Sparkle from '@images/sparkle.svg'
import Diamond from '@images/diamond.svg'
import Loader from '@components/loader'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

interface UpcomingProps {
  upcoming: any
}

const Upcoming = ({ upcoming = [] }: UpcomingProps) => {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState(0)

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-black text-4xl">
        Upcoming
      </h1>
      <Link
        href={`/matches/${upcoming[current].matchNumber}`}
        className="relative group overflow-hidden rounded-lg shadow-md border border-primary text-primary md:h-[18em] hover:shadow-xl hover:bg-primary hover:text-white transition-all duration-150 ease-in-out"
      >
        <div className="relative w-full flex flex-col gap-3 p-4 md:p-6">
          <div className="flex items-center gap-2 z-[2]">
            <BallIcon className="w-5 aspect-square fill-current" />
            <LinedSparkles className="w-24 fill-current" />
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current}
              initial={{ opacity: 0, x: current >= prev ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: current >= prev ? -100 : 100 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <UpcomingCard match={upcoming[current]} />
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-end z-[2]">
            <Sparkle className="w-4 md:w-6 aspect-square fill-current" />
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: upcoming.length }).map((_, i) => (
          <Diamond
            key={i}
            className={`w-5 md:w-6 aspect-square cursor-pointer ${i === current ? 'fill-primary' : 'fill-secondary'} hover:drop-shadow-md transition-all duration-300 ease-in-out`}
            onClick={() => {
              setPrev(current)
              setCurrent(i)
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Upcoming