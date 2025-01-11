import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import apiClient from '@/lib/apiClient';
import { type CommonResponse } from '@/types';

import { type ProductAllType } from '../types';


interface RequestType {
  json: {
    name: string
    storeId: string
    categoryId: string
    description: string
    price: number
    images?: {
      id: string
      url: string
      name: string
    }[]
    productVariants: {
      colorId: string
      sizeId: string
      quantity: number
    }[]
  }
}

type ResponseType = CommonResponse<ProductAllType>

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<ProductAllType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      if (!json.images?.length) {
        delete json.images
      }
      console.log(json, 'json');

      const response = await apiClient.post<ResponseType>('/product/create', json)
      return response.data
    },
    onSuccess: async (data) => {
      toast.success('Create product success!')
      await queryClient.invalidateQueries({ queryKey: ['products', data.storeId] })
    },
    onError: ({ message }) => {
      toast.error(`Create product failed: ${message}`)
    }
  })

  return mutation
}
