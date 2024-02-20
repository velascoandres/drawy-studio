import React from 'react'
import { signOut, useSession } from 'next-auth/react'

import { Avatar, AvatarFallback,AvatarImage } from '@/app/_shared/components/ui/avatar'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger
} from '@/app/_shared/components/ui/dropdown-menu'

export const ProfileMenu = () => {
  const { data } = useSession()

  if (!data?.user) {
    return null
  }
  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={data.user.image!} />
          <AvatarFallback>
            {data.user.name}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{data.user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => signOut({ callbackUrl: '/' })}
        >
			Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
