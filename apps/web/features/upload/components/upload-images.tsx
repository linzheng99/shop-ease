'use client'

import { type Image as ImageType } from '@prisma/client';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useDeleteImage } from '@/features/upload/api/use-delete-image';
import { useUploadImage } from '@/features/upload/api/use-upload-image';
import { cn } from '@/lib/utils';

interface UploadImagesProps {
  className?: string;
  onChange: (id: ImageType[]) => void;
  defaultValue?: ImageType[] | [];
}

export default function UploadImages({ className, onChange, defaultValue }: UploadImagesProps) {
  const [value, setValue] = useState<ImageType[]>(defaultValue || []);
  const imageElementRef = useRef<HTMLInputElement>(null)
  const { mutate: uploadImage } = useUploadImage()
  const { mutate: deleteImage } = useDeleteImage()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      uploadImage({ json: formData }, {
        onSuccess: (data) => {
          setValue([...value, data]);
          onChange([...value, data]);
        }
      });
    } catch (error) {
      console.error('Upload image error:', error);
    }

  };

  const removeImage = (e: React.FormEvent<HTMLButtonElement>, image: ImageType) => {
    e.preventDefault();
    if (!value) return;

    deleteImage({ id: image.id }, {
      onSuccess: () => {
        setValue(value.filter(item => item.id !== image.id));
        onChange(value.filter(item => item.id !== image.id));
      },
      onError: (error) => {
        console.error('Delete image error:', error);
      }
    });
  };

  return (
    <div className={cn('w-full relative space-y-2', className)}>
      <input
        ref={imageElementRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
        {
          value.length > 0 &&
          value.map((image) => (
            <div className='flex items-center justify-center rounded-md relative group/image h-[180px]' key={image.id}>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${image.url}`}
                alt="image"
                fill
                className='rounded-md object-cover'
                unoptimized
              />
              <button
                type="button"
                onClick={(e) => removeImage(e, image)}
                className="absolute -top-1.5 -right-1.5 rounded-full bg-black/70 group-hover/image:flex hover:bg-black text-white items-center justify-center"
              >
                <XIcon className="size-3.5" />
              </button>
            </div>
          ))
        }
      </div>
      <Button type="button" onClick={() => imageElementRef.current?.click()} className="mb-2">
        选择图片
      </Button>
    </div >
  );
}

