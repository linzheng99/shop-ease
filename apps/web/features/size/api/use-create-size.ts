import { type Size } from '@prisma/client'
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

type ResponseType = CommonResponse<Size>

export const useCreateSize = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<Size, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await apiClient.post<ResponseType>('/size/create', json)
      return response.data
    },
    onSuccess: async (data) => {
      toast.success('Create size success!')
      await queryClient.invalidateQueries({ queryKey: ['sizes', data.storeId] })
    },
    onError: ({ message }) => {
      toast.error(`Create size failed: ${message}`)
    }
  })

  return mutation
}
