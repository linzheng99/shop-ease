import { useQuery } from '@tanstack/react-query'

import apiClient from '@/lib/apiClient'
import { type CommonResponse } from '@/types'

import { type StoreType } from '../types'

type ResponseType = CommonResponse<StoreType[]>

export const useGetUserStores = () => {
  const query = useQuery<StoreType[], Error>({
    queryKey: ['user-stores'],
    queryFn: async () => {
      const response = await apiClient.get<ResponseType>('/user/stores')
      return response.data
    },
  })

  return query
}

