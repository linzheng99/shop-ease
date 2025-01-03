"use client"

import { useQuery } from "@tanstack/react-query"

import { getSession } from "@/lib/session"


export const useCurrent = () => {
  const query = useQuery({
    queryKey: ['current'],
    queryFn: async () => {
      const response = await getSession()
      return response
    }
  })

  return query
}
