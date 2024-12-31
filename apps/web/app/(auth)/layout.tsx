interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="bg-gradient-to-tl from-[#3494E6] to-[#EC6EAD] h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
