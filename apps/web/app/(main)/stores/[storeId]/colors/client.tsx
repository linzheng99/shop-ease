"use client"

import { DataTable } from "@/components/data-table"
import PageLoader from "@/components/page-loader"
import { Button } from "@/components/ui/button"
import { useGetColors } from "@/features/color/api/use-get-colors"
import { columns } from "@/features/color/components/columns"
import { useColorModal } from "@/features/color/store/use-color-modal"
import { useStoreId } from "@/hooks/use-store-id"

export const ColorsClient = () => {
  const storeId = useStoreId()
  const { data, isLoading } = useGetColors(storeId)
  const { onOpen } = useColorModal()

  if (isLoading) return <PageLoader />

  return (
    <div className="h-full">
      <div className="flex flex-col h-full gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Colors</h1>
          <Button variant="default" onClick={onOpen}>Create Color</Button>
        </div>
        <div className="grid grid-cols-1 gap-4">  
          <DataTable columns={columns} data={data || []} searchKey="name" />
        </div>
      </div>
    </div>
  )
}
