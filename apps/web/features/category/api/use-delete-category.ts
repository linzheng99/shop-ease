import { type Category } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import apiClient from '@/lib/apiClient';
import { type CommonResponse } from '@/types';


interface RequestType {
  params: {
    storeId: string
    id: string
  }
}

type ResponseType = CommonResponse<Category>

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<Category, Error, RequestType>({
    mutationFn: async ({ params }) => {
      const response = await apiClient.delete<ResponseType>(`/category/${params.storeId}/${params.id}`)
      return response.data
    },
    onSuccess: async (data) => {
      toast.success('Delete category success!')
      await queryClient.invalidateQueries({ queryKey: ['categories', data.storeId] })
    },
    onError: ({ message }) => {
      toast.error(`Delete category failed: ${message}`)
    }
  })

  return mutation
}
