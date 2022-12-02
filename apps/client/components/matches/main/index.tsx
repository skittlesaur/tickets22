import Upcoming from '@components/matches/main/upcoming'
import AllMatches from '@components/matches/main/all-matches'

const Tickets = () => {
  return (
    <div className="flex flex-col gap-16">
      <Upcoming />
      <AllMatches />
    </div>
  )
}

export default Tickets