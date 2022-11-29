import { ReactNode } from 'react'
import Nav from '@components/nav'
import Footer from '@components/footer'

interface AppProps {
  activePage: 'Home' | 'Tickets' | 'Teams' | 'Help'
  forceLightText?: boolean
  children: ReactNode
}

const AppLayout = ({ activePage, children, forceLightText = false }: AppProps) => {
  return (
    <div className="flex flex-col min-h-screen gap-16">
      <Nav activePage={activePage} forceLightText={forceLightText} />
      <div className="max-w-screen-xl mx-auto w-full grow">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default AppLayout