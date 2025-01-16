import Image from "next/image";
import Link from "next/link";

import Client from "./client";

export default function DashboardPage() {
  return (
    <div className="h-full flex flex-col gap-8">
      <div className="relative min-h-[847px] w-full overflow-hidden">
        <Image
          src={`/landing-page.jpg`}
          alt="Landing page billboard"
          fill
          className="rounded-xl aspect-square md:aspect-[2.4/1]"
        />
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1 className="text-4xl font-bold">Shop is here</h1>
        <p className="text-gray-500">
          This is a place where you can find the best products for your needs.
        </p>
      </div>
      <Client />
      <footer className="w-full flex justify-center items-center mt-auto pb-4">
        <p className="text-gray-500 text-sm">
          Copyright © 2025 Astro Ecommerce by <Link href="https://github.com/linzheng99" target="_blank" className="text-black hover:underline">Lin Zheng</Link>
        </p>
      </footer>
    </div>
  )
}
