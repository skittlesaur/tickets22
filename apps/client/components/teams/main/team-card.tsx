import getTeamIcon from '@lib/get-team-icon'
import SquareIcon from '@images/square-icon.svg'
import Link from 'next/link'
import { useState } from 'react'

const TeamCard = ({ team }: any) => {
  const [hover, setHover] = useState(false)
  return (
    <div className="relative">
      <SquareIcon className="absolute inset-0 text-secondary group-hover:text-primary" />
      <Link
        href={`/teams/${team.id}`}
        className="relative z-[1] flex flex-col items-center gap-4 p-10"
      >
        <div className="w-20 aspect-square">
          {getTeamIcon(team.name)}
        </div>
        <h2 className="font-qatar text-2xl">{team.name}</h2>
      </Link>
    </div>
  )
}

export default TeamCard