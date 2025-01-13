import { type Product } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import apiClient from '@/lib/apiClient';
import { type CommonResponse } from '@/types';

interface RequestType {
  params: {
    storeId: string
    productId: string
  }
}

type ResponseType = CommonResponse<Product>

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<Product, Error, RequestType>({
    mutationFn: async ({ params }) => {
      const response = await apiClient.delete<ResponseType>(`/product/${params.storeId}/${params.productId}`)
      return response.data
    },
    onSuccess: async (data) => {
      toast.success('Delete product success!')
      await queryClient.invalidateQueries({ queryKey: ['products', data.storeId] })
      await queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: ({ message }) => {
      toast.error(`Delete product failed: ${message}`)
    }
  })

  return mutation
}
