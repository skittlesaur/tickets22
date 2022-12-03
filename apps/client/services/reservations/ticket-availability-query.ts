import { useQuery } from 'react-query'
import RESERVATIONS_SERVICE from '@services/reservations/index'

const useTicketAvailabilityQuery = (id: string) => {
  const query = useQuery({
    queryKey: ['ticket.availability', id],
    queryFn: () => RESERVATIONS_SERVICE.get(`/tickets/match/${id}/available`).then((res) => res.data),
  })

  return query
}

export default useTicketAvailabilityQuery