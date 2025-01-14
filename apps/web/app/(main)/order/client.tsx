"use client"

import { useQueryClient } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { useEffect } from 'react';
import { toast } from "sonner"

import { DataTable } from "@/components/data-table"
import PageLoader from "@/components/page-loader"
import { useGetOrders } from "@/features/order/api/use-get-orders"
import { columns } from "@/features/order/components/columns"

export default function OrderClient() {
  const { data, isLoading } = useGetOrders()
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get('success')) {
      void queryClient.invalidateQueries({ queryKey: ['orders'] })
      toast.success('Payment completed.')
    }

    if (searchParams.get('canceled')) {
      toast.error('Payment canceled.')
    }
  }, [searchParams])

  if (isLoading) return <PageLoader />


  return (
    <div className="h-full">
      <div className="flex flex-col h-full gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Orders</h1>
        </div>
        <div className="grid grid-cols-1 gap-4">  
          <DataTable columns={columns} data={data || []} searchKey="status" />
        </div>
      </div>
    </div>
  )
}
