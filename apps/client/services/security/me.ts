import { useQuery } from 'react-query'
import SECURITY_SERVICE from '@services/security/index'

const Me = () => {
  const query = useQuery({
    queryKey: 'me',
    queryFn: () => SECURITY_SERVICE.get('/me'),
    staleTime: 1000 * 60 * 10, // 10 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  })

  return query
}

export default Me