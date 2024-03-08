'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ProfileCard } from '@/app/_auth/components/profile-card'
import { ProfileMenu } from '@/app/_auth/components/profile-menu'
import { NAVIGATION } from '@/constants/navigation'
import { cn } from '@/lib/utils'

import { ThemeToggler } from '../theme/theme-toggler'

import { Logo } from './logo'
import { Settings } from './settings'


const menuItems = Object.values(NAVIGATION)

export const SideNavigation = () => {
  const pathname = usePathname()

  return (
    <aside className="md:py-4 bottom-2 md:w-[200px] fixed z-20  backdrop-blur left-[15%] right-[15%] rounded-full border border-border md:min-h-screen md:left-0 md:rounded-none md:backdrop-blur-none md:right-auto md:border-transparent md:border-r-border">
      <Logo />

      <div className="hidden md:px-2 md:block">
        <ProfileCard />
      </div>
    

      <nav className="flex flex-col items-center justify-center h-full py-4 px-6 md:items-start md:justify-start md:px-2">

        <ul className="text-sm inline-flex items-center gap-10 justify-center md:flex md:flex-col md:justify-start md:items-start md:w-full md:gap-5">
          {
            menuItems.map(({ name, icon: IconComponent, path }) => (
              <li 
                key={`menu-${name}`}
                className={cn('group transition ease-in relative list-none flex items-center md:w-full md:border md:border-transparent text-gray-400 md:hover:border-border md:px-4 md:py-2 md:rounded-xl', {
                  'text-primary md:bg-primary-foreground': pathname === path || pathname.includes(path)
                })}
              >
                <Link href={path} className=" group-hover:text-primary inline-flex gap-2 items-center md:justify-start md:gap-1 md:w-full">
                  <IconComponent />
                  <span className="hidden -top-10 -left-6 group-hover:transition ease-in  absolute group-hover:block py-1 px-2 rounded-xl border border-border md:relative md:block md:border-none md:bg-transparent md:top-0 md:left-0">{name}</span>
                </Link>
              </li>
            ))      
          }
          <li className="block md:hidden">
            <ProfileMenu />
          </li>

          <li className="block md:hidden">
            <ThemeToggler />
          </li>
        </ul>
      </nav>


      <div className="block px-[35%]">
      </div>

      <div className="invisible md:visible absolute bottom-1 left-[10%] right-[10%]">
        <Settings />
      </div>
    </aside>
  )
}