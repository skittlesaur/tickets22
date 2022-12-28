import getTeamIcon from '@lib/get-team-icon'
import Link from 'next/link'

const PenaltyAwarded = ({ event, match }: any) => {
  return (
    <div
      className="overflow-hidden px-10 py-6 rounded-lg flex flex-col gap-1 items-center justify-center shadow-md border bg-white text-gray-600"
    >
      <h1 className="text-xl font-semibold">
        {event.minute} Penalty Awarded
      </h1>
      <div className="w-16 aspect-square">
        {getTeamIcon(event.team.name)}
      </div>
    </div>
  )
}

export default PenaltyAwarded