"use client";


import { Loader } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import { useGetBillboard } from "../api/use-get-billboard";
import EditBillboardForm from "./edit-billboard-form";

interface EditBillboardFormWrapperProps {
  id: string
  onClose: () => Promise<void>
}

export default function EditBillboardFormWrapper({ id, onClose }: EditBillboardFormWrapperProps) {
  const { data: billboard, isLoading } = useGetBillboard(id)

  if (isLoading) {
    return (
      <Card className='w-full h-[414px] border-none shadow-none'>
        <CardContent className="flex justify-center items-center h-full">
          <Loader className='size-5 animate-spin text-muted-foreground' />
        </CardContent>
      </Card>
    )
  }

  if (!billboard) return null

  return (
    <EditBillboardForm defaultValues={billboard} onClose={onClose} />
  )
}
