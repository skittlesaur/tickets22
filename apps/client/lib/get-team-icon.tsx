import Argentina from '@images/teams/argentina.svg'
import Australia from '@images/teams/australia.svg'

const getTeamIcon = (team: string) => {
  switch (team) {
    case 'argentina':
      return <Argentina />
    case 'australia':
      return <Australia />
  }
}

export default getTeamIcon