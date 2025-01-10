import { type Size } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import apiClient from '@/lib/apiClient'
import { type CommonResponse } from '@/types'

type ResponseType = CommonResponse<Size[]>

export const useGetSizes = (storeId: string) => {
  const query = useQuery<Size[], Error>({
    queryKey: ['sizes', storeId],
    queryFn: async () => {
      const response = await apiClient.get<ResponseType>(`/size/list/${storeId}`)
      return response.data
    },
  })

  return query
}

