import getTeamIcon from '@lib/get-team-icon'
import Link from 'next/link'

const MatchEnd = ({ event, match }: any) => {
  return (
    <div
      className="px-10 py-6 rounded-lg flex flex-col gap-1 items-center justify-center shadow-md border bg-white text-gray-600"
    >
      <h1 className="text-xl font-semibold">
        Match End
      </h1>
      <p>
        {event.minute}
      </p>
      <div className="grid grid-cols-[1fr_0.25fr_1fr] gap-5 mt-5">
        <Link
          href={`/teams/${match.homeTeam.name.replace(' ', '-').toLowerCase()}`}
          className="hover:opacity-60 transition-all duration-200 ease-in-out justify-self-end"
        >
          <div className="flex items-center gap-8">
            <h1 className="text-lg uppercase font-medium tracking-wide">
              {match.homeTeam.name}
            </h1>
            <div className="w-16 aspect-square">
              {getTeamIcon(match.homeTeam.name)}
            </div>
          </div>
        </Link>
        <div className="self-center justify-self-center">
          {event.homeScore} - {event.awayScore}
        </div>
        <Link
          href={`/teams/${match.awayTeam.name.replace(' ', '-').toLowerCase()}`}
          className="hover:opacity-60 transition-all duration-200 ease-in-out justify-self-end"
        >
          <div className="flex items-center gap-8">
            <div className="w-16 aspect-square">
              {getTeamIcon(match.awayTeam.name)}
            </div>
            <h1 className="text-lg uppercase font-medium tracking-wide">
              {match.awayTeam.name}
            </h1>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default MatchEnd