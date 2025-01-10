import { type Category } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import apiClient from '@/lib/apiClient'
import { type CommonResponse } from '@/types'

type ResponseType = CommonResponse<Category[]>

export const useGetCategories = (storeId: string) => {
  const query = useQuery<Category[], Error>({
    queryKey: ['categories', storeId],
    queryFn: async () => {
      const response = await apiClient.get<ResponseType>(`/category/list/${storeId}`)
      return response.data
    },
  })

  return query
}

