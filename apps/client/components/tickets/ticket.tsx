import Link from 'next/link'
import getTeamIcon from '@lib/get-team-icon'
import ChevronForwardIcon from '@images/chevron-forward.svg'

const Ticket = ({ ticket }: any) => {
  const formattedDate = new Date(ticket.match.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const formattedTime = new Date(ticket.match.date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  })

  return (
    <Link
      href={`/tickets/${ticket.id}`}
      className="group flex flex-col gap-4 md:flex-row items-center justify-between bg-gray-100 dark:bg-gray-900 w-full px-8 py-4 rounded-lg border border-gray-200 dark:border-gray-800 dark:hover:border-gray-600 hover:shadow-md hover:border-gray-300 transition-all duration-300 ease-in-out"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-gray-200 dark:bg-gray-800 aspect-square p-2 rounded-xl">
          <div className="z-[1] w-10 aspect-square">
            {getTeamIcon(ticket.match.homeTeam.name)}
          </div>
          <div className="-ml-6 w-10 aspect-square">
            {getTeamIcon(ticket.match.awayTeam.name)}
          </div>
        </div>
        <div>
          <h1 className="font-bold text-xl">
            {ticket.match.homeTeam.name} - {ticket.match.awayTeam.name}
          </h1>
          <p className="text-gray-500 text-sm">
            {formattedDate} at {formattedTime}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 self-end md:self-center">
        <div
          className="border px-3 py-1.5 rounded-lg group-hover:bg-white dark:group-hover:bg-gray-800 transition-all duration-300 ease-in-out"
          style={{
            borderColor: ticket.status === 'PURCHASED' ? '#00B87C' : ticket.status === 'PENDING' ? '#FFC107' : '#FF0000',
            color: ticket.status === 'PURCHASED' ? '#00B87C' : ticket.status === 'PENDING' ? '#FFC107' : '#FF0000',
          }}
        >
          <p className="text-xs">{ticket.status}</p>
        </div>
        <ChevronForwardIcon className="w-6 h-6 text-gray-500 group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-all duration-300 ease-in-out" />
      </div>
    </Link>
  )
}

export default Ticket