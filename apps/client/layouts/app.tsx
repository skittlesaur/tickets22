import { ReactNode } from 'react'
import Nav from '@components/nav'

interface AppProps {
  activePage: 'Home' | 'Tickets' | 'Teams' | 'Help'
  forceLightText?: boolean
  children: ReactNode
}

const AppLayout = ({ activePage, children, forceLightText = false }: AppProps) => {
  return (
    <div className="min-h-[300vh]">
      <Nav activePage={activePage} forceLightText={forceLightText} />
      <div className="max-w-screen-xl mx-auto w-full">
        {children}
      </div>
    </div>
  )
}

export default AppLayout