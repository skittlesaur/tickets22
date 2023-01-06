import { useQuery } from 'react-query'
import SHOP_SERVICE from '@services/shop'
import Match from '@components/matches/main/match'
import Loader from '@components/loader'
import getType from '@lib/get-type'
import { motion } from 'framer-motion'

const Matches = ({ id }: any) => {
  const { data: matches } = useQuery({
    queryKey: ['team.matches', id],
    queryFn: () => SHOP_SERVICE.get(`/team/${id}/matches`).then((res) => res.data),
    enabled: !!id,
  })

  if (!matches)
    return (
      <div className="flex flex-col gap-8 my-16">
        <Loader />
      </div>
    )

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', {
      month: 'long',
      day: 'numeric',
    })
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-10"
    >
      <div className="py-4 bg-gray-50 rounded-lg flex flex-col gap-4 dark:bg-gray-980 transition-all duration-200 ease-in-out">
        {matches.map((match: any) => (
          <div key={match.matchNumber} className="flex flex-col gap-4">
            <h2 className="uppercase text-xl font-medium">
              {formatDate(match.date)} - {getType(match.roundNumber, match.matchNumber, match.group)}
            </h2>
            <Match match={match} />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default Matches