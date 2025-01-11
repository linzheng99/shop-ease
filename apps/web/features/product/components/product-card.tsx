import Image from "next/image";

import { Badge } from "@/components/ui/badge";

import { type ProductAllType } from "../types";

interface ProductCardProps {
  product: ProductAllType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { name, price, images, category, description, productVariants } = product;
  const imageUrl = images?.[0]?.url;

  const uniqueColorVariants = Array.from(
    new Map(productVariants.map(variant => [variant.color.id, variant])).values()
  );

  return (
    <div className="border p-4 rounded-md flex flex-col gap-2 hover:shadow-md transition-all duration-300 cursor-pointer">
      {imageUrl ? (
        <div className="w-full h-40 rounded-md overflow-hidden relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${imageUrl}`}
            alt={name}
            fill
            className="object-cover rounded-md"
          />
        </div>
      ) : (
        <div className="w-full h-40 bg-gray-200 rounded-md flex items-center justify-center">
          <p className="text-sm text-gray-500">No image</p>
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
            <div key={variant.id} className="border size-6 rounded-md" style={{ backgroundColor: variant.color.value }}>
            </div>
          ))
        }
      </div>
      <p className="text-lg font-semibold">${price}</p>
    </div>
  )
};
