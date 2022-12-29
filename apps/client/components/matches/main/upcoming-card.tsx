import getTeamIcon from '@lib/get-team-icon'
import getType from '@lib/get-type'
import useRandomPlayerQuery from '@services/shop/random-player-query'

interface UpcomingCardProps {
  match: any
}

const UpcomingCard = ({ match }: UpcomingCardProps) => {
  const { data: homePlayer, isLoading: homePlayerLoading } = useRandomPlayerQuery(match.homeTeam.matchNumber)
  const { data: awayPlayer, isLoading: awayPlayerLoading } = useRandomPlayerQuery(match.awayTeam.matchNumber)

  if (!match)
    return <></>

  const date = new Date(match.date)
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const formattedTime = date.toLocaleTimeString('en-GB', {
    hour: 'numeric',
    minute: 'numeric',
  })

  return (
    <>
      <div className="relative z-[1] flex items-center justify-center gap-2 md:gap-24">
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 md:w-32 aspect-square">
            {getTeamIcon(match.homeTeam.name)}
          </div>
          <div className="font-qatar font-black text-lg md:text-xl">
            {match.homeTeam.name}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 text-sm font-light text-center">
          <p>{getType(match.roundNumber, match.matchNumber, match.group)}</p>
          <p className="text-xl font-normal">vs</p>
          <p>{formattedDate} at {formattedTime}</p>
        </div>
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 md:w-32 aspect-square">
            {getTeamIcon(match.awayTeam.name)}
          </div>
          <div className="font-qatar font-black text-lg md:text-xl">
            {match.awayTeam.name}
          </div>
        </div>
      </div>
      {!homePlayerLoading && !awayPlayerLoading && (
        <div className="z-[0] absolute inset-0 items-start justify-between select-none hidden md:flex">
          <img
            src={homePlayer.imageUri}
            alt={homePlayer.firstName}
            className="object-cover w-[50%] mix-blend-luminosity grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:drop-shadow-2xl opacity-50 -ml-24 -mt-24 transition-all duration-150 ease-in-out"
          />
          <img
            src={awayPlayer.imageUri}
            alt={awayPlayer.firstName}
            className="object-cover w-[50%] mix-blend-luminosity grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:drop-shadow-2xl opacity-50 -mr-24 -mt-24 transition-all duration-150 ease-in-out"
          />
        </div>
      )}
    </>
  )
}

export default UpcomingCard