"use client"

import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { useAddToCart } from "@/features/cart/api/use-add-to-cart"
import { type Session } from "@/lib/session"
import { cn } from "@/lib/utils"

import useSelectProductModal from "../hooks/use-select-product-modal"
import { type ProductVariantType } from "../types"

interface VariantSelectorProps {
  productVariants: ProductVariantType[]
  productId: string
  session: Session | null
}
export default function VariantSelector({ productVariants, productId, session }: VariantSelectorProps) {
  const { isSelect, changeSelect } = useSelectProductModal()
  const { mutate: addToCart, isPending } = useAddToCart()
  const [availableColors, setAvailableColors] = useState<Set<string | null>>(new Set())
  const [availableSizes, setAvailableSizes] = useState<Set<string | null>>(new Set())

  const { colors, sizes, hasColors, hasSizes } = useMemo(() => {
    const colors = Array.from(
      new Map(
        productVariants
          .filter(variant => !!variant.colorId)
          .map(v => [v.colorId, v.color])
      ).values()
    )

    const sizes = Array.from(
      new Map(
        productVariants
          .filter(variant => !!variant.sizeId)
          .map(v => [v.sizeId, v.size])
      ).values()
    )

    return {
      colors,
      sizes,
      hasColors: colors.length > 0,
      hasSizes: sizes.length > 0
    }
  }, [productVariants])

  // Update available variants based on selection
  const updateAvailableVariants = (type: 'color' | 'size', id: string) => {
    if (type === 'color') {
      updateAvailableSizes(id)
    } else {
      updateAvailableColors(id)
    }
  }

  function updateAvailableColors(id: string) {
    const availableColors = new Set(productVariants.filter(variant => variant.sizeId === id).map(variant => variant.colorId))
    setAvailableColors(availableColors)
  }

  function updateAvailableSizes(id: string) {
    const availableSizes = new Set(productVariants.filter(variant => variant.colorId === id).map(variant => variant.sizeId))
    setAvailableSizes(availableSizes)
  }

  // Handle variant selection
  async function handleSelect(type: 'color' | 'size', id: string) {
    const isAvailable = type === 'color' ? availableColors.has(id) : availableSizes.has(id)

    if (!isAvailable) return
    await changeSelect(type, id)
  }

  const handleAddToCart = () => {
    if (!session) {
      return toast.error('Please sign in to add to cart')
    }
    let variant: ProductVariantType | undefined

    if (!hasColors && !hasSizes) {
      // Case 1: No specifications, just add the first variant
      variant = productVariants[0]
    } else if (hasColors && !hasSizes) {
      // Case 2: Only color specification
      variant = productVariants.find(v => v.colorId === isSelect.color)
    } else if (!hasColors && hasSizes) {
      // Case 2: Only size specification
      variant = productVariants.find(v => v.sizeId === isSelect.size)
    } else {
      // Case 3: Both color and size specifications
      variant = productVariants.find(v => v.colorId === isSelect.color && v.sizeId === isSelect.size)
    }

    if (!variant) {
      if (hasColors && hasSizes) {
        return toast.error('Please select both color and size')
      } else if (hasColors) {
        return toast.error('Please select a color')
      } else if (hasSizes) {
        return toast.error('Please select a size')
      }
      return toast.error('No available variant')
    }

    const json = {
      productId,
      productVariantId: variant.id,
      quantity: 1
    }
    addToCart({ json })
  }

  // Initialize available variants
  useEffect(() => {
    setAvailableColors(new Set(colors.map(color => color.id)))
    setAvailableSizes(new Set(sizes.map(size => size.id)))
  }, [])

  // Update available variants when selection changes
  useEffect(() => {
    const { color, size } = isSelect
    if (color) {
      updateAvailableVariants('color', color)
    } else {
      setAvailableSizes(new Set(sizes.map(size => size.id)))
    }
    if (size) {
      updateAvailableVariants('size', size)
    } else {
      setAvailableColors(new Set(colors.map(color => color.id)))
    }
  }, [isSelect.color, isSelect.size])

  return (
    <>
      {
        colors.length > 0 && (
          <div className="flex flex-col space-y-2">
            <span className="font-semibold">Color</span>
            <div className="flex gap-2">
              {
                colors.map(color => (
                  <button
                    key={color.id}
                    className={cn(
                      `border size-12 rounded-md cursor-pointer hover:shadow-md transition-all duration-300`,
                      isSelect.color === color.id && 'border-amber-500',
                      !availableColors.has(color.id) && 'opacity-50 cursor-not-allowed'
                    )}
                    style={{ backgroundColor: color.value }}
                    onClick={() => handleSelect('color', color.id)}>
                  </button>
                ))
              }
            </div>
          </div>
        )
      }
      {
        sizes.length > 0 && (
          <div className="flex flex-col space-y-2">
            <span className="font-semibold">Size</span>
            <div className="flex gap-2">
              {
                sizes.map(size => (
                  <button
                    className={cn(
                      `border size-12 rounded-md flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-all duration-300`,
                      isSelect.size === size.id && 'border-amber-500',
                      !availableSizes.has(size.id) && 'opacity-50 cursor-not-allowed'
                    )}
                    key={size.id}
                    onClick={() => handleSelect('size', size.id)}
                  >
                    <span>{size.name}</span>
                  </button>
                ))
              }
            </div>
          </div>
        )
      }
      <Button
        onClick={handleAddToCart}
        variant="amber"
        className="rounded-full mt-auto ml-auto px-10"
        disabled={isPending}
      >
        {isPending ? 'Adding...' : 'Add to Cart'}
      </Button>
    </>
  )
}
