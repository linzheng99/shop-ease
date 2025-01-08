"use client"


import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { useGetStore } from "@/features/store/api/use-get-store";
import StoreActions from "@/features/store/components/store-actions";
import { useStoreId } from "@/hooks/use-store-id";

export default function StoreIdPageClient() {
  const storeId = useStoreId()
  const { data, isLoading } = useGetStore(storeId)

  if (isLoading) return <PageLoader />
  if (!data) return <PageError message="Store not found" />


  return (
    <div className="h-full flex flex-col gap-4">
      <StoreActions storeId={storeId} />
      {JSON.stringify(data)}
    </div>
  )
}
