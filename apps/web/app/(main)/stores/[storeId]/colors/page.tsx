import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";

import { ColorsClient } from "./client";

export default async function ColorsPage() {
  const session = await getSession()
  if (!session) {
    return redirect('/sign-in')
  }
  return <ColorsClient />
}


