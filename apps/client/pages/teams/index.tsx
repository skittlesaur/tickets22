import AppLayout from '@layouts/app'
import Seo from '@components/seo'
import Teams from '@components/teams/main'
import SHOP_SERVICE from '@services/shop'

const TeamsPage = ({ teams }: any) => {
  if (!teams) return null

  return (
    <AppLayout activePage="Teams">
      <Seo title="Teams" description="See all the FIFA World Cup Qatar 2022 teams." />
      <Teams teams={teams} />
    </AppLayout>
  )
}

export const getStaticProps = async () => {
  try {
    const { data: teams } = await SHOP_SERVICE.get('/team')
    const filteredTeams = teams.filter((team: any) => team.name.length > 3 || team.name === 'USA')

    return {
      props: {
        teams: filteredTeams,
      },
    }
  } catch (e) {
    return {
      redirect: {
        destination: '/404',
      }
    }
  }
}

export default TeamsPage