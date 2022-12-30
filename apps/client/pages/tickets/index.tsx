import AppLayout from '@layouts/app'
import Seo from '@components/seo'
import Index from '@components/tickets'

const TicketsPage = () => {
  return (
    <AppLayout>
      <Seo
        title="My Tickets"
      />
      <Index />
    </AppLayout>
  )
}

export default TicketsPage