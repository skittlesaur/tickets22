import getDynamicQuery from '@lib/get-dynamic-query'
import useMatchQuery from '@services/shop/match-query'
import Header from '@components/matches/details/header'
import Seo from '@components/seo'

const Match = () => {
  const matchId = getDynamicQuery('id')
  const { data: match, isLoading }: any = useMatchQuery(matchId)

  return (
    <div className="flex flex-col">
      <Seo
        title={`${isLoading ? 'Loading Match...' : `${match?.homeTeam?.name} ${match.homeScore !== null && match.awayScore !== null ? `${match.homeScore}-${match.awayScore}` : 'vs'} ${match?.awayTeam?.name}`} - World Cup 2022`}
      />
      <Header {...match} isLoading={isLoading} />
    </div>
  )
}

export default Match