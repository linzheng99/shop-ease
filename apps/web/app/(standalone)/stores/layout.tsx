
import Logo from "@/components/logo"
import UserButton from "@/features/auth/components/user-button"
import { getSession } from "@/lib/session"

interface StoresLayoutProps {
  children: React.ReactNode
}

export default async function StoresLayout({ children }: StoresLayoutProps) {
  const session = await getSession()
  return (
    <main className="h-gull">
      <div className="mx-auto w-full max-w-screen-2xl h-16 pt-4 px-6 ">
        <nav className="flex items-center justify-between">
          <Logo />
          <UserButton session={session} />
        </nav>
        <div className="flex flex-col items-center justify-center py-4">
          {children}
        </div>
      </div>
    </main>
  )
}

