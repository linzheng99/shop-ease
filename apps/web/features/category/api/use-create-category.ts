import { type Category } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import apiClient from '@/lib/apiClient';
import { type CommonResponse } from '@/types';


interface RequestType {
  json: {
    name: string
    storeId: string
  }
}

type ResponseType = CommonResponse<Category>

export const useCreateCategory = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<Category, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await apiClient.post<ResponseType>('/category/create', json)
      return response.data
    },
    onSuccess: async (data) => {
      toast.success('Create category success!')
      await queryClient.invalidateQueries({ queryKey: ['categories', data.storeId] })
    },
    onError: ({ message }) => {
      toast.error(`Create category failed: ${message}`)
    }
  })

  return mutation
}
