import TeamCard from '@components/teams/main/team-card'

const Teams = ({ teams }: any) => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-black text-4xl">
        World Cup 2022 Teams
      </h1>
      <div className="grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-3 lg:grid-cols-5 lg:gap-6 items-stretch">
        {teams.map((team: any) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  )
}

export default Teams