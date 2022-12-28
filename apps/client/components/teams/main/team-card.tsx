import getTeamIcon from '@lib/get-team-icon'
import SquareIcon from '@images/square-icon.svg'
import Link from 'next/link'
import { useState } from 'react'

const TeamCard = ({ team }: any) => {
  const [hover, setHover] = useState(false)

  return (
    <div className="relative w-52 aspect-square">
      <SquareIcon className={`absolute inset-0 stroke-primary dark:stroke-secondary/50 ${hover ? 'text-primary dark:text-gray-700' : 'text-secondary dark:text-gray-800'} transition-all duration-200 ease-in-out`} />
      <Link
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        href={`/teams/${team.name.replace(' ', '-').toLowerCase()}`}
        className="relative z-[1] flex flex-col items-center gap-4 p-10 hover:text-secondary transition-all duration-200 ease-in-out"
      >
        <div className={`w-20 aspect-square ${hover ? 'drop-shadow-xl' : ''} transition-all duration-200 ease-in-out`}>
          {getTeamIcon(team.name)}
        </div>
        <h2 className="font-qatar text-2xl text-center">{team.name}</h2>
      </Link>
    </div>
  )
}

export default TeamCard