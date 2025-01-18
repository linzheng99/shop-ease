"use client"

import { type Billboard, type Image as ImageType } from "@prisma/client"
import { PencilIcon, TrashIcon } from "lucide-react"
import Image from "next/image"
import { CiStar } from "react-icons/ci"
import { FaStar } from "react-icons/fa"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useDeleteBillboard } from "../api/use-delete-billboard"
import { useToggleFeaturedBillboard } from "../api/use-toggle-feature-billboard"
import useEditBillboardModal from "../hooks/use-edit-billboard-modal"

interface BillboardCardProps {
  billboard: Billboard & { image: ImageType }
}

export default function BillboardCard({ billboard }: BillboardCardProps) {
  const { open } = useEditBillboardModal()
  const { mutate: deleteBillboard } = useDeleteBillboard()
  const { mutate: toggleFeaturedBillboard } = useToggleFeaturedBillboard()

  function handleDeleteBillboard() {
    deleteBillboard({ params: { id: billboard.id } })
  }

  function handleToggleFeaturedBillboard() {
    toggleFeaturedBillboard({ params: { id: billboard.id } })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between">
          {billboard.label}
          <div className="flex items-center gap-2">
            {
              billboard.isFeatured ? (
                <Button variant="outline" size="icon" onClick={handleToggleFeaturedBillboard}>
                  <FaStar className="w-4 h-4 text-amber-500" />
                </Button>
              ) : (
                <Button variant="outline" size="icon" onClick={handleToggleFeaturedBillboard}>
                  <CiStar className="w-4 h-4" />
                </Button>
              )
            }
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
            unoptimized
          />
        </div>
      </CardContent>
    </Card >
  )
}
