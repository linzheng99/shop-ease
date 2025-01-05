import apiClient from "@/lib/apiClient";

import { type SignInResponseType } from "./types";

export async function generateNewToken(oldRefreshToken: string) {
  const response = await apiClient.post<SignInResponseType>(`/auth/refresh`, { refresh: oldRefreshToken })
  return response.data
}
