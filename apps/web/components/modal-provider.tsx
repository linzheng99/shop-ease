'use client'

import CreateBillboardFormModal from "@/features/billboard/components/create-billboard-form-modal";
import EditBillboardModal from "@/features/billboard/components/edit-billboard-modal";
import { useBillboardModal } from "@/features/billboard/store/use-billboard-modal";
import CreateCategoryFormModal from "@/features/category/components/create-category-form-modal";
import { useCategoryModal } from "@/features/category/store/use-category-modal";
import CreateColorFormModal from "@/features/color/components/create-color-form-modal";
import { useColorModal } from "@/features/color/store/use-color-modal";
import CreateProductFormModal from "@/features/product/components/create-product-form-modal";
import EditProductModal from "@/features/product/components/edit-product-modal";
import { useProductModal } from "@/features/product/store/use-product-modal";
import CreateSizeFormModal from "@/features/size/components/create-size-form-modal";
import { useSizeModal } from "@/features/size/store/use-size-modal";

export default function ModalProvider() {
  const { isOpen: isOpenBillboard } = useBillboardModal()
  const { isOpen: isOpenCategory } = useCategoryModal()
  const { isOpen: isOpenSize } = useSizeModal()
  const { isOpen: isOpenColor } = useColorModal()
  const { isOpen: isOpenProduct } = useProductModal()
  return (
    <>
      {isOpenBillboard && <CreateBillboardFormModal />}
      <EditBillboardModal />
      <EditProductModal />
      {isOpenCategory && <CreateCategoryFormModal />}
      {isOpenSize && <CreateSizeFormModal />}
      {isOpenColor && <CreateColorFormModal />}
      {isOpenProduct && <CreateProductFormModal />}
    </>
  )
}

