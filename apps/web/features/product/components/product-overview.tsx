import { type ProductAllType } from "@/features/product/types"

import { ProductPreview } from "./product-preview"
import VariantSelector from "./variant-selector"

interface ProductOverviewProps {
  product: ProductAllType
}

export function ProductOverview({ product }: ProductOverviewProps) {
  const { name, description, productVariants, images, price } = product

  return (
    <div className="flex mt-8 flex-col md:flex-row">
      <div className="w-full md:w-1/2">
        {
          images.length > 0 ? (
            <ProductPreview images={images} />
          ) : (
            <div className="w-full h-full aspect-square rounded-md overflow-hidden relative">
              <div className="w-full h-full bg-muted-foreground/10 rounded-md flex items-center justify-center">
                <p className="text-center text-muted-foreground/50">No images available</p>
              </div>
            </div>
          )
        }
      </div>
      <div className="w-full md:w-1/2 md:p-6 flex flex-col gap-4">
        <span className="font-bold text-3xl mt-4 md:mt-0">{name}</span>
        <p className="text-[16px] text-muted-foreground mb-5">{description}</p>
        <span className="text-xl font-semibold">$ {price}</span>
        <VariantSelector productVariants={productVariants} productId={product.id} />
      </div>
    </div>
  )
}
