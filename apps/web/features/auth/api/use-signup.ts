import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'

import apiClient from '@/lib/apiClient'

interface ResponseType {
  password: string;
  email: string;
  name: string;
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
interface RequestType {
  json: {
    email: string
    name: string
    password: string
  }
}

export const useSignup = () => {
  const router = useRouter()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await apiClient.post<ResponseType>('/auth/signup', json)
      return response
    },
    onSuccess: () => {
      toast.success('Register success!')
      router.push('/sign-in')
    },
    onError: ({ message }) => {
      toast.error(`Register failed: ${message}`)
    }
  })

  return mutation
}
