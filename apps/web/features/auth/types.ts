import { type CommonResponse } from "@/types";

export type SignInResponseType = CommonResponse<{
  user: {
    email: string;
    name: string;
    id: string;
  }
  accessToken: string;
  refreshToken: string;
}>
