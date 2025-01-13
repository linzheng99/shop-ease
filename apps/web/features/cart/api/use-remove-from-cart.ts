import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import apiClient from '@/lib/apiClient';
import { type CommonResponse } from '@/types';

import { type CartWithVariant } from '../types';


interface RequestType {
  params: {
    id: string
  }
}

type ResponseType = CommonResponse<CartWithVariant>

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<CartWithVariant, Error, RequestType>({
    mutationFn: async ({ params }) => {
      const response = await apiClient.delete<ResponseType>(`/cart/remove/${params.id}`)
      return response.data
    },
    onSuccess: async () => {
      toast.success('Remove from cart success!')
      await queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: ({ message }) => {
      toast.error(`Remove from cart failed: ${message}`)
    }
  })

  return mutation
}
