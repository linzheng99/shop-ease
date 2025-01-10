import { type Color } from '@prisma/client'
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

type ResponseType = CommonResponse<Color>

export const useDeleteColor = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<Color, Error, RequestType>({
    mutationFn: async ({ params }) => {
      const response = await apiClient.delete<ResponseType>(`/color/${params.storeId}/${params.id}`)
      return response.data
    },
    onSuccess: async (data) => {
      toast.success('Delete color success!')
      await queryClient.invalidateQueries({ queryKey: ['colors', data.storeId] })
    },
    onError: ({ message }) => {
      toast.error(`Delete color failed: ${message}`)
    }
  })

  return mutation
}
