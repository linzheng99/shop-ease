'use client'

import CreateBillboardFormModal from "@/features/billboard/components/create-billboard-form-modal";
import EditBillboardModal from "@/features/billboard/components/edit-billboard-modal";
import { useBillboardModal } from "@/features/billboard/store/use-billboard-modal";
import CreateCategoryFormModal from "@/features/category/components/create-category-form-modal";
import { useCategoryModal } from "@/features/category/store/use-category-modal";

export default function ModalProvider() {
  const { isOpen: isOpenBillboard } = useBillboardModal()
  const { isOpen: isOpenCategory } = useCategoryModal()
  return (
    <>
      {isOpenBillboard && <CreateBillboardFormModal />}
      <EditBillboardModal />
      {isOpenCategory && <CreateCategoryFormModal />}
    </>
  )
}

