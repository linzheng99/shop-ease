import "./globals.css";

import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { Toaster } from "sonner";

import QueryProvider from "@/components/query-provider";
import { ThemeProvider } from "@/components/theme-provider";

const sansSerif = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shop Ease",
  description: "Shop Ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={sansSerif.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <Toaster />
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
