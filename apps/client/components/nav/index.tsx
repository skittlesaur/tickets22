import Link from 'next/link'
import Logo from '@images/logo.svg'
import MenuIcon from '@images/menu.svg'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useUser from '@hooks/use-user'
import User from '@components/nav/user'

const pages = [
  { name: 'Tickets', href: '/tickets' },
  { name: 'Teams', href: '/teams' },
  { name: 'Help', href: '/help' },
]

interface NavProps {
  activePage?: 'Home' | 'Tickets' | 'Teams' | 'Help'
  forceLightText?: boolean
}

const Nav = ({ activePage, forceLightText = false }: NavProps) => {
  const transition = 'transition-all duration-200 ease-in-out'
  const [isOpen, setIsOpen] = useState(false)

  const { data: user, isLoading: userLoading } = useUser()

  return (
    <header className={`z-50 ${activePage === 'Home' ? 'fixed' : 'sticky'} top-0 w-full backdrop-blur ${forceLightText ? 'bg-gray-900/10 border-gray-400' : 'bg-gray-50/10 border-gray-200'} border-b`}>
      <div className={`flex items-center justify-between px-4 md:px-0 py-4 max-w-screen-xl mx-auto`}>
        <div className="flex items-center gap-20">
          <Link
            href="/"
            className={`flex items-center gap-3 ${forceLightText ? 'text-secondary' : 'text-primary'} ${transition} hover:text-primary/70`}
          >
            <div className="w-4">
              <Logo className="[&>*]:fill-current" />
            </div>
            <h1 className="italic text-lg font-bold">
              Tickets22
            </h1>
            {activePage === 'Help' && (
              <p className="font-mono italic font-medium text-gray-500">
                /help
              </p>
            )}
          </Link>
          <nav className="md:block hidden">
            <ul className="flex items-center gap-4">
              {pages.map((page) => (
                <li
                  key={page.name}
                  className={`text-sm ${activePage === page.name ? `${forceLightText ? 'text-secondary' : 'text-primary'} font-medium` : `${forceLightText ? 'text-gray-100/60 hover:text-white' : 'text-gray-600 hover:text-black'}`} ${transition}`}
                >
                  <Link href={page.href}>
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {user ? (
          <User user={user} />
        ) : (
          <div className="items-center gap-4 md:flex hidden">
            <Link
              href="/login"
              className={`text-sm font-medium ${forceLightText ? 'text-secondary' : 'text-primary'} ${transition} hover:text-primary/70`}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className={`px-4 py-2 rounded-md bg-primary text-secondary text-sm font-medium ${transition} border border-transparent hover:bg-opacity-0 ${forceLightText ? 'hover:text-secondary hover:border-secondary' : 'hover:text-primary hover:border-primary'}`}
            >
              Sign Up
            </Link>
          </div>
        )}
        <div className="block md:hidden">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="w-6 aspect-square text-primary"
          >
            <MenuIcon />
          </div>
        </div>
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.2 }}
              className="border-l-4 border-primary fixed inset-0 px-4 min-h-screen max-h-screen bg-white flex flex-col items-start justify-center pb-40 font-medium text-2xl gap-2"
            >
              <button className="text-base mb-8 inline-block" onClick={() => setIsOpen(false)}>
                Close
              </button>
              {pages.map((page) => (
                <Link
                  href={page.href}
                  key={page.name}
                  onClick={() => setIsOpen(false)}
                >
                  {page.name}
                </Link>
              ))}
              <Link href="/login" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link href="/signup" onClick={() => setIsOpen(false)}>
                Sign Up
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Nav