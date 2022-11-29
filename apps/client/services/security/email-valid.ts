import { useMutation } from 'react-query'
import SECURITY_SERVICE from '@services/security/index'
import { AxiosError } from 'axios'
import { DefaultMutationProps } from '@services/constants'

const emailValid = ({ onSuccess, onError }: DefaultMutationProps) => {
  const mutation = useMutation({
    mutationKey: 'emailValid',
    mutationFn: ({ email, type }: { email: string, type: 'login' | 'signup' }) => (
      SECURITY_SERVICE.post('/auth/email-valid', {
        email,
        type,
      })
    ),
    onSuccess,
    onError: (e: AxiosError) => onError?.(e.response?.data),
    retry: 0,
  })

  return mutation
}

export default emailValid