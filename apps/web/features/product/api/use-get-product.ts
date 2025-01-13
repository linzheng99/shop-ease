import { useQuery } from '@tanstack/react-query'

import apiClient from '@/lib/apiClient'
import { type CommonResponse } from '@/types'

import { type ProductAllType } from '../types'

type ResponseType = CommonResponse<ProductAllType>

export const useGetProduct = (id: string) => {
  const query = useQuery<ProductAllType, Error>({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await apiClient.get<ResponseType>(`/product/${id}`)
      return response.data
    },
  })

  return query
}

