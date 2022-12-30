import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

const pages = [
  { name: 'My Tickets', href: '/tickets' },
  { name: 'Logout', href: '/logout' },
]
const User = ({ user }: any) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
      className="relative w-8 aspect-square rounded-full bg-gradient-to-tl from-primary-800 via-primary to-primary-300 flex items-center justify-center"
    >
      <span className="text-white font-medium select-none">
        {(user.name ?? user.email).charAt(0).toUpperCase()}
      </span>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'tween', duration: 0.2 }}
            className="absolute top-full right-0 pt-4"
          >
            <div className="bg-white rounded-md shadow-md border border-gray-200 w-40 py-3">
              <ul className="flex flex-col gap-2">
                {pages.map((page) => (
                  <li
                    key={page.name}
                    className="text-sm font-medium text-gray-600 hover:bg-gray-100"
                  >
                    <Link
                      className="px-4 py-2 block"
                      href={page.href}
                    >
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default User