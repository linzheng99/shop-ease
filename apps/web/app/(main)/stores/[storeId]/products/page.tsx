import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";

import ProductsClient from "./client";

export default async function ProductsPage() {
  const session = await getSession()
  if (!session) {
    return redirect('/sign-in')
  }

  return <ProductsClient />;
}

