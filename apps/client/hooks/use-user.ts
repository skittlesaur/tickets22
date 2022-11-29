import Me from '@services/security/me'

const useUser = () => {
  const query = Me()
  return {
    ...query,
    data: query.data?.data
  }
}

export default useUser