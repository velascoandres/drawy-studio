'use client'

import React from 'react'
import { signIn } from 'next-auth/react'
import { Github } from 'lucide-react'
import { FaDiscord } from 'react-icons/fa'

import { AnimatedBagde } from '@/app/_shared/components/ui/animated-bagde'


const CONFIG = { callbackUrl: '/whiteboards' }

export const SigninProviders = () => {

  return (
    <div className="flex flex-row justify-center flex-wrap items-center gap-4">
      <AnimatedBagde
        style="black"
        role="button"
        className="transition ease-in text-white hover:scale-105"
        onClick={() => signIn('github', CONFIG)}
      >
        <Github className="mx-2 text-black dark:text-white" />
        <span className="text-black dark:text-white">
            Continue with Github
        </span>
            
      </AnimatedBagde>
      <AnimatedBagde 
        style="purple"  
        role="button"
        className="transition ease-in  hover:scale-105"
        onClick={() => signIn('discord', CONFIG)}
      > 
        <FaDiscord  className="dark:text-[#63e] w-7 h-7" />
        <span className="dark:text-[#63e]">
            Continue with Discord
        </span>
            
      </AnimatedBagde>

    </div>
  )
}