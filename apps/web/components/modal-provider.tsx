'use client'

import CreateBillboardFormModal from "@/features/billboard/components/create-billboard-form-modal";
import EditBillboardModal from "@/features/billboard/components/edit-billboard-modal";
import { useBillboardModal } from "@/features/billboard/store/use-billboard-modal";

export default function ModalProvider() {
  const { isOpen } = useBillboardModal()
  return (
    <>
      {isOpen && <CreateBillboardFormModal />}
      <EditBillboardModal />
    </>
  )
}

