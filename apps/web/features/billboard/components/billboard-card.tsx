"use client"

import { type Billboard, type Image as ImageType } from "@prisma/client"
import { PencilIcon, TrashIcon } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useDeleteBillboard } from "../api/use-delete-billboard"
import useEditBillboardModal from "../hooks/use-edit-billboard-modal"

interface BillboardCardProps {
  billboard: Billboard & { image: ImageType }
}

export default function BillboardCard({ billboard }: BillboardCardProps) {
  const { open } = useEditBillboardModal()
  const { mutate: deleteBillboard } = useDeleteBillboard()

  function handleDeleteBillboard() {
    deleteBillboard({ params: { id: billboard.id } })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between">
          {billboard.label}
          <div className="flex items-center gap-2">
            <Button variant="default" size="icon" onClick={() => open(billboard.id)}>
              <PencilIcon className="w-4 h-4" />
            </Button>
            <Button variant="destructive" size="icon" onClick={handleDeleteBillboard}>
              <TrashIcon className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[300px] w-full rounded-md overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${billboard.image.url}`}
            alt={billboard.label}
            fill
            className="object-cover rounded-md"
          />
        </div>
      </CardContent>
    </Card>
  )
}
