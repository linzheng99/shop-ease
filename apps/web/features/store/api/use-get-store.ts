import { useQuery } from '@tanstack/react-query'

import apiClient from '@/lib/apiClient'
import { type CommonResponse } from '@/types'

import { type StoreType } from '../types'

type ResponseType = CommonResponse<StoreType[]>

export const useGetStore = (storeId: string) => {
  const query = useQuery<StoreType[], Error>({
    queryKey: ['store', storeId],
    queryFn: async () => {
      const response = await apiClient.get<ResponseType>(`/store/${storeId}`)
      return response.data
    },
  })

  return query
}

