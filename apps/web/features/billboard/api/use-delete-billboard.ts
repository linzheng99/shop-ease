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

export const useDeleteBillboard = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<Billboard, Error, RequestType>({
    mutationFn: async ({ params }) => {
      const response = await apiClient.delete<ResponseType>(`/billboard/${params.id}`)
      return response.data
    },
    onSuccess: async (data) => {
      toast.success('Delete billboard success!')
      await queryClient.invalidateQueries({ queryKey: ['billboards', data.storeId] })
    },
    onError: ({ message }) => {
      toast.error(`Delete billboard failed: ${message}`)
    }
  })

  return mutation
}
