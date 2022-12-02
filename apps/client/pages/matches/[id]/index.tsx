import AppLayout from '@layouts/app'
import Match from '@components/matches/details'

const MatchPage = () => {
  return (
    <AppLayout activePage="Matches">
      <Match />
    </AppLayout>
  )
}

export default MatchPage