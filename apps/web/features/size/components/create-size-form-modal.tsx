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
import { useStoreId } from "@/hooks/use-store-id";

import { useCreateSize } from "../api/use-create-size";
import { createSizeSchema } from "../schemas";
import { useSizeModal } from "../store/use-size-modal";

export default function CreateSizeFormModal() {
  const storeId = useStoreId()
  const { isOpen, onClose } = useSizeModal()
  const { mutate: createSize, isPending } = useCreateSize()

  const form = useForm<z.infer<typeof createSizeSchema>>({
    resolver: zodResolver(createSizeSchema),
    defaultValues: {
      name: "",
      storeId,
    },
  })

  function onSubmit(values: z.infer<typeof createSizeSchema>) {
    createSize({ json: values }, {
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
          <CardTitle>Create category for store</CardTitle>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Please enter category name" {...field} />
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
