import Link from "next/link";
import { PiLightningFill } from "react-icons/pi";

export default function Logo() {
  return (
    <Link href={'/'} className="flex gap-1 items-center justify-center p-2 bg-purple-600 rounded-md">
      <PiLightningFill size={24} className="text-white" />
      <span className="font-semibold text-2xl text-white">SHOP</span>
    </Link>
  )
}
