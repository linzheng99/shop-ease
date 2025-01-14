"use client"

import { Archive } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

import { useGetOrders } from "../api/use-get-orders"

export default function OrderSign() {
  const router = useRouter()
  const { data } = useGetOrders()

  const pendingOrders = data?.filter(order => order.status === 'PENDING').length || 0

  return (
    <Button
      onClick={() => router.push('/order')}
      variant="outline"
      size="icon"
      className="relative bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
    >
      <Archive className="h-4 w-4 shrink-0 opacity-50 text-amber-600 dark:text-white" />
      {
        pendingOrders > 0 && (
          <span className="absolute top-[-5px] right-[-5px] min-w-[20px] h-5 px-1 bg-rose-500 rounded-full text-xs text-white flex items-center justify-center">
            {pendingOrders}
          </span>
        )
      }
    </Button>
  )
}
