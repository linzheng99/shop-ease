import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'

import apiClient from '@/lib/apiClient'
import { createSession } from '@/lib/session';

import { type SignInResponseType } from '../types';

interface RequestType {
  json: {
    email: string
    password: string
  }
}

export const useSignin = () => {
  const router = useRouter()
  const mutation = useMutation<SignInResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await apiClient.post<SignInResponseType>('/auth/signin', json)
      return response
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
    onError: ({ message }) => {
      toast.error(`Sign in failed: ${message}`)
    }
  })

  return mutation
}
