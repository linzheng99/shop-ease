import { type Image } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import apiClient from '@/lib/apiClient';
import { type CommonResponse } from '@/types';


interface RequestType {
  id: string
}

type ResponseType = CommonResponse<Image>

export const useDeleteImage = () => {
  const mutation = useMutation<Image, Error, RequestType>({
    mutationFn: async ({ id }) => {
      const response = await apiClient.delete<ResponseType>(`/image/${id}`)
      return response.data
    },
    onSuccess: () => {
    },
    onError: ({ message }) => {
      toast.error(`Delete image failed: ${message}`)
    }
  })

  return mutation
}
