'use client'

import React from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { ChevronRight, Github } from 'lucide-react'
import { FaDiscord } from 'react-icons/fa'

import { AnimatedBagde } from '@/app/_shared/components/ui/animated-bagde'
import { useWorkspace } from '@/app/_spaces/hooks/use-workspace'

const CONFIG = { callbackUrl: '/spaces' }

export const SigninProviders = () => {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-4">
      <AnimatedBagde
        style="black"
        role="button"
        className="text-white transition ease-in hover:scale-105"
        onClick={() => signIn('github', CONFIG)}
      >
        <Github className="mx-2 text-white" />
        <span className="text-white">Continue with Github</span>
      </AnimatedBagde>
      <AnimatedBagde
        style="purple"
        role="button"
        className="transition ease-in  hover:scale-105"
        onClick={() => signIn('discord', CONFIG)}
      >
        <FaDiscord className="h-7 w-7 text-[#63e]" />
        <span className="text-[#63e]">Continue with Discord</span>
      </AnimatedBagde>
    </div>
  )
}

export const ContinueDashboardButton = () => {
  const { currentSpace } = useWorkspace() 

  return (
    <Link
      href={currentSpace?.id ? `/spaces/${currentSpace.id}` : '/spaces'}
      className="group flex items-center rounded-full py-3 pl-4 pr-2 font-semibold text-white no-underline transition ease-in "
    >
      <AnimatedBagde style="purple">
        <span className="text-white transition ease-in group-hover:text-[#63e]">
          Continue to dashboard
        </span>
        <ChevronRight className="text-white transition duration-200 ease-out group-hover:translate-x-1 group-hover:text-[#63e]" />
      </AnimatedBagde>
    </Link>
  )
}
