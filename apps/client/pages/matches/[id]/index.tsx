import AppLayout from '@layouts/app'
import Match from '@components/matches/details'
import axios from 'axios'
import { CLIENT_URL } from '@services/constants'
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next'
import SHOP_SERVICE from '@services/shop'

interface MatchPageProps {
  match: any
}

const MatchPage = ({ match }: MatchPageProps) => {
  return (
    <AppLayout activePage="Matches">
      <Match match={match} />
    </AppLayout>
  )
}

export const getStaticPaths = async () => {
  const matches = await SHOP_SERVICE.get(`/matches`).then((res) => res.data)

  const paths = matches.map((match: any) => ({
    params: { id: match.id.toString() },
  }))

  return { paths, fallback: 'blocking' }
}
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { id } = context.params ?? {}
  const match = await SHOP_SERVICE.get(`/matches/${id}`).then((res) => res.data)

  return {
    props: {
      match,
    },
    revalidate: 10,
  }
}

export default MatchPage