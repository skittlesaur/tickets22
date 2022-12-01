import AppLayout from '@layouts/app'
import Tickets from '@components/tickets'
import Seo from '@components/seo'

const TicketsPage = () => {
  return (
    <AppLayout activePage="Tickets">
      <Seo
        title="Tickets"
        description="See available tickets for all the upcoming FIFA World Cup Qatar 2022 matches."
      />
      <Tickets />
    </AppLayout>
  )
}

export default TicketsPage