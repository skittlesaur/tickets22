import getDynamicQuery from '@lib/get-dynamic-query'
import useMatchQuery from '@services/shop/match-query'
import Header from '@components/matches/details/header'
import Seo from '@components/seo'
import HeaderSummary from '@components/matches/details/header-summary'

const Match = () => {
  const matchId = getDynamicQuery('id')
  const { data: match, isLoading }: any = useMatchQuery(matchId)

  if (isLoading)
    return (
      <div>
        <Seo title="Loading Match..." />
        Loading
      </div>
    )

  return (
    <div className="flex flex-col">
      <Seo
        title={`${match.homeTeam.name} ${match.homeScore !== null && match.awayScore !== null ? `${match.homeScore}-${match.awayScore}` : 'vs'} ${match.awayTeam.name} - World Cup 2022`}
      />
      <div className="flex flex-col gap-12">
        <Header {...match} isLoading={isLoading} />
        <HeaderSummary
          ended={match?.ended}
          homeTeamId={match.homeTeam.id}
          homeScore={match.homeScore}
          awayTeamId={match.awayTeam.id}
          awayScore={match.awayScore}
        />
        {match && (
          <>
            <div className="w-full h-[1px] bg-gray-200" />
            <div className="flex items-center justify-center text-sm">
              <div className="w-16 aspect-square select-none">
                <img src={`/images/stadiums/${match.stadium.name.replace(/ /g, '-').toLowerCase()}.webp`} />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Stadium</p>
                <p className="text-gray-500 font-medium">
                  {match.stadium.name}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Match