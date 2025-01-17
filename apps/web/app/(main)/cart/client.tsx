'use client'


import { Trash2 } from "lucide-react"

import PageError from "@/components/page-error"
import PageLoader from "@/components/page-loader"
import { Button } from "@/components/ui/button"
import { useClearCart } from "@/features/cart/api/use-clear-cart"
import { useGetCart } from "@/features/cart/api/use-get-cart"
import CartItem from "@/features/cart/components/cart-item"
import CartSummary from "@/features/cart/components/cart-summary"
import { type CartItemWithVariant } from "@/features/cart/types"
import StripeCheckout from "@/features/stripe/components/stripe-checkout"

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
          {
            items.length > 0 ? (
              items.map((item: CartItemWithVariant) => (
                <CartItem key={item.id} data={item} />
              ))
            ) : (
              <p className="text-neutral-500 text-center text-lg font-semibold">No Items in cart</p>
            )
          }
        </div>
        <div className="mt-8 lg:col-span-4 lg:mt-0 bg-muted-foreground/10 rounded-lg px-4 sm:px-6 lg:px-6 py-4">
          <CartSummary data={items} />
          <StripeCheckout ids={items.map((item: CartItemWithVariant) => item.id)} />
        </div>
      </div>
    </div>
  )
};
