import { useQuery } from '@tanstack/react-query'

import apiClient from '@/lib/apiClient'
import { type CommonResponse } from '@/types'

import { type CartWithVariant } from '../types'

type ResponseType = CommonResponse<CartWithVariant>

export const useGetCart = () => {
  const query = useQuery<CartWithVariant, Error>({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await apiClient.get<ResponseType>(`/cart`)
      return response.data
    },
  })

  return query
}

