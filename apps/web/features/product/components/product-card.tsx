

import { type ProductAllType } from "../types";
import ProductActions from "./product-actions";
import ProductInfo from "./product-info";

interface ProductCardProps {
  product: ProductAllType;
  onClick?: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {

  return (
    <div className="relative">
      <ProductInfo product={product} onClick={onClick} />
      <ProductActions product={product} className="absolute left-0 top-0" />
    </div>
  )
};
