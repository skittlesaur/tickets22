import Seo from '@components/seo'
import AppLayout from '@layouts/app'
import Team from '@components/teams/specific'
import SHOP_SERVICE from '@services/shop'

const TeamSpecificPage = ({ team }: any) => {
  if (!team) return null

  return (
    <AppLayout activePage="Teams" isFullWidth noPaddingY>
      <Seo
        title={`${team.name}`}
        description={`Check out ${team.name} team page`}
      />
      <Team team={team} />
    </AppLayout>
  )
}

export const getStaticPaths = async () => {
  try {
    const { data: teams } = await SHOP_SERVICE.get('/team')

    const paths = teams.map((team: any) => ({
      params: { name: team.name.replace(' ', '-').toLowerCase() },
    }))

    return {
      paths,
      fallback: false,
    }
  } catch (e) {
    return {
      redirect: {
        destination: '/404',
      },
    }
  }
}

export const getStaticProps = async ({ params }: any) => {
  try {
    const { data: team } = await SHOP_SERVICE.get(`/team/${params.name}`)

    return {
      props: {
        team,
      },
    }
  } catch (e) {
    return {
      props: {
        team: null,
      }
    }
  }
}

export default TeamSpecificPage