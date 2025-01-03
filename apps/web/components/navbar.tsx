import Link from "next/link"

import UserButton from "@/features/auth/components/user-button"

export default function Navbar() {
  return (
    <nav className="h-16 pt-4 px-6 flex items-center justify-between">
      <div className="hidden lg:flex flex-col">
        <h1 className="text-2xl font-semibold">Nest</h1>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/profile">Profile</Link>
        <UserButton />
      </div>
    </nav>
  )
}
