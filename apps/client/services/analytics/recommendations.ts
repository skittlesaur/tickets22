import { useQuery } from 'react-query'
import ANALYTICS_SERVICE from '@services/analytics/index'

const useRecommendations = () => {
  const query = useQuery({
    queryKey: 'recommendations',
    queryFn: () => ANALYTICS_SERVICE.get('/analytics/recommendations').then((res) => res.data),
    staleTime: 1000 * 60 * 60,
  })

  return {
    ...query,
    matches: query.data,
  }
}

export default useRecommendations