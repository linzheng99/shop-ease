
import UserButton from "@/features/auth/components/user-button"
import StoreSign from "@/features/store/components/store-sign"

import Logo from "./logo"
import { ModeToggle } from "./mode-toggle"

export default function Navbar() {

  return (
    <nav className="h-16 pt-4 px-6 flex items-center justify-between">
      <Logo />
      <div className="flex items-center gap-4">
        <StoreSign />
        <ModeToggle />
        <UserButton />
      </div>
    </nav>
  )
}
