import { useMutation } from '@tanstack/react-query'
import { type AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'

import apiClient from '@/lib/axios'

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
  email: string
  name: string
  password: string
}

export const useSignup = () => {
  const router = useRouter()
  const mutation = useMutation<ResponseType, AxiosError, RequestType>({
    mutationFn: async (data) => {
      const response = await apiClient.post<ResponseType, RequestType>('/auth/signup', data)
      return response.data
    },
    onSuccess: () => {
      toast.success('Register success!')
      router.push('/sign-in')
    },
    onError: (error) => {
      toast.error(`Register failed: ${error.message}`)
    }
  })

  return mutation
}
