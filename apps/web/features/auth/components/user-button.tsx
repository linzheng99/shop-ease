'use client'

import { LogOut } from "lucide-react"
import { redirect } from "next/navigation"

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { useSignout } from "@/features/auth/api/use-signout"
import { type Session } from "@/lib/session"

export default function UserButton({ session }: { session: Session | null }) {
  const { mutate } = useSignout()

  if (!session) {
    return (
      <Button variant="default" onClick={() => redirect('/sign-in')}>
        Sign in
      </Button>
    )
  }

  const avatarFallback = session.user.name?.charAt(0).toUpperCase() || 'U'

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar className='size-10 hover:opacity-75 border'>
          <AvatarFallback>
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-60' sideOffset={10}>
        <div className='flex flex-col items-center justify-center p-3'>
          <Avatar className='size-10 border'>
            <AvatarFallback>
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          {session.user.name && <p className='font-semibold'>{session.user.name}</p>}
          {session.user.email && <p className='text-sm text-gray-500'>{session.user.email}</p>}
        </div>
        <Separator className='mb-1' />
        <DropdownMenuItem
          className='flex justify-center items-center gap-2 text-red-500'
          onClick={() => mutate()}
        >
          <LogOut />Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
