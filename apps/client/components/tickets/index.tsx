import useUserTickets from '@services/reservations/user-tickets'
import Loader from '@components/loader'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import EmailModal from '@components/tickets/email-modal'
import { useRouter } from 'next/router'
import RequestAccess from '@components/tickets/request-access'
import TicketsDisplay from '@components/tickets/tickets-display'

const Tickets = () => {
  const router = useRouter()
  const { data: tickets, isLoading, isError } = useUserTickets()
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)

  if (isError) {
    router.push('/?error=Something went wrong while fetching your tickets')
    return null
  }

  return (
    <div className="flex flex-col gap-8">
      <AnimatePresence mode="wait">
        {isEmailModalOpen && (
          <EmailModal
            onClose={() => setIsEmailModalOpen(false)}
            key="email-modal"
          />
        )}
      </AnimatePresence>
      <h1 className="font-black text-4xl">
        My Tickets
      </h1>
      {isLoading && <Loader />}
      {(!isLoading && tickets && !tickets.userTickets.length && !tickets.importedTickets.length && !tickets.guestTickets.length) ? (
        <RequestAccess setIsEmailModalOpen={setIsEmailModalOpen} />
      ) : ''}
      {(!isLoading && tickets && (tickets.userTickets.length || tickets.importedTickets.length || tickets.guestTickets.length)) ? (
        <TicketsDisplay
          tickets={tickets}
          setIsEmailModalOpen={setIsEmailModalOpen}
        />
      ) : ''}
    </div>
  )
}

export default Tickets