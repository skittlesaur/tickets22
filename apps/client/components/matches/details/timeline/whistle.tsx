import DefaultStyle from '@components/matches/details/timeline/default-style'
import WhistleIcon from '@images/whistle.svg'

const Whistle = ({ match, event }: any) => {
  return (
    <DefaultStyle
      event={event}
      match={match}
      Icon={WhistleIcon}
    />
  )
}

export default Whistle