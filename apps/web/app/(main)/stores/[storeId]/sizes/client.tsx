"use client"

import { DataTable } from "@/components/data-table"
import PageLoader from "@/components/page-loader"
import { Button } from "@/components/ui/button"
import { useGetSizes } from "@/features/size/api/use-get-sizes"
import { columns } from "@/features/size/components/columns"
import { useSizeModal } from "@/features/size/store/use-size-modal"
import { useStoreId } from "@/hooks/use-store-id"

export const SizesClient = () => {
  const storeId = useStoreId()
  const { data, isLoading } = useGetSizes(storeId)
  const { onOpen } = useSizeModal()

  if (isLoading) return <PageLoader />

  return (
    <div className="h-full">
      <div className="flex flex-col h-full gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Sizes</h1>
          <Button variant="default" onClick={onOpen}>Create Size</Button>
        </div>
        <div className="grid grid-cols-1 gap-4">  
          <DataTable columns={columns} data={data || []} searchKey="name" />
        </div>
      </div>
    </div>
  )
}
