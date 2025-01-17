
import UserButton from "@/features/auth/components/user-button"
import CartSign from "@/features/cart/components/cart-sign"
import OrderSign from "@/features/order/components/order-sign"
import StoreSign from "@/features/store/components/store-sign"
import { getSession } from "@/lib/session"

import Logo from "./logo"
import { ModeToggle } from "./mode-toggle"

export default async function Navbar() {
  const session = await getSession()

  return (
    <nav className="h-16 pt-4 px-6 flex items-center justify-between">
      <Logo />
      <div className="flex items-center gap-4">
        {session && <StoreSign />}
        {session && <CartSign />}
        {session && <OrderSign />}
        <ModeToggle />
        <UserButton />
      </div>
    </nav>
  )
}
