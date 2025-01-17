import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'

import apiClient from '@/lib/apiClient';
import { deleteSession } from '@/lib/session';

import { type SignInResponseType } from '../types';

export const useSignout = () => {
  const router = useRouter()
  const mutation = useMutation<SignInResponseType, Error>({
    mutationFn: async () => {
      const response = await apiClient.post<SignInResponseType>('/auth/signout')
      return response
    },
    onSuccess: async () => {
      await deleteSession()
      router.push('/')
      toast.success('Sign out success!')
    },
    onError: ({ message }) => {
      toast.error(`Sign out failed: ${message}`)
    }
  })

  return mutation
}
