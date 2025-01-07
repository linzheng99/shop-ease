import { getSession } from "@/lib/session"

export const getCurrentUser = async () => {
  return await getSession()
}
