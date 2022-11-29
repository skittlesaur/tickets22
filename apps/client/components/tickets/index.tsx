import Upcoming from '@components/tickets/upcoming'
import AllMatches from '@components/tickets/all-matches'

const Tickets = () => {
  return (
    <div className="flex flex-col gap-16">
      <Upcoming />
      <AllMatches />
    </div>
  )
}

export default Tickets