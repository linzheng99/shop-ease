import Image from "next/image"

import { type BillboardWithImageType } from "../types"

interface FeaturedBillboardProps {
  billboards: BillboardWithImageType[]
}

export function FeaturedBillboard({ billboards }: FeaturedBillboardProps) {
  const featuredBillboard = billboards?.find(billboard => billboard.isFeatured)
  return (
    <div className="relative min-h-[300px] w-full overflow-hidden">
      {featuredBillboard ? (
        <>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${featuredBillboard.image.url}`}
            alt={featuredBillboard.label}
            fill
            className="rounded-xl aspect-square md:aspect-[2.4/1]"
            unoptimized
          />
          <div className="absolute h-full w-full flex flex-col justify-center items-center text-center">
            <h1 className="font-bold text-3xl sm:text-5xl sm:max-w-xl max-w-xs">
              {featuredBillboard?.label}
            </h1>
          </div>
        </>
      ) : (
        <div className="h-full w-full bg-gray-200 rounded-md flex items-center justify-center">
          <p className="text-gray-500 font-semibold">No featured billboard</p>
        </div>
      )}
    </div>
  )
}
