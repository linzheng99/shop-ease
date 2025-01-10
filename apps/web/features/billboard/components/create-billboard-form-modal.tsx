"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Separator } from "@/components/ui/separator"
import UploadImage from "@/features/upload/components/upload-image"
import { useStoreId } from "@/hooks/use-store-id";

import { useCreateBillboard } from "../api/use-create-billboard";
import { createBillboardSchema } from "../schemas";
import { useBillboardModal } from "../store/use-billboard-modal";

export default function CreateBillboardFormModal() {
  const storeId = useStoreId()
  const { isOpen, onClose } = useBillboardModal()
  const { mutate: createBillboard, isPending } = useCreateBillboard()

  const form = useForm<z.infer<typeof createBillboardSchema>>({
    resolver: zodResolver(createBillboardSchema),
    defaultValues: {
      label: "",
      imageId: "",
      storeId,
    },
  })

  function onSubmit(values: z.infer<typeof createBillboardSchema>) {
    createBillboard({ json: values }, {
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
          <CardTitle>Create billboard for store</CardTitle>
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
                      <UploadImage onChange={field.onChange} />
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
    </ResponsiveModal>
  )
}
