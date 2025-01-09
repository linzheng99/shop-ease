"use client"

import { parseAsString, useQueryState } from 'nuqs';

export default function useEditBillboardModal() {
  const [billboardId, setBillboardId] = useQueryState(
    'edit-billboard',
    parseAsString
  )

  async function open(id: string) {
    await setBillboardId(id)
  }

  async function onClose() {
    await setBillboardId(null)
  }

  return {
    billboardId,
    open,
    onClose,
    setBillboardId,
  }
}
