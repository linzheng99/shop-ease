import { type Image } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import apiClient from '@/lib/apiClient';
import { type CommonResponse } from '@/types';


interface RequestType {
  json: FormData
}

type ResponseType = CommonResponse<Image>

export const useUploadImage = () => {
  const mutation = useMutation<Image, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await apiClient.upload<ResponseType>('/uploads/image', json)
      return response.data
    },
    onError: ({ message }) => {
      toast.error(`Upload image failed: ${message}`)
    }
  })

  return mutation
}
