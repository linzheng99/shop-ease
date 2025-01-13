"use client"

import { parseAsString, useQueryState } from 'nuqs';

export default function useEditProductModal() {
  const [productId, setProductId] = useQueryState(
    'edit-product',
    parseAsString
  )

  async function open(id: string) {
    await setProductId(id)
  }

  async function onClose() {
    await setProductId(null)
  }

  return {
    productId,
    open,
    onClose,
    setProductId,
  }
}
