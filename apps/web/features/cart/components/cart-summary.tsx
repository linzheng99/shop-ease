import { useEffect, useState } from "react"

import { Separator } from "@/components/ui/separator"

import { type CartItemWithVariant } from "../types"

interface CartSummaryProps {
  data: CartItemWithVariant[]
}

export default function CartSummary({ data }: CartSummaryProps) {
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const total = data.reduce((acc, item) => acc + item.productVariant.product.price * item.quantity, 0)
    setTotal(total)
  }, [data])

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <Separator />
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Total</span>
        <span className="text-xl font-bold">$ {total}</span>
      </div>
    </div>
  )
};

