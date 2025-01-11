import { type Category, type Color, type Image, type Product, type Size } from '@prisma/client'

export type ProductAllType = Product & {
  productVariants:  {
    id: string
    productId: string
    color: Color
    size: Size
    quantity: number
  }[]
  images: Image[]
  category: Category
}

