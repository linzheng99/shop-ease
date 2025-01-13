import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import apiClient from '@/lib/apiClient';
import { type CommonResponse } from '@/types';

import { type CartWithVariant } from '../types';


interface RequestType {
  json: {
    productId: string
    productVariantId: string
    quantity: number
  }
}

type ResponseType = CommonResponse<CartWithVariant>

export const useAddToCart = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<CartWithVariant, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await apiClient.post<ResponseType>('/cart/add', json)
      return response.data
    },
    onSuccess: async () => {
      toast.success('Add to cart success!')
      await queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: ({ message }) => {
      toast.error(`Add to cart failed: ${message}`)
    }
  })

  return mutation
}
