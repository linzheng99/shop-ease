import { useQuery } from '@tanstack/react-query'

import apiClient from '@/lib/apiClient'

interface ResponseType {
  password: string;
  email: string;
  name: string;
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const useGetProfile = () => {
  const query = useQuery<ResponseType, Error>({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await apiClient.get<ResponseType>('/auth/profile')
      return response
    },
  })

  return query
}

