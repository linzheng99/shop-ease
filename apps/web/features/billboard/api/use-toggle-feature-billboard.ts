import { type Billboard } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import apiClient from '@/lib/apiClient';
import { type CommonResponse } from '@/types';


interface RequestType {
  params: {
    id: string
  }
}

type ResponseType = CommonResponse<Billboard>

export const useToggleFeaturedBillboard = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<Billboard, Error, RequestType>({
    mutationFn: async ({ params }) => {
      const response = await apiClient.patch<ResponseType>(`/billboard/featured/${params.id}`)
      return response.data
    },
    onSuccess: async (data) => {
      toast.success('Toggle featured billboard success!')
      await queryClient.invalidateQueries({ queryKey: ['billboards', data.storeId] })
      await queryClient.invalidateQueries({ queryKey: ['billboard', data.id] })
    },
    onError: ({ message }) => {
      toast.error(`Toggle featured billboard failed: ${message}`)
    },
  })

  return mutation
}
