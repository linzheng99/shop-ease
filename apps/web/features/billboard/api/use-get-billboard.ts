import { useQuery } from '@tanstack/react-query'

import apiClient from '@/lib/apiClient'
import { type CommonResponse } from '@/types'

import { type BillboardWithImageType } from '../types'


type ResponseType = CommonResponse<BillboardWithImageType>

export const useGetBillboard = (id: string) => {
  const query = useQuery<BillboardWithImageType, Error>({
    queryKey: ['billboard', id],
    queryFn: async () => {
      const response = await apiClient.get<ResponseType>(`/billboard/${id}`)
      return response.data
    },
  })

  return query
}

