import TeamCard from '@components/teams/main/team-card'

const Teams = () => {
  const data = [
    {
      id: 1,
      name: 'Qatar',
      group: 'A'
    },
    {
      id: 2,
      name: 'Argentina',
      group: 'A'
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-black text-4xl">
        World Cup 2022 Teams
      </h1>
      <div className="grid grid-cols-4 gap-4">
        {data.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  )
}

export default Teams