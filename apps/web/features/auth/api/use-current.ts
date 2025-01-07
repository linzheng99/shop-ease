"use client"

import { useQuery } from "@tanstack/react-query"

import apiClient from "@/lib/apiClient"
import { type CommonResponse } from "@/types"

import { type UserType } from "../types"

type ResponseType = CommonResponse<UserType>

export const useCurrent = () => {
  const query = useQuery<UserType, Error>({
    queryKey: ['current'],
    queryFn: async () => {
      const response = await apiClient.get<ResponseType>('/user')
      return response.data
    }
  })

  return query
}
