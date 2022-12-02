import getDynamicQuery from '@lib/get-dynamic-query'
import useMatchQuery from '@services/shop/match-query'
import Header from '@components/matches/details/header'

const Match = () => {
  const matchId = getDynamicQuery('id')
  const { data: match, isLoading }: any = useMatchQuery(matchId)

  return (
    <div className="flex flex-col">
      <Header {...match} isLoading={isLoading} />
    </div>
  )
}

export default Match