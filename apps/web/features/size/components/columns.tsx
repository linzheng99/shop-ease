"use client"

import { type Size } from "@prisma/client"
import { type ColumnDef } from "@tanstack/react-table"
import { format } from 'date-fns'

import { CellAction } from "./cell-action"

export const columns: ColumnDef<Size>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const size = row.original
      return format(size.createdAt, "yyyy/MM/dd")
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const size = row.original
      return <CellAction size={size} />
    },
  }
]

