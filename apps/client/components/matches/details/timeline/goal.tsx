import getTeamIcon from '@lib/get-team-icon'

const Goal = ({ match, event }: any) => {
  return (
    <div
      className="relative overflow-hidden px-10 py-6 rounded-lg flex flex-col gap-4 shadow-md border"
      style={{
        backgroundColor: event.team.primaryColor,
        color: event.team.secondaryColor,
        borderColor: event.team.secondaryColor,
      }}
    >
      <div className="flex items-center gap-10">
        <h1 className="text-3xl font-semibold">
          GOAL!
        </h1>
        <p className="font-semibold text-lg">
          {event.minute}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p>
            {event.description}
          </p>
          <p className="uppercase font-semibold">
            {match.homeTeam.name} {event.homeScore} - {event.awayScore} {match.awayTeam.name}
          </p>
        </div>
        <div className="absolute -right-10 w-64 aspect-square">
          {getTeamIcon(event.team.name)}
        </div>
      </div>
    </div>
  )
}

export default Goal