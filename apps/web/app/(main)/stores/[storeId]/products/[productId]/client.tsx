"use client"


import PageError from "@/components/page-error"
import PageLoader from "@/components/page-loader"
import { useGetProduct } from "@/features/product/api/use-get-product"
import { ProductOverview } from "@/features/product/components/product-overview"
import { useProductId } from "@/hooks/use-product-id"

export default function ProductIdClient() {
  const productId = useProductId()
  const { data, isLoading } = useGetProduct(productId)

  if (isLoading) return <PageLoader />
  if (!data) return <PageError message="Product not found" />

  return (
    <div className="h-full">
      <h1 className="font-semibold text-2xl">Product Overview</h1>
      <ProductOverview product={data} />
    </div >
  )
}
