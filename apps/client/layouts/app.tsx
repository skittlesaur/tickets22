import { ReactNode } from 'react'
import Nav from '@components/nav'
import Footer from '@components/footer'

interface AppProps {
  activePage?: 'Home' | 'Matches' | 'Teams' | 'Help';
  forceLightText?: boolean;
  children: ReactNode;
  isFullWidth?: boolean;
  noPaddingY?: boolean;
}

const AppLayout = (
  {
    activePage,
    children,
    forceLightText = false,
    isFullWidth = false,
    noPaddingY = false,
  }: AppProps) => {
  return (
    <div className={`bg-gray-50 relative flex flex-col min-h-screen ${noPaddingY ? '' : 'gap-16'} max-w-full overflow-clip dark:bg-gray-980 transition-all duration-200 ease-in-out`}>
      <Nav activePage={activePage} forceLightText={forceLightText} />
      <div className={`${isFullWidth ? '' : 'max-w-screen-xl mx-auto px-4 lg:px-0'} w-full grow`}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default AppLayout
