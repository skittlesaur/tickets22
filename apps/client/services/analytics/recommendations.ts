import { useQuery } from 'react-query'
import ANALYTICS_SERVICE from '@services/analytics/index'

const useRecommendations = () => {
  const query = useQuery({
    queryKey: 'recommendations',
    queryFn: () => ANALYTICS_SERVICE.get('/analytics/recommendations').then((res) => res.data),
  })

  return {
    ...query,
    matches: query.data,
  }
}

export default useRecommendations