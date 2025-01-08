"use client"

import { Store } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

export default function StoreSign() {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.push('/stores')}
      variant="outline"
      size="icon"
      className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
    >
      <Store className="h-4 w-4 shrink-0 opacity-50 text-amber-600 dark:text-white" />
    </Button>
  )
}
