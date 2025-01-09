"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

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
import { Separator } from "@/components/ui/separator"
import UploadImage from "@/components/upload-image";

import { useEditBillboard } from "../api/use-edit-billboard";
import { editBillboardSchema } from "../schemas";
import { type BillboardWithImageType } from "../types";

interface EditBillboardFormProps {
  onClose: () => Promise<void>
  billboard: BillboardWithImageType
}

export default function EditBillboardForm({ onClose, billboard }: EditBillboardFormProps) {
  const { mutate: editBillboard, isPending } = useEditBillboard()

  const form = useForm<z.infer<typeof editBillboardSchema>>({
    resolver: zodResolver(editBillboardSchema),
    defaultValues: billboard,
  })

  function onSubmit(values: z.infer<typeof editBillboardSchema>) {
    editBillboard({ json: values, params: { id: billboard.id } }, {
      onSuccess: async () => {
        form.reset()
        await onClose()
      }
    })
  }

  async function onCancel() {
    form.reset()
    await onClose()
  }

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>Update billboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Separator className="mb-4" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input placeholder="Please enter billboard label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <UploadImage onChange={field.onChange} defaultValue={billboard?.image} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>Cancel</Button>
              <Button type="submit" disabled={isPending}>Create</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
