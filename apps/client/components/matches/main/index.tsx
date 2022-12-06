import Upcoming from '@components/matches/main/upcoming'
import AllMatches from '@components/matches/main/all-matches'

interface MatchesPageProps {
  matches: any
  upcoming: any
}

const Matches = ({ matches, upcoming }: MatchesPageProps) => {
  return (
    <div className="flex flex-col gap-16">
      <Upcoming upcoming={upcoming}/>
      <AllMatches matches={matches} />
    </div>
  )
}

export default Matches