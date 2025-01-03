import Navbar from "@/components/navbar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-full">
      <div className="flex flex-col w-full h-full">
        <Navbar />
        <main className="h-full py-8 px-6 flex flex-col">
          {children}
        </main>
      </div>
    </div>
  )
}

