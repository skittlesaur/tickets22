import { motion } from 'framer-motion'
import { useMutation } from 'react-query'
import SECURITY_SERVICE from '@services/security'
import { useState } from 'react'
import toast from 'react-hot-toast'

const EmailModal = ({ onClose }: any) => {
  const requestAccessMutation = useMutation({
    mutationKey: 'requestAccess',
    mutationFn: () => SECURITY_SERVICE.post('/verify/request-access', {
      email,
    }),
  })

  const [email, setEmail] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (!email) return toast.error('Please enter an email address')

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!emailRegex.test(email)) return toast.error('Please enter a valid email address')

    requestAccessMutation.mutate()
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3, delay: .1 }}
        className="relative flex flex-col gap-4 items-start z-[1] bg-white dark:bg-gray-900 dark:border dark:border-gray-700 shadow-lg rounded-lg p-8 max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h1 className="font-black text-2xl">
            Request Access
          </h1>
          <p className="text-gray-500">
            Enter your email address to request access to your tickets.
          </p>
        </div>
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg px-4 py-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="bg-primary dark:bg-secondary dark:text-primary dark:hover:border-secondary-700 dark:hover:bg-transparent dark:hover:text-secondary px-4 py-2 rounded-lg text-secondary font-medium border border-transparent text-sm hover:text-primary hover:bg-transparent hover:border-primary transition-all duration-200 ease-in-out"
        >
          Request Access
        </button>
      </motion.div>
    </motion.div>
  )
}

export default EmailModal