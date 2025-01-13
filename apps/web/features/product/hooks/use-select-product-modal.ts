"use client"

import { parseAsString, useQueryStates } from 'nuqs';

export default function useSelectProductModal() {
  const [isSelect, setIsSelect] = useQueryStates({
    'size': parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
    'color': parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  })

  async function open() {
    await setIsSelect({ 'size': '', 'color': '' })
  }

  async function close() {
    await setIsSelect({ 'size': '', 'color': '' })
  }

  async function changeSelect(key: 'size' | 'color', value: string) {
    const { size, color } = isSelect
    if (size && size === value) {
      await setIsSelect({ 'size': '', 'color': color })
    } else if (color && color === value) {
      await setIsSelect({ 'size': size, 'color': '' })
    } else {
      await setIsSelect({ [key]: value })
    }
  }

  return {
    isSelect,
    open,
    close,
    setIsSelect,
    changeSelect
  }
}
