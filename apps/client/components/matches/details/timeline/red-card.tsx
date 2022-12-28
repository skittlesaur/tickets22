import DefaultStyle from '@components/matches/details/timeline/default-style'
import RedCardIcon from '@images/red-card.svg'

const RedCard = ({ event, match }: any) => {
  return (
    <DefaultStyle
      event={event}
      match={match}
      Icon={RedCardIcon}
      style={{
        borderColor: '#FED130',
      }}
    />
  )
}

export default RedCard