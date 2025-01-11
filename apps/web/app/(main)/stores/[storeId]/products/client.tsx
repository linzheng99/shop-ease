"use client"

import PageLoader from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { useGetProducts } from "@/features/product/api/use-get-products";
import ProductCard from "@/features/product/components/product-card";
import { useProductModal } from "@/features/product/store/use-product-modal";
import { useStoreId } from "@/hooks/use-store-id";

export default function ProductsClient() {
  const storeId = useStoreId()
  const { data, isLoading } = useGetProducts(storeId)
  const { onOpen } = useProductModal()

  if (isLoading) return <PageLoader />

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button variant="default" onClick={onOpen}>Create Product</Button>
      </div>
      {data?.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <h1 className="text-2xl font-bold text-center">You don't have any product for this store</h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

