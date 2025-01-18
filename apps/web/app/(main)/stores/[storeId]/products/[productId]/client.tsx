"use client"


import PageError from "@/components/page-error"
import PageLoader from "@/components/page-loader"
import { useGetProduct } from "@/features/product/api/use-get-product"
import { ProductOverview } from "@/features/product/components/product-overview"
import { useProductId } from "@/hooks/use-product-id"
import { type Session } from "@/lib/session"

interface ProductIdClientProps {
  session: Session | null
}

export default function ProductIdClient({ session }: ProductIdClientProps) {
  const productId = useProductId()
  const { data, isLoading } = useGetProduct(productId)

  if (isLoading) return <PageLoader />
  if (!data) return <PageError message="Product not found" />

  return (
    <div className="h-full">
      <h1 className="font-semibold text-2xl">Product Overview</h1>
      <ProductOverview product={data} session={session} />
    </div >
  )
}
