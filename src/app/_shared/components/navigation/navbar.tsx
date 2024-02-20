import React from 'react'
import Link from 'next/link'
import { Github } from 'lucide-react'

import { ProfileCard } from '@/app/_auth/components/profile-card'

export const Navbar = () => {
  return (
    <nav className="fixed w-full flex flex-row justify-between px-4 items-center border border-transparent border-b-border bg-black">
      <Link 
        href="/" 
        className="self-start text-3xl font-bold py-3">
        <span className="text-[#63e]">D</span>S
      </Link>
      <ul className="list-none flex gap-2 items-center">
        <li>
          <Link href="/repo">
            <Github />
          </Link>    
        </li>
        <li>
          <ProfileCard />
        </li>  
      </ul>
    </nav>
  )
}
