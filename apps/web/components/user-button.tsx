'use client'

import { LogOut } from "lucide-react"
import { redirect } from "next/navigation"

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCurrent } from "@/features/auth/api/use-current"
import { deleteSession } from "@/lib/session"

import { Button } from "./ui/button"
import { Separator } from "./ui/separator"

export default function UserButton() {
  const { data: session } = useCurrent()
  const { user } = session || {}

  if (!user) {
    return (
      <Button variant="default" onClick={() => redirect('/sign-in')}>
        Sign in
      </Button>
    )
  }

  const avatarFallback = user?.name?.charAt(0).toUpperCase() || 'U'

  async function handleLogout() {
    await deleteSession()
    redirect('/sign-in')
  }

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
          {user?.name && <p className='font-semibold'>{user?.name}</p>}
          {user?.email && <p className='text-sm text-gray-500'>{user?.email}</p>}
        </div>
        <Separator className='mb-1' />
        <DropdownMenuItem
          className='flex justify-center items-center gap-2 text-red-500'
          onClick={handleLogout}
        >
          <LogOut />Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
