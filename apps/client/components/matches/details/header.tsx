import getTeamIcon from '@lib/get-team-icon'
import Link from 'next/link'
import Countdown from '@components/matches/details/countdown'
import getType from '@lib/get-type'

interface HeaderProps {
  id: string
  homeTeam: {
    id: string
    name: string
  }
  homeScore: number
  awayTeam: {
    id: string
    name: string
  }
  awayScore: number
  date: string
  group?: string
  matchNumber: number
  roundNumber: number
  ended: boolean
  isLoading: boolean
}

const Header = (
  {
    homeTeam,
    homeScore,
    awayTeam,
    awayScore,
    group,
    date,
    matchNumber,
    roundNumber,
    isLoading,
    ended,
  }: HeaderProps) => {

  // format date to dd mm yyyy
  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  // format time to hh:mm
  const formattedTime = new Date(date).toLocaleTimeString('en-GB', {
    hour: 'numeric',
    minute: '2-digit',
  })

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-pulse w-32 h-5 rounded-md bg-gray-100" />
      </div>
    )

  return (
    <div className="flex flex-col gap-10">
      <div>
        <div className="flex items-center justify-between font-medium text-gray-400">
          <p>{getType(roundNumber, matchNumber, group)}</p>
          <div className="flex items-center gap-3 uppercase">
            <p>{formattedTime}</p>
            <div className="w-1.5 aspect-square bg-current rounded-full" />
            <p>{formattedDate}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-3 items-center gap-0">
          <Link
            href={`/teams/${homeTeam.name.replace(' ', '-').toLowerCase()}`}
            className="hover:opacity-60 transition-all duration-200 ease-in-out justify-self-end"
          >
            <div className="flex items-center gap-8">
              <h1 className="text-xl uppercase font-medium tracking-wide">
                {homeTeam.name}
              </h1>
              <div className="w-24 aspect-square">
                {getTeamIcon(homeTeam.name)}
              </div>
            </div>
          </Link>
          <div className="justify-self-center flex items-center justify-center gap-4 text-3xl font-light">
            {ended ? (
              <>
                <p>{homeScore}</p>
                <p>-</p>
                <p>{awayScore}</p>
              </>
            ) : (
              <Link
                href={`/matches/${matchNumber}/purchase`}
                className="bg-primary dark:bg-secondary dark:text-black dark:hover:border-secondary-700 text-sm font-medium text-white px-4 py-1.5 rounded-md border border-transparent hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-200 ease-in-out"
              >
                Buy Ticket
              </Link>
            )}
          </div>
          <Link
            href={`/teams/${awayTeam.name.replace(' ', '-').toLowerCase()}`}
            className="hover:opacity-60 transition-all duration-200 ease-in-out justify-self-start"
          >
            <div className="flex items-center gap-8">
              <div className="w-24 aspect-square">
                {getTeamIcon(awayTeam.name)}
              </div>
              <h1 className="text-xl uppercase font-medium tracking-wide">
                {awayTeam.name}
              </h1>
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center">
          {ended ? (
            <div className="bg-primary rounded px-2 py-1 text-secondary text-sm font-medium">
              Full Time
            </div>
          ) : (
            <div className="text-gray-500 text-center flex flex-col gap-2">
              <p>Kick off in</p>
              <Countdown date={date} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header