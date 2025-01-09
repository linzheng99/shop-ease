import { type Billboard, type Image } from "@prisma/client"

export type BillboardWithImageType = Billboard & {
  image: Image
}
