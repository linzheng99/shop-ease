import { type Color } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import apiClient from '@/lib/apiClient'
import { type CommonResponse } from '@/types'

type ResponseType = CommonResponse<Color[]>

export const useGetColors = (storeId: string) => {
  const query = useQuery<Color[], Error>({
    queryKey: ['colors', storeId],
    queryFn: async () => {
      const response = await apiClient.get<ResponseType>(`/color/list/${storeId}`)
      return response.data
    },
  })

  return query
}

