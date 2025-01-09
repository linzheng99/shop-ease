"use client"

import ResponsiveModal from "@/components/responsive-modal";

import useEditBillboardModal from "../hooks/use-edit-billboard-modal";
import EditBillboardFormWrapper from "./edit-billboard-form-wrapper";


export default function EditBillboardModal() {
  const { billboardId, onClose } = useEditBillboardModal()

  return (
    <ResponsiveModal open={!!billboardId} onOpenChange={onClose}>
      {billboardId && (
        <EditBillboardFormWrapper id={billboardId} onClose={onClose} />
      )}
    </ResponsiveModal>
  )
}
