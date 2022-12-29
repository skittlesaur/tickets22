import AppLayout from '@layouts/app'
import Seo from '@components/seo'
import Home from '@components/home'
import { useState } from 'react'

const HomePage = () => {
  const [forceLightText, setForceLightText] = useState(true)

  return (
    <AppLayout
      activePage="Home"
      isFullWidth={true}
      forceLightText={forceLightText}
    >
      <Seo
        title="Tickets22"
        description="Tickets22 is a FIFA World Cup 2022 ticketing platform"
      />
      <Home setForceLightText={setForceLightText}/>
    </AppLayout>
  )
}

export default HomePage