import { type Category } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import apiClient from '@/lib/apiClient';
import { type CommonResponse } from '@/types';


interface RequestType {
  json: {
    ids: string[]
  }
}

type ResponseType = CommonResponse<Category>

export const useStripeCheckout = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<Category, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await apiClient.post<ResponseType>('/stripe/checkout', json)
      return response.data
    },
    onSuccess: async () => {
      toast.success('Checkout success!')
      await queryClient.invalidateQueries({ queryKey: ['cart'] })
      await queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
    onError: ({ message }) => {
      toast.error(`Checkout failed: ${message}`)
    }
  })

  return mutation
}
