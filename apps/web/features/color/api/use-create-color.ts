import { type Color } from '@prisma/client'
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

type ResponseType = CommonResponse<Color>

export const useCreateColor = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<Color, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await apiClient.post<ResponseType>('/color/create', json)
      return response.data
    },
    onSuccess: async (data) => {
      toast.success('Create color success!')
      await queryClient.invalidateQueries({ queryKey: ['colors', data.storeId] })
    },
    onError: ({ message }) => {
      toast.error(`Create color failed: ${message}`)
    }
  })

  return mutation
}
