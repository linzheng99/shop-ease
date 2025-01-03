import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'

import apiClient from '@/lib/axios'
import { createSession } from '@/lib/session';
import { type AxiosCommonError } from '@/types';

interface ResponseType {
  email: string;
  name: string;
  id: string;
}
interface RequestType {
  email: string
  password: string
}

export const useSignin = () => {
  const router = useRouter()
  const mutation = useMutation<ResponseType, AxiosCommonError, RequestType>({
    mutationFn: async (data) => {
      const response = await apiClient.post<ResponseType, RequestType>('/auth/signin', data)
      return response.data
    },
    onSuccess: async (data) => {
      console.log('data', data)
      await createSession({
        user: {
          id: data.id,
          name: data.name,
          email: data.email
        },
        accessToken: '',
        refreshToken: '',
      })
      router.push('/')
      toast.success('Sign in success!')
    },
    onError: (error) => {
      const message = error.response?.data?.message || error.message
      toast.error(`Sign in failed: ${message}`)
    }
  })

  return mutation
}
