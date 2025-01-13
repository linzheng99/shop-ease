"use client"

import ResponsiveModal from "@/components/responsive-modal";

import useEditProductModal from "../hooks/use-edit-product-modal";
import EditProductFormWrapper from "./edit-product-form-wrapper";


export default function EditProductModal() {
  const { productId, onClose } = useEditProductModal()

  return (
    <ResponsiveModal open={!!productId} onOpenChange={onClose}>
      {productId && (
        <EditProductFormWrapper id={productId} onClose={onClose} />
      )}
    </ResponsiveModal>
  )
}
