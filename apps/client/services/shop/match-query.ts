import { useQuery } from 'react-query'
import SHOP_SERVICE from '@services/shop'

const useMatchQuery = (id: string) => {
  const query = useQuery<any[]>({
    queryKey: ['match', id],
    queryFn: () => SHOP_SERVICE.get(`/matches/${id}`).then((res) => res.data),
    staleTime: 1000 * 60 * 10, // 10 minutes
  })

  return query
}

export default useMatchQuery