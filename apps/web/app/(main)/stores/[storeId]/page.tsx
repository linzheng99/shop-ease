import { getSession } from "@/lib/session";

import StoreIdPageClient from "./client";

export default async function StoreIdPage() {
  const session = await getSession()

  return <StoreIdPageClient session={session} />;
}
