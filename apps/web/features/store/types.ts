import { type ProductAllType } from "../product/types";

export type StoreType = {
  id: string;
  name: string;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type StoreWithProducts = StoreType & {
  products: ProductAllType[];
}
