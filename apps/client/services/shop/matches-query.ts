import { useQuery } from 'react-query'
import SHOP_SERVICE from '@services/shop'

const MatchesQuery = () => {
  const query = useQuery<any[]>({
    queryKey: 'matches',
    queryFn: () => SHOP_SERVICE.get('/matches').then((res) => res.data),
    staleTime: 1000 * 60 * 10, // 10 minutes
  })

  return query
}

export default MatchesQuery