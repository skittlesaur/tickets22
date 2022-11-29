import Qatar from '@images/teams/qatar.svg'
import Ecuador from '@images/teams/ecuador.svg'
import Senegal from '@images/teams/senegal.svg'
import Netherlands from '@images/teams/netherlands.svg'
import England from '@images/teams/england.svg'
import Iran from '@images/teams/iran.svg'
import USA from '@images/teams/usa.svg'
import Wales from '@images/teams/wales.svg'
import Argentina from '@images/teams/argentina.svg'
import SaudiArabia from '@images/teams/saudi-arabia.svg'
import Mexico from '@images/teams/mexico.svg'
import Poland from '@images/teams/poland.svg'
import France from '@images/teams/france.svg'
import Australia from '@images/teams/australia.svg'
import Denmark from '@images/teams/denmark.svg'
import Tunisia from '@images/teams/tunisia.svg'
import Spain from '@images/teams/spain.svg'
import CostaRica from '@images/teams/costa-rica.svg'
import Germany from '@images/teams/germany.svg'
import Japan from '@images/teams/japan.svg'
import Belgium from '@images/teams/belgium.svg'
import Canada from '@images/teams/canada.svg'
import Morocco from '@images/teams/morocco.svg'
import Croatia from '@images/teams/croatia.svg'
import Brazil from '@images/teams/brazil.svg'
import Serbia from '@images/teams/serbia.svg'
import Switzerland from '@images/teams/switzerland.svg'
import Cameroon from '@images/teams/cameroon.svg'
import Portugal from '@images/teams/portugal.svg'
import Ghana from '@images/teams/ghana.svg'
import Uruguay from '@images/teams/uruguay.svg'
import KoreaRepublic from '@images/teams/south-korea.svg'

const getTeamIcon = (team: string) => {
  switch (team.toLowerCase()) {
    case 'qatar':
      return <Qatar />
    case 'ecuador':
      return <Ecuador />
    case 'senegal':
      return <Senegal />
    case 'netherlands':
      return <Netherlands />
    case 'england':
      return <England />
    case 'iran':
      return <Iran />
    case 'usa':
      return <USA />
    case 'wales':
      return <Wales />
    case 'argentina':
      return <Argentina />
    case 'saudi arabia':
      return <SaudiArabia />
    case 'mexico':
      return <Mexico />
    case 'poland':
      return <Poland />
    case 'france':
      return <France />
    case 'australia':
      return <Australia />
    case 'denmark':
      return <Denmark />
    case 'tunisia':
      return <Tunisia />
    case 'spain':
      return <Spain />
    case 'costa rica':
      return <CostaRica />
    case 'germany':
      return <Germany />
    case 'japan':
      return <Japan />
    case 'belgium':
      return <Belgium />
    case 'canada':
      return <Canada />
    case 'morocco':
      return <Morocco />
    case 'croatia':
      return <Croatia />
    case 'brazil':
      return <Brazil />
    case 'serbia':
      return <Serbia />
    case 'switzerland':
      return <Switzerland />
    case 'cameroon':
      return <Cameroon />
    case 'portugal':
      return <Portugal />
    case 'ghana':
      return <Ghana />
    case 'uruguay':
      return <Uruguay />
    case 'korea republic':
      return <KoreaRepublic />
    default:
      return null
  }
}

export default getTeamIcon