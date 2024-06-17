import React from 'react'
import { signOut, useSession } from 'next-auth/react'

import { Avatar, AvatarFallback, AvatarImage } from '@/app/_shared/components/ui/avatar'
import { useWorkspace } from '@/app/_spaces/hooks/use-workspace'

export const ProfileCard = () => {
  const { data } = useSession()
  const { removeCurrentSpace } = useWorkspace()

  const handleLogout = () => {
    void signOut({ callbackUrl: '/' }).then(removeCurrentSpace)
  }

  if (!data?.user) {
    return null
  }

  return (
    <div className="select-none flex flex-row flex-wrap gap-2 items-start p-2">
      <Avatar>
        <AvatarImage src={data.user.image!} />
        <AvatarFallback>
          {data.user.name}
        </AvatarFallback>
      </Avatar>
      <div className="mx-2 [&>span]:block text-start text-sm">
        <span>{data.user.name}</span>
        <div role="button" className="cursor-pointer text-gray-600 hover:underline" onClick={handleLogout}>
          <span>Sign out</span>
        </div>
      </div>
    </div>
  )
}
