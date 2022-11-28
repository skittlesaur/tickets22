import Link from 'next/link'
import Logo from '@images/logo.svg'
import { useScroll } from 'framer-motion'
import { useState } from 'react'

const pages = [
  { name: 'Tickets', href: '/tickets' },
  { name: 'Teams', href: '/teams' },
  { name: 'Help', href: '/help' },
]

interface NavProps {
  activePage: 'Home' | 'Tickets' | 'Teams' | 'Help'
  forceLightText?: boolean
}

const Nav = ({ activePage, forceLightText = false }: NavProps) => {
  const { scrollY } = useScroll()
  const [prevScroll, setPrevScroll] = useState<number>(scrollY.get())
  const [maxSize, setMaxSize] = useState(true)

  scrollY.onChange((currentScroll) => {
    const isScrollingUp = currentScroll < prevScroll
    setMaxSize(isScrollingUp)
    setPrevScroll(currentScroll)
  })

  const transition = 'transition-all duration-200 ease-in-out'

  return (
    <header className={`z-50 ${activePage === 'Home' ? 'fixed' : 'sticky mb-14'} top-0 w-full backdrop-blur ${forceLightText ? 'bg-gray-900/10 border-gray-400' : 'bg-gray-50/10 border-gray-200'} border-b`}>
      <div className={`flex items-center justify-between ${maxSize ? 'py-4' : 'py-3'} ${transition} max-w-screen-xl mx-auto`}>
        <div className="flex items-center gap-20">
          <Link
            href="/"
            className={`flex items-center gap-3 ${forceLightText ? 'text-secondary' : 'text-primary'} ${transition} hover:text-primary/70`}
          >
            <div className={`${maxSize ? 'w-5' : 'w-3'} ${transition}`}>
              <Logo className="[&>*]:fill-current" />
            </div>
            <h1 className={`italic ${maxSize ? 'text-lg font-bold' : 'text-base font-semibold'} ${transition}`}>
              Tickets22
            </h1>
          </Link>
          <nav>
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
        <div className="flex items-center gap-4">
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
      </div>
    </header>
  )
}

export default Nav