import Link from 'next/link'
import { useEffect } from 'react'
import SunIcon from '@images/sun.svg'
import MoonIcon from '@images/moon.svg'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from 'next-themes'

const Footer = () => {
  const { systemTheme, theme, setTheme } = useTheme()

  const themeChanger = () => {
    const currentTheme = theme === 'system' ? systemTheme : theme
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
  }

  useEffect(() => {
    themeChanger()
  }, [])

  return (
    <div className="border-t border-gray-200 px-4 lg:px-0 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto py-4 flex flex-col">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="italic font-medium hover:text-primary transition-all duration-200 ease-in-out"
          >
            Tickets22
          </Link>
          <div className="flex items-center gap-1 justify-end">
            <button
              onClick={themeChanger}
              className="w-9 aspect-square overflow-hidden text-gray-600 rounded-md p-1.5 border border-gray-200 hover:border-gray-400 hover:bg-white transition-all duration-200 ease-in-out dark:text-gray-200 dark:border-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-900"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.div
                    initial={{ opacity: 0, y: '100%' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: '-100%' }}
                    transition={{ duration: 0.2 }}
                    key="dark"
                  >
                    <MoonIcon className="fill-current" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: '100%' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: '-100%' }}
                    transition={{ duration: 0.2 }}
                    key="light"
                  >
                    <SunIcon className="fill-current" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default Footer
