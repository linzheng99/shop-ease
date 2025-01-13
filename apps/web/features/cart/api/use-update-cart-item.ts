import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import apiClient from '@/lib/apiClient';
import { type CommonResponse } from '@/types';

import { type CartWithVariant } from '../types';


interface RequestType {
  json: {
    quantity: number
  }
  params: {
    id: string
  }
}

type ResponseType = CommonResponse<CartWithVariant>

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<CartWithVariant, Error, RequestType>({
    mutationFn: async ({ json, params }) => {
      const response = await apiClient.patch<ResponseType>(`/cart/${params.id}`, json)
      return response.data
    },
    onSuccess: async () => {
      toast.success('Update cart item success!')
      await queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: ({ message }) => {
      toast.error(`Update cart item failed: ${message}`)
    }
  })

  return mutation
}
