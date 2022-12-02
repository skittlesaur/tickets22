import AppLayout from '@layouts/app'
import Tickets from '@components/matches/main'
import Seo from '@components/seo'

const TicketsPage = () => {
  return (
    <AppLayout activePage="Matches">
      <Seo
        title="Matches"
        description="See all the upcoming FIFA World Cup Qatar 2022 matches and purchase tickets."
      />
      <Tickets />
    </AppLayout>
  )
}

export default TicketsPage