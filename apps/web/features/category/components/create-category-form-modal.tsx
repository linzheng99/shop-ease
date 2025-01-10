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

import { useCreateCategory } from "../api/use-create-category";
import { createCategorySchema } from "../schemas";
import { useCategoryModal } from "../store/use-category-modal";

export default function CreateCategoryFormModal() {
  const storeId = useStoreId()
  const { isOpen, onClose } = useCategoryModal()
  const { mutate: createCategory, isPending } = useCreateCategory()

  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      storeId,
    },
  })

  function onSubmit(values: z.infer<typeof createCategorySchema>) {
    createCategory({ json: values }, {
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
