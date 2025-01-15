"use client"

import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { Separator } from "@/components/ui/separator";
import { useSearchBillboards } from "@/features/billboard/api/use-search-billboard";
import { FeaturedBillboard } from "@/features/billboard/components/featured-billboard";
import { useGetCategories } from "@/features/category/api/use-get-categories";
import { useGetColors } from "@/features/color/api/use-get-colors";
import ProductFilters from "@/features/product/components/product-filters";
import { useGetSizes } from "@/features/size/api/use-get-sizes";
import { useGetStore } from "@/features/store/api/use-get-store";
import StoreActions from "@/features/store/components/store-actions";
import { useStoreId } from "@/hooks/use-store-id";

export default function StoreIdPageClient() {
  const storeId = useStoreId()
  const { data: store, isLoading } = useGetStore(storeId)
  const { data: billboards, isLoading: isBillboardsLoading } = useSearchBillboards(storeId, { isFeatured: true })
  const { data: categories, isLoading: isCategoriesLoading } = useGetCategories(storeId)
  const { data: sizes, isLoading: isSizesLoading } = useGetSizes(storeId)
  const { data: colors, isLoading: isColorsLoading } = useGetColors(storeId)

  if (isLoading || isBillboardsLoading || isCategoriesLoading || isSizesLoading || isColorsLoading) return <PageLoader />
  if (!store) return <PageError message="Store not found" />

  const categoryCheckboxes = categories?.map(category => ({
    id: category.id,
    label: category.name,
  }))

  const sizeCheckboxes = sizes?.map(size => ({
    id: size.id,
    label: size.name,
  }))

  const colorCheckboxes = colors?.map(color => ({
    id: color.id,
    label: color.name,
  }))


  return (
    <div className="h-full flex flex-col gap-4">
      <StoreActions storeId={storeId} />
      <Separator />
      <div className="flex flex-col items-center gap-2">
        <div className="text-3xl md:text-4xl font-bold">{store.name}</div>
        <div className="text-gray-500">{store.description}</div>
      </div>
      <FeaturedBillboard billboards={billboards ?? []} />
      <div className="flex flex-col items-center gap-2">
        <div className="text-3xl md:text-4xl font-bold">Product filters</div>
        <Link href={`/stores/${storeId}/products`} className="text-gray-500 group transition-colors hover:text-amber-500">
          <div className="flex items-center justify-center gap-1">
            Browse all products
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
      <ProductFilters
        storeId={storeId}
        categoryCheckboxes={categoryCheckboxes ?? []}
        sizeCheckboxes={sizeCheckboxes ?? []}
        colorCheckboxes={colorCheckboxes ?? []}
      />
    </div>
  )
}
