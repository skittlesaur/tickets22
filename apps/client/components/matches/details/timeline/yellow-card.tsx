import DefaultStyle from '@components/matches/details/timeline/default-style'
import YellowCardIcon from '@images/yellow-card.svg'

const YellowCard = ({ event, match }: any) => {
  return (
    <DefaultStyle
      event={event}
      match={match}
      Icon={YellowCardIcon}
      style={{
        borderColor: '#FED130',
      }}
    />
  )
}

export default YellowCard