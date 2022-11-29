import { motion } from 'framer-motion'

interface LoaderProps {
  color?: string
}

const Loader = ({ color = 'bg-gray-50' }: LoaderProps) => {
  return (
    <motion.div
      className="m-auto inline-flex gap-1"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 0.7,
            delay: i * 0.1,
            repeatDelay: 0.2,
          }}
          className={`w-3 aspect-square inline-block rounded-full ${color}`}
        />
      ))}
    </motion.div>
  )
}

export default Loader