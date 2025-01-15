import { useQuery } from '@tanstack/react-query'

import apiClient from '@/lib/apiClient'
import { type CommonResponse } from '@/types'

import { type StoreWithProducts } from '../types'

type ResponseType = CommonResponse<StoreWithProducts>

export const useGetStore = (storeId: string) => {
  const query = useQuery<StoreWithProducts, Error>({
    queryKey: ['store', storeId],
    queryFn: async () => {
      const response = await apiClient.get<ResponseType>(`/store/${storeId}`)
      return response.data
    },
  })

  return query
}

