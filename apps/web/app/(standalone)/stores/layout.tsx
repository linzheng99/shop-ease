
import Logo from "@/components/logo"
import UserButton from "@/features/auth/components/user-button"

interface StoresLayoutProps {
  children: React.ReactNode
}

export default function StoresLayout({ children }: StoresLayoutProps) {
  return (
    <main className="h-gull">
      <div className="mx-auto w-full max-w-screen-2xl h-16 pt-4 px-6 ">
        <nav className="flex items-center justify-between">
          <Logo />
          <UserButton />
        </nav>
        <div className="flex flex-col items-center justify-center py-4">
          {children}
        </div>
      </div>
    </main>
  )
}

