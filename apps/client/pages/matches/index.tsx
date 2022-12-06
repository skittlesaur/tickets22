import AppLayout from '@layouts/app'
import Matches from '@components/matches/main'
import Seo from '@components/seo'
import SHOP_SERVICE from '@services/shop'

interface MatchesPageProps {
  matches: any
  upcoming: any
}

const MatchesPage = ({ matches, upcoming }: MatchesPageProps) => {
  return (
    <AppLayout activePage="Matches">
      <Seo
        title="Matches"
        description="See all the upcoming FIFA World Cup Qatar 2022 matches and purchase tickets."
      />
      <Matches matches={matches} upcoming={upcoming} />
    </AppLayout>
  )
}

export const getStaticProps = async () => {
  const matches = await SHOP_SERVICE.get(`/matches`).then((res) => res.data)
  const upcoming = await SHOP_SERVICE.get(`/matches/upcoming`).then((res) => res.data)

  return {
    props: {
      matches,
      upcoming,
    },
    revalidate: 10,
  }
}

export default MatchesPage