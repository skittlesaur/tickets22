import Purchase from '@components/purchase'
import { GetStaticPaths } from 'next'
import getMatches from 'tickets22-shop/src/controllers/matches/get-matches'
import SHOP_SERVICE from '@services/shop'

interface PurchasePageProps {
  match: any
}

const PurchasePage = ({ match }: PurchasePageProps) => {
  return (
    <Purchase match={match} />
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const matches = await SHOP_SERVICE.get(`/matches`).then((res) => res.data)

  const paths = matches.map((match: any) => ({
    params: { id: match.matchNumber.toString() },
  }))

  return { paths, fallback: false }
}

export const getStaticProps = async (context: any) => {
  const { id } = context.params ?? {}
  if (!id)
    throw new Error('No match id provided')

  const match = await SHOP_SERVICE.get(`/matches/${id}`).then((res) => res.data)

  return {
    props: {
      match,
    },
  }
}

export default PurchasePage