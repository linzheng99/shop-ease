import { useQuery } from '@tanstack/react-query'

import apiClient from '@/lib/apiClient'
import { type CommonResponse } from '@/types'

import { type ProductAllType } from '../types'

type ResponseType = CommonResponse<ProductAllType[]>

export const useGetProducts = (storeId: string) => {
  const query = useQuery<ProductAllType[], Error>({
    queryKey: ['products', storeId],
    queryFn: async () => {
      const response = await apiClient.get<ResponseType>(`/product/list/${storeId}`)
      return response.data
    },
  })

  return query
}

