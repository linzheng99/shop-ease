import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

import { createSession } from "@/lib/session";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const userId = searchParams.get("userId");
  const name = searchParams.get("name");
  const email = searchParams.get("email");

  if (
    !accessToken ||
    !refreshToken ||
    !userId ||
    !name ||
    !email
  )
    throw new Error("Google Ouath Failed!");

  await createSession({
    user: {
      id: userId,
      name: name,
      email: email,
    },
    accessToken,
    refreshToken,
  });

  redirect("/");
}
