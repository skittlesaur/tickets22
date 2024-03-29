import Link from 'next/link'
import getType from '@lib/get-type'
import getTeamIcon from '@lib/get-team-icon'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import useRecommendations from '@services/analytics/recommendations'
import Loader from '@components/loader'

const Recommended = () => {
  const { matches, isLoading } = useRecommendations()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {
    amount: 0.5,
    once: true,
  })

  return (
    <div
      ref={ref}
      className="flex flex-col gap-8"
    >
      <h1 className="font-black text-4xl mx-4 md:mx-16 lg:mx-40">
        Recommended
      </h1>
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <Loader />
        </div>
      )}
      {matches && !isLoading && (
        <div className="grid lg:grid-cols-3 gap-8 items-center mx-4 md:mx-16 lg:mx-24">
          {matches.map((match: any, idx: number) => (
            <motion.div
              key={match.matchNumber}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: .45,
                delay: 0.25 * (idx + 1),
              }}
            >
              <Link
                href={`/matches/${match.matchNumber}`}
                className="relative group rounded-lg border border-primary dark:border-secondary-700 flex flex-col text-primary dark:text-secondary overflow-hidden text-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
              >
                <img
                  src="/images/pattern.jpg"
                  alt="pattern"
                  className="absolute animate-move-ltr inset-0 object-cover w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="relative z-[1] flex flex-col items-center gap-2 px-8 py-4 group-hover:text-secondary transition-all duration-300">
                  <p className="text-center">
                    {getType(match.roundNumber, match.matchNumber, match.group)}
                  </p>
                  <div className="flex items-center gap-10 justify-center">
                    <div className="relative z-[1] w-20 aspect-square flex items-center justify-center text-2xl">
                      {getTeamIcon(match.homeTeam.name) ?? match.homeTeam.name}
                    </div>
                    <p>
                      v
                    </p>
                    <div className="relative z-[1] w-20 aspect-square flex items-center justify-center text-2xl">
                      {getTeamIcon(match.awayTeam.name) ?? match.awayTeam.name}
                    </div>
                  </div>
                </div>
                <div className="relative z-[1] px-8 py-4 bg-gray-100 dark:bg-gray-800 border-t border-primary dark:border-secondary-700">
                  <p className="font-medium">
                    {match.stadium.name}
                  </p>
                  <p className="text-base">
                    {new Date(match.date).toLocaleString('en-US', {
                      month: 'long',
                      day: 'numeric',
                    })} at {new Date(match.date).toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: false,
                  })}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Recommended