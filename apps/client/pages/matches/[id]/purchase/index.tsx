import Purchase from '@components/purchase'
import { GetStaticPaths } from 'next'
import SHOP_SERVICE from '@services/shop'
import Seo from '@components/seo'
import getType from '@lib/get-type'

interface PurchasePageProps {
  match: any
}

const PurchasePage = ({ match }: PurchasePageProps) => {
  return (
    <>
      <Seo title={`Purchase a Ticket: ${match.homeTeam.name} vs ${match.awayTeam.name} - ${getType(match.roundNumber, match.matchNumber, match.group)}`} />
      <Purchase match={match} />
    </>
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