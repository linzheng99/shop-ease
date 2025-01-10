"use client"

import { type Category } from "@prisma/client"
import { type ColumnDef } from "@tanstack/react-table"
import { format } from 'date-fns'

import { CellAction } from "./cell-action"

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const category = row.original
      return format(category.createdAt, "yyyy/MM/dd")
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const category = row.original
      return <CellAction category={category} />
    },
  }
]
