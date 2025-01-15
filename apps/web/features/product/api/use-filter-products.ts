import { useQuery } from '@tanstack/react-query'

import apiClient from '@/lib/apiClient'
import { type CommonResponse } from '@/types'

import { type ProductAllType } from '../types'

type ResponseType = CommonResponse<ProductAllType[]>

type FilterProductsDto = {
  storeId: string
  categoryIds: string[]
  sizeIds: string[]
  colorIds: string[]
}

export const useFilterProducts = ({ storeId, categoryIds, sizeIds, colorIds }: FilterProductsDto) => {
  const query = useQuery<ProductAllType[], Error>({
    queryKey: ['filter-products', storeId, categoryIds, sizeIds, colorIds],
    queryFn: async () => {
      const response = await apiClient.get<ResponseType>(`/product/filter`, {
        params: {
          storeId,
          categoryIds,
          sizeIds,
          colorIds,
        },
      })
      return response.data
    },
  })

  return query
}

