import { type NextRequest, NextResponse } from "next/server"

import { getSession } from "./lib/session"

export default async function middleware(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl))
  }

  return NextResponse.next()
}

// TODO
export const config = {
  matcher: ['/profile'],
}
