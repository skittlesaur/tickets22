import Ticket from '@components/tickets/ticket'

const TicketsDisplay = ({ tickets, setIsEmailModalOpen }: any) => {
  return (
    <div className="flex flex-col gap-10">
      {tickets.userTickets.length > 0 && (
        <div className="flex flex-col gap-2">
          {tickets.userTickets.map((ticket: any) => (
            <Ticket ticket={ticket} key={ticket.id} />
          ))}
        </div>
      )}
      {tickets.guestTickets.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-medium">
            Tickets from this device
          </h2>
          {tickets.guestTickets.map((ticket: any) => (
            <Ticket ticket={ticket} key={ticket.id} />
          ))}
        </div>
      )}
      {tickets.importedTickets.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-medium">
            Imported Tickets
          </h2>
          {tickets.importedTickets.map((ticket: any) => (
            <Ticket ticket={ticket} key={ticket.id} />
          ))}
        </div>
      )}
      <div className="flex flex-col items-end mt-10">
        <p className="text-sm text-gray-500">
          <span className="font-medium">Note:</span> If you have purchased tickets as a guest from a different device,
          you can request access
          to them by clicking the button below.
        </p>
        <button
          className="text-sm text-primary dark:text-secondary font-medium"
          onClick={() => setIsEmailModalOpen(true)}
        >
          Request access
        </button>
      </div>
    </div>
  )
}

export default TicketsDisplay