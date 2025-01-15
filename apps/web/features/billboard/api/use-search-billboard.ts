import { useQuery } from '@tanstack/react-query'

import apiClient from '@/lib/apiClient'
import { type CommonResponse } from '@/types'

import { type BillboardWithImageType } from '../types'

type ParamsType = {
  isFeatured?: boolean
}

type ResponseType = CommonResponse<BillboardWithImageType[]>

export const useSearchBillboards = (storeId: string, { isFeatured }: ParamsType) => {

  const query = useQuery<BillboardWithImageType[], Error>({
    queryKey: ['billboards', storeId, isFeatured],
    queryFn: async () => {
      const response = await apiClient.get<ResponseType>(`/billboard/${storeId}/featured`, { params: { isFeatured } })
      return response.data
    },
  })

  return query
}

