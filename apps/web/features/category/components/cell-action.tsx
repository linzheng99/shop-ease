import { type Category } from "@prisma/client"
import { MoreHorizontal, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useConfirm } from "@/hooks/use-confirm"
import { useStoreId } from "@/hooks/use-store-id"

import { useDeleteCategory } from "../api/use-delete-category"

interface CellActionProps {
  category: Category
}

export function CellAction({ category }: CellActionProps) {
  const storeId = useStoreId()
  const { mutate: deleteCategory, isPending } = useDeleteCategory()
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure you want to delete this category?',
    'This action cannot be undone.',
    'destructive',
  )


  async function onDelete() {
    const ok = await confirm()
    if (!ok) return

    deleteCategory({ params: { storeId, id: category.id } })
  }

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-8 w-8 p-0" variant="ghost">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete} disabled={isPending}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

