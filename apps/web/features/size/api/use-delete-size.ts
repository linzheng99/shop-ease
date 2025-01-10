import { type Size } from '@prisma/client'
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

type ResponseType = CommonResponse<Size>

export const useDeleteSize = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<Size, Error, RequestType>({
    mutationFn: async ({ params }) => {
      const response = await apiClient.delete<ResponseType>(`/size/${params.storeId}/${params.id}`)
      return response.data
    },
    onSuccess: async (data) => {
      toast.success('Delete size success!')
      await queryClient.invalidateQueries({ queryKey: ['sizes', data.storeId] })
    },
    onError: ({ message }) => {
      toast.error(`Delete size failed: ${message}`)
    }
  })

  return mutation
}
