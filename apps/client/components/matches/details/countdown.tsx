import { useEffect, useState } from 'react'

interface CountdownProps {
  date: string | Date
}

const Countdown = ({ date }: CountdownProps) => {
  const dateToCountdown = new Date(date)

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const distance = dateToCountdown.getTime() - now.getTime()

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [date])

  return (
    <div className="bg-gray-200 dark:bg-gray-800 dark:text-gray-400 grid grid-cols-7 items-center rounded px-3 py-1 [&>*]:justify-self-center">
      <p className="w-[5ch]">{timeLeft.days} days</p>
      <div className="w-1.5 aspect-square bg-gray-400 rounded-full" />
      <p className="w-[5ch]">{timeLeft.hours} hrs</p>
      <div className="w-1.5 aspect-square bg-gray-400 rounded-full" />
      <p className="w-[5ch]">{timeLeft.minutes} min</p>
      <div className="w-1.5 aspect-square bg-gray-400 rounded-full" />
      <p className="w-[5ch]">{timeLeft.seconds} sec</p>
    </div>
  )
}

export default Countdown