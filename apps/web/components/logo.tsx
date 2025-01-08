import Link from "next/link";
import { PiLightningFill } from "react-icons/pi";

export default function Logo() {
  return (
    <Link href={'/'} className="flex gap-1 items-center justify-center p-2 bg-amber-400 rounded-md">
      <PiLightningFill size={24} />
      <span className="font-semibold text-2xl">SHOP</span>
    </Link>
  )
}
