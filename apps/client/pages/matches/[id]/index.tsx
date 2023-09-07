import AppLayout from '@layouts/app'
import Match from '@components/matches/details'
import { GetStaticPropsContext } from 'next'
import SHOP_SERVICE from '@services/shop'
import Seo from '@components/seo'

interface MatchPageProps {
  match: any
}

const MatchPage = ({ match }: MatchPageProps) => {
  if (!match) return null

  return (
    <AppLayout isFullWidth activePage="Matches">
      <Seo
        title={`${match.homeTeam.name} vs ${match.awayTeam.name}`}
        description={`Discover the ${match.homeTeam.name} vs ${match.awayTeam.name} match details, including the date, time, and venue. Stay updated with all the action and results.`}
      />
      <Match match={match} />
    </AppLayout>
  )
}

export const getServerSideProps = async (context: GetStaticPropsContext) => {
  try {
    const { id } = context.params ?? {}
    if (!id)
      throw new Error('No match id provided')

    const match = await SHOP_SERVICE.get(`/matches/${id}`).then((res) => res.data)

    return {
      props: {
        match,
      }
    }
  } catch (e) {
    return { props: { match: null }, redirect: { destination: '/matches', permanent: false } }
  }
}

export default MatchPage