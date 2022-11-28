import AppLayout from '@layouts/app'
import { NextSeo } from 'next-seo';
import Tickets from '@components/tickets'

const TicketsPage = () => {
  return (
    <AppLayout activePage="Tickets">
      <NextSeo
        title="Tickets"
        description="See available tickets for all the upcoming FIFA World Cup Qatar 2022 matches."
      />
      <Tickets />
    </AppLayout>
  )
}

export default TicketsPage