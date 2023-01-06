import Hero from '@components/home/hero'
import Recommended from '@components/home/recommended'
import Stadiums from '@components/home/stadiums'

const Home = ({ setForceLightText }: any) => {
  return (
    <div className="flex flex-col gap-32">
      <Hero setForceLightText={setForceLightText} />
      <Recommended />
      <Stadiums />
    </div>
  )
}

export default Home