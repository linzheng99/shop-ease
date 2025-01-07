import { type CommonResponse } from "@/types";

export type SignInResponseType = CommonResponse<{
  user: {
    email: string;
    name: string;
    role: string;
    id: string;
  }
  accessToken: string;
  refreshToken: string;
}>

export type UserType = {
  id: string;
  name: string;
  email: string;
  hashedRefreshToken: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
