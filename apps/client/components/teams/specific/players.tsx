import { useQuery } from 'react-query'
import SHOP_SERVICE from '@services/shop'
import { useMemo } from 'react'
import PlayerCard from '@components/teams/specific/player-card'
import Loader from '@components/loader'
import { motion } from 'framer-motion'

const Players = ({ id }: any) => {
  const { data: players } = useQuery({
    queryKey: ['players', id],
    queryFn: () => SHOP_SERVICE.get(`/team/${id}/players`).then((res) => res.data),
  })

  const playersPositions = useMemo(() => {
    if (!players) return null

    const positions: any = {
      GOALKEEPER: [],
      DEFENDER: [],
      MIDFIELDER: [],
      FORWARD: [],
    }

    players.forEach((player: any) => {
      positions[player.position].push(player)
    })

    return positions
  }, [players])

  if (!playersPositions)
    return (
      <div className="flex flex-col gap-8 my-16">
        <Loader />
      </div>
    )

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-14"
    >
      <div className="flex flex-col gap-4">
        <h2 className="uppercase text-xl font-medium">
          Goalkeepers
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {playersPositions?.GOALKEEPER.map((player: any) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="uppercase text-xl font-medium">
          Defenders
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {playersPositions?.DEFENDER.map((player: any) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="uppercase text-xl font-medium">
          Midfielders
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {playersPositions?.MIDFIELDER.map((player: any) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="uppercase text-xl font-medium">
          Forwards
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {playersPositions?.FORWARD.map((player: any) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Players