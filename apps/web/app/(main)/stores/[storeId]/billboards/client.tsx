"use client"

import PageLoader from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { useGetBillboards } from "@/features/billboard/api/use-get-billboards";
import BillboardCard from "@/features/billboard/components/billboard-card";
import { useBillboardModal } from "@/features/billboard/store/use-billboard-modal";
import { useStoreId } from "@/hooks/use-store-id";

export default function BillboardsClient() {
  const storeId = useStoreId()
  const { data, isLoading} = useGetBillboards(storeId)
  const { onOpen } = useBillboardModal()

  if (isLoading) return <PageLoader />
  
  return (
    <div className="h-full">
      {
        !data?.length ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <h1 className="text-2xl font-bold text-center">You don't have any billboard for this store</h1>
            <Button variant="default" onClick={onOpen}>Create Billboard</Button>
          </div>
        ) : (
          <div className="flex flex-col h-full gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Billboards</h1>
              <Button variant="default" onClick={onOpen}>Create Billboard</Button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {data.map((billboard) => (
                <BillboardCard key={billboard.id} billboard={billboard} />
              ))}
            </div>
          </div>
        )
      }
    </div>
  )
}
