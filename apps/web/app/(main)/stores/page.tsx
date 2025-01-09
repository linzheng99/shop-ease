'use client'

import { useRouter } from "next/navigation";

import PageLoader from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { useGetUserStores } from "@/features/store/api/use-get-user-stores";
import StoreCard from "@/features/store/components/store-card";

export default function StoresPage() {
  const router = useRouter();
  const { data, isLoading } = useGetUserStores();

  if (isLoading) return <PageLoader />

  function handleCreateStore() {
    router.push('/stores/create');
  }

  return (
    <div className="h-full">
      {
        !data?.length ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <h1 className="text-2xl font-bold text-center">You don't have any store yet</h1>
            <Button variant="default" onClick={handleCreateStore}>Create Store</Button>
          </div>
        ) : (
          <div className="flex flex-col h-full gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">STORES</h1>
              <Button variant="default" onClick={handleCreateStore}>Create Store</Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {data.map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          </div>
        )
      }
    </div>
  )
}
