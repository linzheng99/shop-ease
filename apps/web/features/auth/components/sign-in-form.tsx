"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { FcGoogle } from "react-icons/fc";
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

import { useSignin } from "../api/use-signin"
import { signInSchema } from "../schemas"

export function SignInForm() {
  const { mutate, isPending } = useSignin()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof signInSchema>) {
    mutate({ json: values })
  }

  function handleGoogleLogin() {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/login`;
  }

  return (
    <Card className="w-full md:w-[487px] border-none shadow-none">
      <CardHeader className="p-7 text-center">
        <CardTitle className="text-2xl"> Sign In </CardTitle>
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
            <Button type="submit" size='lg' className='w-full' disabled={isPending}>Sign In</Button>
          </form>
        </Form>
      </CardContent>
      <Separator />
      <div className="flex flex-col gap-y-2.5 px-7 py-5">
        <Button 
          variant="outline" 
          size="lg" 
          className="w-full relative" 
          onClick={() => handleGoogleLogin()} 
          disabled={isPending}
        >
          <FcGoogle className="size-5 absolute left-2.5 top-1/2 -translate-y-1/2" />
          Sign in with Google
        </Button>
      </div>
      <Separator />
      <CardContent className='text-center p-7 text-sm'>
        <p>
          Don't have an account?
          <Link href={'/sign-up'} className='text-blue-500 ml-2 hover:underline'>Sign Up</Link>
        </p>
      </CardContent>
    </Card>
  )
}

