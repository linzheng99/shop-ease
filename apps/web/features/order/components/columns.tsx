"use client"

import { type Order } from "@prisma/client"
import { type ColumnDef } from "@tanstack/react-table"
import { format } from 'date-fns'

import { Badge } from "@/components/ui/badge"

import { CellAction } from "./cell-action"

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const order = row.original
      return <Badge variant={order.status === "DELIVERED" ? "success" : "default"}>{order.status}</Badge>
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const order = row.original
      return format(order.createdAt, "yyyy/MM/dd")
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const order = row.original
      return <CellAction order={order} />
    },
  }
]

