import FullscreenLoader from '@components/fullscreen-loader'
import getDynamicQuery from '@lib/get-dynamic-query'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import RESERVATIONS_SERVICE from '@services/reservations'

const CancelPage = () => {
  const router = useRouter()
  const ticketIds = getDynamicQuery('ticketIds')
  const data = getDynamicQuery('data')

  const mutation = useMutation({
    mutationFn: () => RESERVATIONS_SERVICE.post('/tickets/cancel', {
      ticketIds: JSON.parse(ticketIds),
      data: JSON.parse(data),
    }),
    onSuccess: () => {
      router.push('/tickets')
    },
    onError: () => {
      router.push('/tickets?error=Failed to cancel tickets')
    },
  })

  const [text, setText] = useState('Getting Data')

  useEffect(() => {
    if (ticketIds && data) {
      mutation.mutate()
      setText('Cancelling Tickets')
    }
  }, [ticketIds, data])

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/tickets?error=Timeout while cancelling tickets')
    }, 10000)

    return () => clearTimeout(timeout)
  }, [])
  return (
    <FullscreenLoader text={text} />
  )
}

export default CancelPage