"use client";


import { Loader } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import { useGetProduct } from "../api/use-get-product";
import EditProductForm from "./edit-product-form";

interface EditProductFormWrapperProps {
  id: string
  onClose: () => Promise<void>
}

export default function EditProductFormWrapper({ id, onClose }: EditProductFormWrapperProps) {
  const { data: product, isLoading } = useGetProduct(id)

  if (isLoading) {
    return (
      <Card className='w-full h-[414px] border-none shadow-none'>
        <CardContent className="flex justify-center items-center h-full">
          <Loader className='size-5 animate-spin text-muted-foreground' />
        </CardContent>
      </Card>
    )
  }

  if (!product) return null

  return (
    <EditProductForm defaultValues={product} onClose={onClose} />
  )
}
