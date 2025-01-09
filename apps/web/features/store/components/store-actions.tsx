import {PlusIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function StoreActions({ storeId }: { storeId: string }) {
  const actions = [
    {
      label: 'Add Product',
      icon: PlusIcon,
      href: `/stores/${storeId}/products/create`,
    },
    {
      label: 'Billboards',
      icon: PlusIcon,
      href: `/stores/${storeId}/billboards`,
    },
    {
      label: 'Add Category',
      icon: PlusIcon,
      href: `/stores/${storeId}/categories/create`,
    },
    {
      label: 'Add Color',
      icon: PlusIcon,
      href: `/stores/${storeId}/colors/create`,
    },
    {
      label: 'Add Size',
      icon: PlusIcon,
      href: `/stores/${storeId}/sizes/create`,
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
