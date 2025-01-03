import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'

import apiClient from '@/lib/axios'
import { createSession } from '@/lib/session';
import { type AxiosCommonError, type AxiosCommonResponse } from '@/types';

export type ResponseType = AxiosCommonResponse<{
  user: {
    email: string;
    name: string;
    id: string;
  }
  accessToken: string;
  refreshToken: string;
}>
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
    onSuccess: async ({ data }) => {
      const { user, accessToken, refreshToken } = data
      await createSession({
        user,
        accessToken,
        refreshToken,
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
