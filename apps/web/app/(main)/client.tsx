'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import PageLoader from '@/components/page-loader'
import { Button } from '@/components/ui/button'
import ProductInfo from '@/features/product/components/product-info'
import { useGetStores } from '@/features/store/api/use-get-stores'

export default function Client() {
  const router = useRouter()
  const { data, isLoading } = useGetStores()

  if (isLoading) return <PageLoader />

  return (
    <div className="flex flex-col gap-6">
      {
        data?.length === 0 ? (
          <div className='w-full flex flex-col gap-4'>
            <h1 className='text-2xl font-bold'>No stores found</h1>
            <p className='text-gray-500'>There are no stores available at the moment.</p>
          </div>
        ) : (
          data?.slice(0, 3).map((store) => (
            <div key={store.id} className="w-full grid grid-cols-4 gap-4 border p-4 rounded-lg">
              <div className='w-full flex flex-col gap-4 col-span-2'>
                <div className='flex justify-between items-center'>
                  <h1 className='text-2xl font-bold'>{store.name}</h1>
                  <Button onClick={() => router.push(`/stores/${store.id}`)} variant='amber' size='sm'>View Store</Button>
                </div>
                <p className='text-gray-500'>{store.description}</p>
              </div>
              <div className='w-full flex items-center justify-center col-span-2'>
                {store.billboards?.length && store.billboards?.length > 0 ? (
                  <div className='relative w-full min-h-[300px]'>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${store.billboards?.[0]?.image.url}`}
                      alt={store.name} fill className='rounded-md aspect-square' />
                  </div>
                ) : (
                  <div className='w-full min-h-[300px] bg-gray-200 rounded-md flex items-center justify-center'>
                    <p className='text-gray-500'>This store has no billboards</p>
                  </div>
                )}
              </div>
              <div className='w-full flex gap-4 col-span-4'>
                {store.products?.slice(0, 4).map((product) => (
                  <ProductInfo key={product.id} product={product} onClick={() => router.push(`/stores/${store.id}/products/${product.id}`)} />
                ))}
              </div>
            </div>
          ))
        )}
    </div>
  )
}

