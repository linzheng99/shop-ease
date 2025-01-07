import "./globals.css";

import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { Toaster } from "sonner";

import QueryProvider from "@/components/query-provider";

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
    <html lang="en">
      <body className={sansSerif.className}>
        <QueryProvider>
          <Toaster />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
