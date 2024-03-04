import React from 'react'
import Link from 'next/link'
import { Coffee,Github } from 'lucide-react'

import { LINKS } from '@/constants/links'

import { ThemeToggler } from '../theme/theme-toggler'

export const Settings = () => {
  return (
    <div className="inline-flex">
      <div className="relative flex items-center w-full">
        <ThemeToggler />
      </div>
      <ul className="inline-flex text-sm list-none">
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
    </div>
  )
}
