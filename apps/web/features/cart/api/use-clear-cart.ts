import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import apiClient from '@/lib/apiClient';
import { type CommonResponse } from '@/types';



type ResponseType = CommonResponse<string>

export const useClearCart = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<string, Error, void>({
    mutationFn: async () => {
      const response = await apiClient.delete<ResponseType>(`/cart/clear`)
      return response.data
    },
    onSuccess: async () => {
      toast.success('Clear cart success!')
      await queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: ({ message }) => {
      toast.error(`Clear cart failed: ${message}`)
    }
  })

  return mutation
}
