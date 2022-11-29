import SECURITY_SERVICE from '@services/security/index'
import { useMutation } from 'react-query'
import { DefaultMutationProps } from '@services/constants'
import { AxiosError } from 'axios'

const signup = ({ onSuccess, onError, onSettled }: DefaultMutationProps) => {
  const mutation = useMutation({
    mutationKey: 'signup',
    mutationFn: ({ email, password }: { email: string, password: string }) => (
      SECURITY_SERVICE.post('/auth/signup', {
        email,
        password,
      })
    ),
    onSuccess,
    onError: (e: AxiosError) => onError?.(e.response?.data),
    onSettled,
    retry: 0,
  })

  return mutation
}

export default signup