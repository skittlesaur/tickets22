import Hero from '@components/home/hero'
import FanFavorites from '@components/home/fan-favorites'
import Stadiums from '@components/home/stadiums'

const Home = ({ setForceLightText }: any) => {
  return (
    <div className="flex flex-col gap-32">
      <Hero setForceLightText={setForceLightText} />
      <FanFavorites />
      <Stadiums />
    </div>
  )
}

export default Home