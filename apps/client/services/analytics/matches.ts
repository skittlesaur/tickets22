import { useQuery } from 'react-query'
import ANALYTICS_SERVICE from '@services/analytics/index'

const useMatches = () => {
  const query = useQuery({
    queryKey: 'analytics.matches',
    queryFn: () => ANALYTICS_SERVICE.get('/analytics/matches').then((res) => res.data),
  })

  return query
}

export default useMatches