import { useQuery } from 'react-query'
import RESERVATIONS_SERVICE from '@services/reservations/index'

const useUserTickets = () => {
  const query = useQuery({
    queryKey: ['ticket'],
    queryFn: () => RESERVATIONS_SERVICE.get('/tickets').then((res) => res.data),
  })

  return query
}

export default useUserTickets