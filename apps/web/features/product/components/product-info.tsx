import Image from "next/image";

import { Badge } from "@/components/ui/badge";

import { type ProductAllType } from "../types";

interface ProductInfoProps {
  product: ProductAllType
  onClick?: () => void
}

export default function ProductInfo({ product, onClick }: ProductInfoProps) {
  const { name, price, images, category, description, productVariants } = product;
  const imageUrl = images?.[0]?.url;

  const uniqueColorVariants = Array.from(
    new Map(productVariants.filter(variant => !!variant.colorId).map(variant => [variant.color.id, variant])).values()
  );

  return (
    <div onClick={onClick} className="border p-4 rounded-md flex flex-col gap-2 hover:shadow-md transition-all duration-300 cursor-pointer">
      {imageUrl ? (
        <div className="aspect-square rounded-md overflow-hidden relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${imageUrl}`}
            alt={name}
            fill
            className="object-cover aspect-square rounded-md"
          />
        </div>
      ) : (
        <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center">
          <p className="font-semibold text-gray-500">No image</p>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <Badge variant="secondary" className="w-fit">{category.name}</Badge>
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex gap-2">
        {
          uniqueColorVariants.map(variant => (
            <div key={variant.id} className="border size-6 rounded-md" style={{ backgroundColor: variant.color?.value }}>
            </div>
          ))
        }
      </div>
      <p className="text-lg font-semibold">${price}</p>
    </div>
  )
}
