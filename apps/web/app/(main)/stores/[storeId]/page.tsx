import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";

import StoreIdPageClient from "./client";

export default async function StoreIdPage() {
  const session = await getSession()
  if (!session) {
    return redirect('/login')
  }

  return <StoreIdPageClient />;
}
