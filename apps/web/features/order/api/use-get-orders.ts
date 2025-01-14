import { type Order } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import apiClient from '@/lib/apiClient'
import { type CommonResponse } from '@/types'

type ResponseType = CommonResponse<Order[]>

export const useGetOrders = () => {
  const query = useQuery<Order[], Error>({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await apiClient.get<ResponseType>(`/order/list`)
      return response.data
    },
  })

  return query
}

