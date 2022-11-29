import { ReactNode } from 'react'
import Nav from '@components/nav'

interface AppProps {
  activePage: 'Home' | 'Tickets' | 'Teams' | 'Help'
  forceLightText?: boolean
  children: ReactNode
}

const AppLayout = ({ activePage, children, forceLightText = false }: AppProps) => {
  return (
    <div>
      <Nav activePage={activePage} forceLightText={forceLightText} />
      <div className="max-w-screen-xl mx-auto w-full py-14">
        {children}
      </div>
    </div>
  )
}

export default AppLayout