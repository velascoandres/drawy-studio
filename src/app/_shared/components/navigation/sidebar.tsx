'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Coffee,Github } from 'lucide-react'

import { ProfileCard } from '@/app/_auth/components/profile-card'
import { ProfileMenu } from '@/app/_auth/components/profile-menu'
import { LINKS } from '@/constants/links'
import { NAVIGATION } from '@/constants/navigation'
import { cn } from '@/lib/utils'

import { ThemeToggler } from '../theme/theme-toggler'


const menuItems = Object.values(NAVIGATION)

export const SideNavigation = () => {
  const pathname = usePathname()

  return (
    <aside className="md:py-4 bottom-2 md:w-[200px] fixed z-20  backdrop-blur left-[15%] right-[15%] rounded-full border border-border md:min-h-screen md:left-0 md:rounded-none md:backdrop-blur-none md:right-auto md:border-transparent md:border-r-border">
      <Link href="/" className="hidden md:block md:mb-5 px-6 text-2xl font-semibold whitespace-nowrap text-primary">
        <strong className="font-bold italic text-[#63e]">Drawy</strong> Studio
      </Link>

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

      <ul className="invisible md:visible absolute bottom-1 inline-flex  list-none left-[10%] right-[10%] text-sm">
        <li className="relative flex items-center w-full">
          <ThemeToggler />
        </li>
        <li className="relative flex items-center w-full">
          <Link href={LINKS.GITHIB_REPOSITORY} 
            className="transition ease-in rounded-full hover:bg-secondary p-3"
          >
            <Github />
          </Link>
        </li>

        <li className="relative flex items-center w-full">
          <Link href={LINKS.BUY_ME_COFEE} 
            className="transition ease-in rounded-full hover:bg-secondary p-3"
          >
            <Coffee className="text-amber-400" />
          </Link>
        </li>
      </ul>
    </aside>
  )
}