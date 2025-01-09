import { useQuery } from '@tanstack/react-query'

import apiClient from '@/lib/apiClient'
import { type CommonResponse } from '@/types'

import { type BillboardWithImageType } from '../types'


type ResponseType = CommonResponse<BillboardWithImageType[]>

export const useGetBillboards = (storeId: string) => {
  const query = useQuery<BillboardWithImageType[], Error>({
    queryKey: ['billboards', storeId],
    queryFn: async () => {
      const response = await apiClient.get<ResponseType>(`/billboard/list/${storeId}`)
      return response.data
    },
  })

  return query
}

