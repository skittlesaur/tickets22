import Hero from '@components/home/hero'
import FanFavorites from '@components/home/fan-favorites'

const Home = ({ setForceLightText }: any) => {
  return (
    <div className="flex flex-col gap-32">
      <Hero setForceLightText={setForceLightText} />
      <FanFavorites />
    </div>
  )
}

export default Home