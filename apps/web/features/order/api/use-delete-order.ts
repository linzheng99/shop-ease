import { type Order } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import apiClient from '@/lib/apiClient';
import { type CommonResponse } from '@/types';


interface RequestType {
  params: {
    id: string
  }
}

type ResponseType = CommonResponse<Order>

export const useDeleteOrder = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<Order, Error, RequestType>({
    mutationFn: async ({ params }) => {
      const response = await apiClient.delete<ResponseType>(`/order/${params.id}`)
      return response.data
    },
    onSuccess: async () => {
      toast.success('Delete order success!')
      await queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
    onError: ({ message }) => {
      toast.error(`Delete order failed: ${message}`)
    }
  })

  return mutation
}
