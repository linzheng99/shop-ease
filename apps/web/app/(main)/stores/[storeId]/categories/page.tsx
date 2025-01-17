import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";

import { CategoriesClient } from "./client";

export default async function CategoriesPage() {
  const session = await getSession()
  if (!session) {
    return redirect('/sign-in')
  }
  return <CategoriesClient />
}
