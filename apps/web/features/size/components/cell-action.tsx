import { type Size } from "@prisma/client"
import { MoreHorizontal, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useConfirm } from "@/hooks/use-confirm"
import { useStoreId } from "@/hooks/use-store-id"

import { useDeleteSize } from "../api/use-delete-size"

interface CellActionProps {
  size: Size
}

export function CellAction({ size }: CellActionProps) {
  const storeId = useStoreId()
  const { mutate: deleteSize, isPending } = useDeleteSize()
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure you want to delete this size?',
    'This action cannot be undone.',
    'destructive',
  )


  async function onDelete() {
    const ok = await confirm()
    if (!ok) return

    deleteSize({ params: { storeId, id: size.id } })
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

