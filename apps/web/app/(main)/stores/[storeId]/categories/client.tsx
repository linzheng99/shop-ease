"use client"

import { DataTable } from "@/components/data-table"
import PageLoader from "@/components/page-loader"
import { Button } from "@/components/ui/button"
import { useGetCategories } from "@/features/category/api/use-get-categories"
import { columns } from "@/features/category/components/columns"
import { useCategoryModal } from "@/features/category/store/use-category-modal"
import { useStoreId } from "@/hooks/use-store-id"

export const CategoriesClient = () => {
  const storeId = useStoreId()
  const { data, isLoading } = useGetCategories(storeId)
  const { onOpen } = useCategoryModal()

  if (isLoading) return <PageLoader />

  return (
    <div className="h-full">
      <div className="flex flex-col h-full gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Categories</h1>
          <Button variant="default" onClick={onOpen}>Create Category</Button>
        </div>
        <div className="grid grid-cols-1 gap-4">  
          <DataTable columns={columns} data={data || []} searchKey="name" />
        </div>
      </div>
    </div>
  )
}
