import {PlusIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function StoreActions({ storeId }: { storeId: string }) {
  const actions = [
    {
      label: 'Billboards',
      icon: PlusIcon,
      href: `/stores/${storeId}/billboards`,
    },
    {
      label: 'Categories',
      icon: PlusIcon,
      href: `/stores/${storeId}/categories`,
    },
    {
      label: 'Colors',
      icon: PlusIcon,
      href: `/stores/${storeId}/colors`,
    },
    {
      label: 'Sizes',
      icon: PlusIcon,
      href: `/stores/${storeId}/sizes`,
    },
    {
      label: 'Products',
      icon: PlusIcon,
      href: `/stores/${storeId}/products`,
    },
  ]

  return (
    <div className="flex items-center lg:justify-end gap-2 overflow-x-auto scrollbar-hide w-full">
      {actions.map((action) => (
        <Button variant="outline" size="sm" key={action.label} asChild>
          <Link href={action.href} className="flex items-center gap-2">
            <action.icon className="w-4 h-4" />
            <span>{action.label}</span>
          </Link>
        </Button>
      ))}
    </div>
  )
}
