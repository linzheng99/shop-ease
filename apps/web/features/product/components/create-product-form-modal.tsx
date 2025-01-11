"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Image } from '@prisma/client'
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { type z } from "zod";

import ResponsiveModal from "@/components/responsive-modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetCategories } from "@/features/category/api/use-get-categories";
import { useGetColors } from "@/features/color/api/use-get-colors";
import { useGetSizes } from "@/features/size/api/use-get-sizes";
import UploadImages from "@/features/upload/components/upload-images";
import { useStoreId } from "@/hooks/use-store-id";

import { useCreateProduct } from "../api/use-create-product";
import { createProductSchema } from "../schemas";
import { useProductModal } from "../store/use-product-modal";

export default function CreateProductFormModal() {
  const storeId = useStoreId()
  const { isOpen, onClose } = useProductModal()
  const { mutate: createProduct, isPending } = useCreateProduct()
  const { data: categories } = useGetCategories(storeId)
  const { data: sizes } = useGetSizes(storeId)
  const { data: colors } = useGetColors(storeId)
  const [images, setImages] = useState<Image[]>([])

  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      storeId,
      name: "",
      description: "",
      categoryId: "",
      price: 0,
      images: [],
      productVariants: [
        {
          colorId: "",
          sizeId: "",
          quantity: 0,
        }
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "productVariants"
  });

  function handleImagesChange(images: Image[]) {
    setImages(images)
    form.setValue('images', images.map(image => ({ id: image.id, url: image.url, name: image.name })))
  }


  function onSubmit(values: z.infer<typeof createProductSchema>) {
    createProduct({ json: values }, {
      onSuccess: () => {
        form.reset()
        onClose()
      }
    })
  }

  function onCancel() {
    form.reset()
    onClose()
  }

  return (
    <ResponsiveModal open={isOpen} onOpenChange={onCancel}>
      <Card className="border-none">
        <CardHeader>
          <CardTitle>Create product for store</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="images"
                render={() => (
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <UploadImages
                        className="mb-2"
                        onChange={handleImagesChange}
                        defaultValue={images}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Please enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Please enter product description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Please enter product price"
                        {...field}
                        onChange={e => e.target.value ? field.onChange(e.target.valueAsNumber) : field.onChange(0)}
                        onFocus={e => {
                          if (field.value === 0) {
                            e.target.select()
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Product Variants</h3>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ colorId: "", sizeId: "", quantity: 0 })}
                  >
                    Add Variant
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="space-y-4 p-4 border rounded-md">
                      <FormField
                        control={form.control}
                        name={`productVariants.${index}.colorId`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Color</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select Color" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {colors?.map((color) => (
                                  <SelectItem key={color.id} value={color.id}>
                                    <div className="flex items-center gap-2">
                                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color.value }}></div>
                                      {color.name}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`productVariants.${index}.sizeId`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Size</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select Size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {sizes?.map((size) => (
                                  <SelectItem key={size.id} value={size.id}>
                                    {size.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`productVariants.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter quantity"
                                {...field}
                                onChange={e => e.target.value ? field.onChange(e.target.valueAsNumber) : field.onChange(0)}
                                onFocus={e => {
                                  if (field.value === 0) {
                                    e.target.select()
                                  }
                                }} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => remove(index)}
                        >
                          Remove Variant
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>Cancel</Button>
                <Button type="submit" disabled={isPending}>Create</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </ResponsiveModal>
  )
}
