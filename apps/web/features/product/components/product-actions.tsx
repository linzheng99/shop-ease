
import { MoreVertical } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

import { useDeleteProduct } from "../api/use-delete-product"
import useEditProductModal from "../hooks/use-edit-product-modal"
import { type ProductAllType } from "../types"


interface ProductActionsProps {
  product: ProductAllType
  className?: string
}

export default function ProductActions({ className, product }: ProductActionsProps) {
  const { mutate: deleteProduct } = useDeleteProduct()
  const { open } = useEditProductModal()

  async function handleEdit(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    await open(product.id)
  }

  function handleDelete(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()

    deleteProduct({ params: { productId: product.id, storeId: product.storeId } })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn("hover:bg-transparent hover:text-amber-600", className)}>
        <Button className="h-8 w-8 p-0" variant="ghost">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={(e) => handleEdit(e)}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => handleDelete(e)}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}
