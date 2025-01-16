import { useQuery } from '@tanstack/react-query'

import apiClient from '@/lib/apiClient'
import { type CommonResponse } from '@/types'

import { type StoreWithProducts } from '../types'

type ResponseType = CommonResponse<StoreWithProducts[]>

export const useGetStores = () => {
  const query = useQuery<StoreWithProducts[], Error>({
    queryKey: ['stores'],
    queryFn: async () => {
      const response = await apiClient.get<ResponseType>('/store/list')
      return response.data
    },
  })

  return query
}

