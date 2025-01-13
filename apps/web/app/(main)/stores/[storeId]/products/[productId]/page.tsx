import { redirect } from "next/navigation"

import { getSession } from "@/lib/session"

import ProductIdClient from "./client"

export default async function ProductIdPage() {
  const session = await getSession()
  if (!session) {
    return redirect('/login')
  }

  return <ProductIdClient />
}
