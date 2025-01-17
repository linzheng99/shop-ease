import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";

import BillboardsClient from "./client";

export default async function BillboardsPage() {
  const session = await getSession()
  if (!session) {
    return redirect('/sign-in')
  }

  return <BillboardsClient />
}

