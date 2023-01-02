import { useMemo, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const Stadium = ({ stadium }: any) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {
    amount: .8,
  })
  const { scrollYProgress } = useScroll({ target: ref })
  const containerHeight = useMemo(() => {
    if (ref.current) return ref.current.clientHeight
    return 200
  }, [ref])
  const yText = useTransform(scrollYProgress, [0, 1], [-containerHeight / 2, containerHeight / 2])
  const yImage = useTransform(scrollYProgress, [0, 1], [-containerHeight / 4, containerHeight / 2])

  return (
    <div
      ref={ref}
      className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden"
    >
      <motion.img
        animate={{
          opacity: inView ? .2 : 0,
          scale: inView ? 1 : 1.1,
        }}
        transition={{ duration: .6 }}
        src={stadium.img}
        alt={stadium.name}
        className="absolute inset-0 object-cover w-full h-full saturate-0 brightness-110"
      />
      <div className="relative z-[1] flex flex-col items-center gap-4">
        <div className="w-64 md:w-[23em]">
          <motion.img
            style={{ y: yImage }}
            animate={{ opacity: inView ? 1 : 0, transition: { duration: .8 } }}
            alt={stadium.name}
            src={`/images/stadiums/${stadium.name.replace(/ /g, '-').toLowerCase()}.webp`}
          />
        </div>
        <motion.div
          style={{ y: yText }}
          animate={{ opacity: inView ? 1 : 0, transition: { duration: .8 } }}
          transition={{ duration: .8 }}
          className="flex flex-col items-center gap-2 text-primary dark:text-secondary drop-shadow-lg"
        >
          <h1 className="text-3xl md:text-5xl font-qatar">
            {stadium.name}
          </h1>
          <p className="text:sm md:text-base">
            {stadium.description}
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Stadium