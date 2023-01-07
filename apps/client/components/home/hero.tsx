import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

const parentVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: .5,
      duration: .5,
      staggerChildren: .5,
    },
  },
}

const childVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}

const Hero = ({ setForceLightText }: any) => {
  const ref = useRef(null)
  const isInView = useInView(ref)

  useEffect(() => {
    setForceLightText(isInView)
  }, [isInView])
  return (
    <div
      ref={ref}
      className="relative bg-gray-900 w-full lg:h-[96vh] overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: .7 }}
        transition={{ duration: 1 }}
        className="h-[70vh] -translate-x-1/2 md:translate-x-0 aspect-video md:w-full md:mt-[-24vw] md:h-[100vw] bg-red-400 bg-red-400 saturate-0 brightness-50"
      >
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/-F9WGMM8J48?autoplay=1&loop=1&controls=1&playlist=-F9WGMM8J48"
          title="YouTube video player"
        ></iframe>
      </motion.div>
      <motion.div
        variants={parentVariants}
        initial="hidden"
        animate="visible"
        className="absolute z-[2] inset-0 mx-4 md:mx-16 lg:mx-40 flex flex-col gap-4 justify-center items-start w-[60%] md:max-w-[50%] lg:w-[40%]"
      >
        <motion.h1
          variants={childVariants}
          className="text-4xl md:text-6xl lg:text-8xl font-qatar text-white drop-shadow-xl"
        >
          From Qatar To All.
        </motion.h1>
        <motion.p
          variants={childVariants}
          className="text-sm lg:text-base text-white/70"
        >
          Get your tickets now for FIFA World Cup Qatar 2022™ and enjoy worldwide soccer from Qatari stadiums.
        </motion.p>
        <motion.div
          variants={childVariants}
          className="w-full flex flex-col md:flex-row gap-2 md:gap-4 mt-4 md:mt-0"
        >
          <Link
            href="/matches"
            className="text-center bg-primary text-secondary md:w-1/2 hover:w-2/3 py-4 rounded-xl border border-transparent hover:bg-gray-900/40 hover:tracking-widest hover:backdrop-blur hover:border-secondary transition-all duration-300 ease-in-out"
          >
            Get Tickets
          </Link>
          <Link
            href="/login"
            className="text-center bg-gray-900/40 text-secondary md:w-1/2 hover:w-2/3 py-4 rounded-xl border border-primary hover:tracking-widest hover:backdrop-blur hover:border-secondary transition-all duration-300 ease-in-out"
          >
            Login
          </Link>
        </motion.div>
      </motion.div>
      <div className="absolute z-[1] w-96 aspect-square rounded-full -bottom-16 -right-16 bg-primary/50 blur-[200px] animate-pulse" />
    </div>
  )
}

export default Hero