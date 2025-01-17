import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";

import OrderClient from "./client";

export default async function OrderPage() {
  const session = await getSession()
  if (!session) redirect('/sign-in')

  return (
    <OrderClient />
  )
}
