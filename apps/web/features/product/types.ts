import { type Category, type Color, type Image, type Product, type ProductVariant, type Size } from '@prisma/client'

export type ProductAllType = Product & {
  productVariants: ProductVariantType[]
  images: Image[]
  category: Category
}

export type ProductVariantType = ProductVariant & {
  color: Color
  size: Size
}

