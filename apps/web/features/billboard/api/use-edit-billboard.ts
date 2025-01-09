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
  params: {
    id: string
  }
}

type ResponseType = CommonResponse<Billboard>

export const useEditBillboard = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<Billboard, Error, RequestType>({
    mutationFn: async ({ json, params }) => {
      const response = await apiClient.patch<ResponseType>(`/billboard/${params.id}`, json)
      return response.data
    },
    onSuccess: async (data) => {
      toast.success('Edit billboard success!')
      await queryClient.invalidateQueries({ queryKey: ['billboards', data.storeId] })
      await queryClient.invalidateQueries({ queryKey: ['billboard', data.id] })
    },
    onError: ({ message }) => {
      toast.error(`Create billboard failed: ${message}`)
    },
  })

  return mutation
}
