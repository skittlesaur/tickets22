import { ReactNode } from 'react'
import Nav from '@components/nav'
import Footer from '@components/footer'

interface AppProps {
  activePage?: 'Home' | 'Matches' | 'Teams' | 'Help';
  forceLightText?: boolean;
  children: ReactNode;
  isFullWidth?: boolean;
}

const AppLayout = (
  {
    activePage,
    children,
    forceLightText = false,
    isFullWidth = false,
  }: AppProps) => {
  return (
    <div className="bg-gray-50 relative flex flex-col min-h-screen gap-16 max-w-full overflow-clip dark:bg-gray-980 transition-all duration-200 ease-in-out">
      <Nav activePage={activePage} forceLightText={forceLightText} />
      <div className={`${isFullWidth ? '' : 'max-w-screen-xl mx-auto'} w-full grow px-4 md:px-0`}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default AppLayout
