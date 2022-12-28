import getDynamicQuery from '@lib/get-dynamic-query'
import useMatchQuery from '@services/shop/match-query'
import Header from '@components/matches/details/header'
import Seo from '@components/seo'
import HeaderSummary from '@components/matches/details/header-summary'
import Stadium from '@components/matches/details/stadium'
import Details from '@components/matches/details/details'

interface MatchPageProps {
  match: any
}

const Match = ({ match }: MatchPageProps) => {
  return (
    <div className="flex flex-col gap-20">
      <div className="flex flex-col gap-12 max-w-screen-xl mx-auto w-full">
        <Header {...match} isLoading={!match} />
        <HeaderSummary
          ended={match?.ended}
          homeTeamId={match.homeTeam.id}
          homeScore={match.homeScore}
          awayTeamId={match.awayTeam.id}
          awayScore={match.awayScore}
        />
        <Stadium stadium={match.stadium} />
      </div>
      <Details match={match} />
    </div>
  )
}

export default Match