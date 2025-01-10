'use client'

import { type Image as ImageType } from '@prisma/client';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useDeleteImage } from '@/features/upload/api/use-delete-image';
import { useUploadImage } from '@/features/upload/api/use-upload-image';
import { cn } from '@/lib/utils';

interface UploadImageProps {
  className?: string;
  onChange: (id: string | null) => void;
  defaultValue?: ImageType;
}

export default function UploadImage({ className, onChange, defaultValue }: UploadImageProps) {
  const [image, setImage] = useState<File | null>(null);
  const [value, setValue] = useState<ImageType | null>(defaultValue || null);
  const imageElementRef = useRef<HTMLInputElement>(null)
  const { mutate: uploadImage } = useUploadImage()
  const { mutate: deleteImage } = useDeleteImage()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file || null);

    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      uploadImage({ json: formData }, {
        onSuccess: (data) => {
          setValue(null)
          setValue(data);
          onChange(data.id);
        }
      });
    } catch (error) {
      console.error('Upload image error:', error);
    }

  };

  const removeImage = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!value) return;

    deleteImage({ id: value.id }, {
      onSuccess: () => {
        setValue(null);
        setImage(null);
        onChange(null);
      },
      onError: (error) => {
        console.error('Delete image error:', error);
      }
    });
  };

  return (
    <div className={cn('w-full relative', className)}>
      <input
        ref={imageElementRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {
        ( !!image || !!value?.url ) && (
          <div className='flex items-center justify-center rounded-md relative group/image h-[180px]'>
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/${value?.url}` || URL.createObjectURL(image || new Blob())}
              alt="image"
              fill
              className='rounded-md object-cover'
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 rounded-full bg-black/70 group-hover/image:flex hover:bg-black text-white items-center justify-center"
            >
              <XIcon className="size-3.5" />
            </button>
          </div>
        )
      }
      {
        !image && !value?.url && (
          <Button type="button" onClick={() => imageElementRef.current?.click()} className="mb-2">
            选择图片
          </Button>
        )
      }
    </div>
  );
}

