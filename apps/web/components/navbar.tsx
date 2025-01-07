import Link from "next/link"

import UserButton from "@/features/auth/components/user-button"

import Logo from "./logo"
import { ModeToggle } from "./mode-toggle"

export default function Navbar() {
  return (
    <nav className="h-16 pt-4 px-6 flex items-center justify-between">
      <Logo />
      <div className="flex items-center gap-2">
        <Link href="/shops/create">Create Shop</Link>
        <ModeToggle />
        <UserButton />
      </div>
    </nav>
  )
}
