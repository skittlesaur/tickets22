import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const Stadium = ({ stadium }: any) => {
  const ref = useRef(null)
  const inView = useInView(ref, {
    amount: .8,
  })
  const { scrollYProgress } = useScroll({ target: ref })
  const yText = useTransform(scrollYProgress, [0, 1], [-500, 400])
  const yImage = useTransform(scrollYProgress, [0, 1], [-350, 300])

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
        <div className="w-[23em]">
          <motion.img
            style={{ y: yImage }}
            alt={stadium.name}
            src={`/images/stadiums/${stadium.name.replace(/ /g, '-').toLowerCase()}.webp`}
          />
        </div>
        <motion.div
          style={{ y: yText }}
          className="flex flex-col items-center gap-2 text-primary"
        >
          <h1 className="text-5xl font-qatar">
            {stadium.name}
          </h1>
          <p className="">
            {stadium.description}
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Stadium