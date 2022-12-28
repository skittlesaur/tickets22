import { useQuery } from 'react-query'
import SHOP_SERVICE from '@services/shop'

const useMatchSummaryQuery = (id: string) => {
  const query = useQuery<any[]>({
    queryKey: ['match.summary', id],
    queryFn: () => SHOP_SERVICE.get(`/matches/${id}/summary`).then((res) => res.data),
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  })

  return query
}

export default useMatchSummaryQuery