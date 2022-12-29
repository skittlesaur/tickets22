import TeamCard from '@components/teams/main/team-card'

const Teams = ({ teams }: any) => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-black text-4xl">
        World Cup 2022 Teams
      </h1>
      <div className="grid grid-cols-5 gap-6 items-stretch">
        {teams.map((team: any) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  )
}

export default Teams