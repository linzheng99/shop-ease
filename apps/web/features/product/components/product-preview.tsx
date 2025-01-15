import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { type Image as ImageType } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

interface ProductPreviewProps {
  images: (ImageType[]) | undefined
}

export const ProductPreview = React.memo(({ images }: ProductPreviewProps) => {
  return (
    <TabGroup className="flex flex-col-reverse">
      <div className='mt-6 sm:block lg:max-w-none max-w-2xl'>
        <TabList className='grid grid-cols-4 gap-6'>
          {images?.map((image) => (
            <Tab key={image.id} className="relative flex aspect-square h-full w-full cursor-pointer items-center justify-center rounded-md bg-white text-sm transition-all hover:opacity-75 data-[selected]:ring-2 data-[selected]:ring-offset-2 data-[selected]:ring-black focus:outline-none">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${image.url}`}
                alt={image.url}
                fill
                className="object-cover rounded-md"
              />
            </Tab>
          ))}
        </TabList>
      </div>
      <TabPanels>
        {images?.map((image) => (
          <TabPanel key={image.id}>
            <div className='aspect-square relative h-full w-full sm:rounded-lg overflow-hidden'>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${image.url}`}
                alt={image.url}
                fill
                className="object-cover rounded-md"
              />
            </div>
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  )
})
