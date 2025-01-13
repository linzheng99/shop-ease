"use client"

import Image from "next/image"

import PageError from "@/components/page-error"
import PageLoader from "@/components/page-loader"
import { useGetProduct } from "@/features/product/api/use-get-product"
import VariantSelector from "@/features/product/components/variant-selector"
import { useProductId } from "@/hooks/use-product-id"

export default function ProductIdClient() {
  const productId = useProductId()
  const { data, isLoading } = useGetProduct(productId)

  if (isLoading) return <PageLoader />
  if (!data) return <PageError message="Product not found" />

  const { name, description, productVariants, images, price } = data

  return (
    <div className="h-full">
      <h1 className="font-semibold text-2xl">Product Overview</h1>
      <div className="flex mt-8 flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          {
            images.length > 0 && (
              <div className="w-full h-96 rounded-md overflow-hidden relative">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${images[0]?.url}`}
                  alt={name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            )
          }
        </div>
        <div className="w-full md:w-1/2 md:p-6 flex flex-col gap-4">
          <span className="font-bold text-3xl mt-4 md:mt-0">{name}</span>
          <p className="text-[16px] text-muted-foreground mb-5">{description}</p>
          <span className="text-xl font-semibold">$ {price}</span>
          <VariantSelector productVariants={productVariants} productId={productId} />
        </div>
      </div>
    </div >
  )
}
