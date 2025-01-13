"use client"

import { ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

import { useGetCart } from "../api/use-get-cart"

export default function CartSign() {
  const router = useRouter()
  const { data } = useGetCart()


  return (
    <Button
      onClick={() => router.push('/cart')}
      variant="outline"
      size="icon"
      className="relative bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
    >
      <ShoppingCart className="h-4 w-4 shrink-0 opacity-50 text-amber-600 dark:text-white" />
      {
        data && data.items.length > 0 && (
          <span className="absolute top-[-5px] right-[-5px] min-w-[20px] h-5 px-1 bg-rose-500 rounded-full text-xs text-white flex items-center justify-center">
            {data.items.length}
          </span>
        )
      }
    </Button>
  )
}
