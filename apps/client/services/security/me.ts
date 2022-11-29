import { useQuery } from 'react-query'
import SECURITY_SERVICE from '@services/security/index'

const Me = () => {
  const query = useQuery({
    queryKey: 'me',
    queryFn: () => SECURITY_SERVICE.get('/auth/me'),
  })

  return query
}

export default Me