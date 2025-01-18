import { getSession } from "@/lib/session"

import ProductIdClient from "./client"

export default async function ProductIdPage() {
  const session = await getSession()

  return <ProductIdClient session={session} />
}
