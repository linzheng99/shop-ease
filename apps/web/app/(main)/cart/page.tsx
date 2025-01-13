import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";

import CartClient from "./client";

export default async function Cart() {
  const session = await getSession()
  if (!session) redirect('/sign-in')

  return <CartClient />
};
