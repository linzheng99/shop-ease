"use client"

import { type Color } from "@prisma/client"
import { type ColumnDef } from "@tanstack/react-table"
import { format } from 'date-fns'

import { CellAction } from "./cell-action"

export const columns: ColumnDef<Color>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => {
      const color = row.original
      return (
        <div className="flex items-center gap-x-2">
          <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: color.value }} />
          <span>{color.value}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const color = row.original
      return format(color.createdAt, "yyyy/MM/dd")
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const color = row.original
      return <CellAction color={color} />
    },
  }
]

