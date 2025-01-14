import { type Order } from "@prisma/client"
import { HandCoins, MoreHorizontal, Trash } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useConfirm } from "@/hooks/use-confirm"

import { useDeleteOrder } from "../api/use-delete-order"


interface CellActionProps {
  order: Order
}

export function CellAction({ order }: CellActionProps) {
  const { mutate: deleteOrder, isPending } = useDeleteOrder()
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure you want to delete this order?',
    'This action cannot be undone.',
    'destructive',
  )


  async function onDelete() {
    const ok = await confirm()
    if (!ok) return

    deleteOrder({ params: { id: order.id } })
  }

  function onPay(url: string | null) {
    if (!url) return toast.error('No payment URL found')

    window.location.href = url
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
          <DropdownMenuItem onClick={() => onPay(order.paymentUrl)} disabled={isPending || !order.paymentUrl}>
            <HandCoins className="mr-2 h-4 w-4" />
            Pay
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

