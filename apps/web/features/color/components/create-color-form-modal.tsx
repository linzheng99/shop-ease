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

import { useCreateColor } from "../api/use-create-color";
import { createColorSchema } from "../schemas";
import { useColorModal } from "../store/use-color-modal";

export default function CreateColorFormModal() {
  const storeId = useStoreId()
  const { isOpen, onClose } = useColorModal()
  const { mutate: createColor, isPending } = useCreateColor()

  const form = useForm<z.infer<typeof createColorSchema>>({
    resolver: zodResolver(createColorSchema),
    defaultValues: {
      name: "",
      value: "",
      storeId,
    },
  })

  function onSubmit(values: z.infer<typeof createColorSchema>) {
    createColor({ json: values }, {
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
          <CardTitle>Create color for store</CardTitle>
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
                      <Input placeholder="Please enter color name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-x-4">
                        <Input placeholder="#000000" {...field} disabled={isPending} />
                        <div className="flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: field.value }} />
                        </div>
                      </div>
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
