import { useQuery } from 'react-query'
import SHOP_SERVICE from '@services/shop'

const useMatchSummaryQuery = (id: string, ended: boolean = false) => {
  const query = useQuery<any[]>({
    queryKey: ['match.summary', id],
    queryFn: () => SHOP_SERVICE.get(`/matches/${id}/summary`).then((res) => res.data),
    staleTime: ended ? 1000 * 60 * 60 : 0,
    cacheTime: ended ? 1000 * 60 * 60 : 0,
  })

  return query
}

export default useMatchSummaryQuery