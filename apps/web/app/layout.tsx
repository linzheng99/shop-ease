import "./globals.css";

import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import QueryProvider from "@/components/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

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
            <NuqsAdapter>
              {children}
            </NuqsAdapter>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
