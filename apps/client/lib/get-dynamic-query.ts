import { useRouter } from 'next/router'

const getDynamicQuery = (route: string, firstItemOnly = false): string => {
  const router = useRouter()
  const query = router.query[route]

  if (Array.isArray(query))
    return firstItemOnly ? query[0] : query.join('/')

  return query ?? ''
}

export default getDynamicQuery