"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { type z } from "zod"

import { Button } from "@/components/ui/button"
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
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

import { useSignup } from "../api/use-signup"
import { signUpSchema } from "../schemas"

export function SignUpForm() {
  const { mutate, isPending } = useSignup()

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    mutate(values)
  }

  return (
    <Card className="w-full md:w-[487px] border-none shadow-none">
      <CardHeader className="p-7 text-center">
        <CardTitle className="text-2xl"> Sign Up </CardTitle>
      </CardHeader>
      <Separator className='px-7 mb-2' />
      <CardContent className='p-7'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
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
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Password" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size='lg' className='w-full' disabled={isPending}>Register</Button>
          </form>
        </Form>
      </CardContent>
      <Separator className='px-7 mb-2' />
      <CardContent className='text-center p-7 text-sm'>
        <p>
          Already have an account?
          <Link href={'/sign-in'} className='text-blue-500 ml-2 hover:underline'>Sign In</Link>
        </p>
      </CardContent>
    </Card>
  )
}

