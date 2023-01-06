import { useQuery } from 'react-query'
import ANALYTICS_SERVICE from '@services/analytics/index'

const useOverall = () => {
  const query = useQuery({
    queryKey: 'analytics.overall',
    queryFn: () => ANALYTICS_SERVICE.get('/analytics/').then((res) => res.data),
  })

  return query
}

export default useOverall