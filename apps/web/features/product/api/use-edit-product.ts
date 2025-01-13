import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import apiClient from '@/lib/apiClient';
import { type CommonResponse } from '@/types';

import { type ProductAllType } from '../types';


interface RequestType {
  json: {
    id: string
    name: string
    storeId: string
    categoryId: string
    description: string
    price: number
    productVariants: {
      id?: string
      colorId?: string
      sizeId?: string
      quantity: number
    }[]
    images?: {
      id: string
      url: string
      name: string
    }[]
  }
  params: {
    id: string
  }
}

type ResponseType = CommonResponse<ProductAllType>

export const useEditProduct = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<ProductAllType, Error, RequestType>({
    mutationFn: async ({ json, params }) => {
      if (!json.images?.length) {
        delete json.images
      }

      const response = await apiClient.patch<ResponseType>(`/product/${params.id}`, json)
      return response.data
    },
    onSuccess: async (data) => {
      toast.success('Edit product success!')
      await queryClient.invalidateQueries({ queryKey: ['products', data.storeId] })
      await queryClient.invalidateQueries({ queryKey: ['product', data.id] })
    },
    onError: ({ message }) => {
      toast.error(`Edit product failed: ${message}`)
    }
  })

  return mutation
}
