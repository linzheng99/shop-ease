import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import apiClient from '@/lib/apiClient';
import { type CommonResponse } from '@/types';

import { type StoreType } from '../types';

interface RequestType {
  json: {
    name: string
    description?: string
  }
}

type ResponseType = CommonResponse<StoreType>

export const useCreateStore = () => {
  const mutation = useMutation<StoreType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await apiClient.post<ResponseType>('/store/create', json)
      return response.data
    },
    onSuccess: () => {
      toast.success('Create store success!')
    },
    onError: ({ message }) => {
      toast.error(`Create store failed: ${message}`)
    }
  })

  return mutation
}
