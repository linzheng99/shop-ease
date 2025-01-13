'use client'


import { Trash2 } from "lucide-react"

import PageError from "@/components/page-error"
import PageLoader from "@/components/page-loader"
import { Button } from "@/components/ui/button"
import { useClearCart } from "@/features/cart/api/use-clear-cart"
import { useGetCart } from "@/features/cart/api/use-get-cart"
import CartItem from "@/features/cart/components/cart-item"
import CartSummary from "@/features/cart/components/cart-summary"

export default function CartClient() {
  const { data, isLoading } = useGetCart()
  const { mutate: clearCart, isPending } = useClearCart()

  if (isLoading) return <PageLoader />
  if (!data) return <PageError />

  const { items } = data

  return (
    <div className="h-full">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl">Shopping Cart</h1>
        <Button variant="destructive" onClick={() => clearCart()} disabled={items.length === 0 || isPending}>
          <Trash2 className="w-4 h-4" />
          {isPending ? 'Clearing...' : 'Clear Cart'}
        </Button>
      </div>
      <div className="mt-8 lg:grid lg:grid-cols-12 lg:items-start gap-x-8 gap-y-4">
        <div className="lg:col-span-8 flex flex-col gap-4">
          {items.length === 0 && <p className="text-neutral-500 text-center text-lg font-semibold">No Items in cart</p>}
          {items?.map((item) => (
            <CartItem key={item.id} data={item} />
          ))}
        </div>
        <div className="mt-8 lg:col-span-4 lg:mt-0 bg-gray-50 rounded-lg px-4 sm:px-6 lg:px-6 py-4">
          <CartSummary data={items} />
          <Button className="w-full mt-4">Checkout</Button>
        </div>
      </div>
    </div>
  )
};