import { type Billboard } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import apiClient from '@/lib/apiClient';
import { type CommonResponse } from '@/types';


interface RequestType {
  json: {
    label: string
    imageId: string
    storeId: string
  }
}

type ResponseType = CommonResponse<Billboard>

export const useCreateBillboard = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<Billboard, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await apiClient.post<ResponseType>('/billboard/create', json)
      return response.data
    },
    onSuccess: async (data) => {
      toast.success('Create billboard success!')
      await queryClient.invalidateQueries({ queryKey: ['billboards', data.storeId] })
    },
    onError: ({ message }) => {
      toast.error(`Create billboard failed: ${message}`)
    }
  })

  return mutation
}
