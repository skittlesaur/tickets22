import { useQuery } from 'react-query'
import SHOP_SERVICE from '@services/shop'

const useRandomPlayerQuery = (id: string) => {
  const query = useQuery<any>({
    queryKey: ['player.team', id],
    queryFn: () => SHOP_SERVICE.get(`/players/team/${id}`).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
  })

  return query
}

export default useRandomPlayerQuery