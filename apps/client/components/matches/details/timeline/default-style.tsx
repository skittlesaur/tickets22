import getTeamIcon from '@lib/get-team-icon'

const DefaultStyle = ({ event, Icon, style }: any) => {
  if (!event.team) return null

  return (
    <div
      className="px-10 py-6 rounded-lg flex flex-col gap-4 shadow-md border bg-white text-gray-600"
      style={style}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Icon && (
            <div className="w-8 aspect-square">
              <Icon />
            </div>
          )}
          <h1 className="text-lg font-semibold">
            {event.eventType.replace(/_/g, ' ')}
          </h1>
        </div>
        <p>
          {event.minute}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p>
          {event.description}
        </p>
        <div className="w-10 aspect-square">
          {getTeamIcon(event.team.name)}
        </div>
      </div>
    </div>
  )
}

export default DefaultStyle