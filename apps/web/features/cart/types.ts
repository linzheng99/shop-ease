import { type Cart, type CartItem, type Color, type Image, type Product, type ProductVariant, type Size } from '@prisma/client'

export type CartItemWithVariant = CartItem & {
  productVariant: ProductVariant & {
    product: Product & {
      images: Image[]
    }
    size: Size | null
    color: Color | null
  }
}

export type CartWithVariant = Cart & {
  items: CartItemWithVariant[]
}
