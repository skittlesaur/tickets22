import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const Stadium = ({ stadium }: any) => {
  const ref = useRef(null)
  const inView = useInView(ref, {
    amount: .9,
  })
  const { scrollYProgress } = useScroll({ target: ref })
  const yText = useTransform(scrollYProgress, [0, 1], [-800, 400])
  const yImage = useTransform(scrollYProgress, [0, 1], [-550, 350])

  return (
    <div
      ref={ref}
      className="relative w-full h-[80vh] flex items-center justify-center"
    >
      <motion.img
        animate={{ opacity: inView ? .2 : 0 }}
        transition={{ duration: .8 }}
        src={stadium.img}
        alt={stadium.name}
        className="absolute inset-0 object-cover w-full h-full saturate-0 brightness-110"
      />
      <div className="relative z-[1] flex flex-col items-center gap-4">
        <div className="w-64 md:w-[23em]">
          <motion.img
            style={{ y: yImage }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: .8 }}
            alt={stadium.name}
            src={`/images/stadiums/${stadium.name.replace(/ /g, '-').toLowerCase()}.webp`}
          />
        </div>
        <motion.div
          style={{ y: yText }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: .8 }}
          className="flex flex-col items-center gap-2 text-primary dark:text-secondary"
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