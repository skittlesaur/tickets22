import AppLayout from '@layouts/app'
import Seo from '@components/seo'
import Home from '@components/home'

const HomePage = () => {
  return (
    <AppLayout
      activePage="Home"
      isFullWidth={true}
      forceLightText={true}
    >
      <Seo
        title="Tickets22"
        description="Tickets22 is a FIFA World Cup 2022 ticketing platform"
      />
      <Home />
    </AppLayout>
  )
}

export default HomePage