import Big from 'big.js';
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from "@/components/ui/button"

import { useRemoveFromCart } from '../api/use-remove-from-cart';
import { useUpdateCartItem } from '../api/use-update-cart-item';
import { type CartItemWithVariant } from "../types"


export default function CartItem({ data }: { data: CartItemWithVariant }) {
  const { productVariant, quantity } = data
  const { product, color, size } = productVariant
  const { name, price, images } = product
  const [localQuantity, setLocalQuantity] = useState(quantity)
  const [total, setTotal] = useState(new Big(price).times(quantity).toFixed(2))

  const { mutate: updateCartItem, isPending } = useUpdateCartItem()
  const { mutate: removeCartItem, isPending: isRemoving } = useRemoveFromCart()

  const isLoading = isPending || isRemoving

  const handleUpdateCartItem = (type: 'increment' | 'decrement') => {
    const newQuantity = type === 'increment' ? localQuantity + 1 : localQuantity - 1;

    if (newQuantity < 1) {
      return toast.info('Minimum quantity is 1');
    }

    setTotal(new Big(price).times(newQuantity).toFixed(2))

    setLocalQuantity(newQuantity);
    updateCartItem({
      params: {
        id: data.id
      },
      json: {
        quantity: newQuantity
      }
    });
  }

  function handleRemoveCartItem() {
    removeCartItem({ params: { id: data.id } })
  }


  return (
    <div className="flex gap-4 border p-4 rounded-md relative flex-col md:flex-row">
      <div className="flex gap-4">
        <div className="relative h-24 w-24 rounded-md md:h-48 md:w-48">
          {images[0]?.url && (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/${images[0]?.url}`}
              alt={name}
              className="object-cover object-center rounded-md"
              fill
            />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="text-lg font-semibold truncate">
              {name}
            </p>
          </div>
          <div className="mt-1 flex text-sm">
            {color && (
              <div className="flex gap-2 items-center">
                <div className="border size-6 rounded-md" style={{ backgroundColor: color?.value }} />
                <p className="text-gray-500">{color?.name}</p>
              </div>
            )}
            {size && (
              <div className="flex gap-2 items-center">
                <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">{size?.name}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:ml-auto gap-2 justify-between">
        <div className="flex gap-2 items-center justify-between">
          <span className="text-lg font-semibold truncate">$ {total}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => handleUpdateCartItem('decrement')} disabled={isLoading}>
              <Minus className="w-4 h-4" />
            </Button>
            <span className="size-9 flex items-center justify-center border rounded-md">{localQuantity}</span>
            <Button variant="outline" size="icon" onClick={() => handleUpdateCartItem('increment')} disabled={isLoading}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <Button variant="destructive" className="w-fit ml-auto" onClick={handleRemoveCartItem} disabled={isLoading}>
          <Trash2 className="w-4 h-4" />
          Remove
        </Button>
      </div>
    </div >
  )
}
