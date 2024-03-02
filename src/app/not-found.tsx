import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { IMAGES } from '@/constants/images'


export default function NotFound() {
  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center gap-4 px-10">
      <Image src={IMAGES.EMPTY_STATE} width={200} height={200} draggable={false} alt="Cheems meme sad" />
      <h2 className="text-4xl font-bold text-primary">Not found</h2>
      <p className="text-white font-medium text-lg">We are sorry <span className="text-xl">😟</span> but we could not find the resource</p>
      <Link href="/">
        <div className="transition ease-in pl-2 pr-4 py-2 border border-white rounded-md flex justify-between hover:border-indigo-400 hover:text-indigo-400">
          <ArrowLeft /> Return
        </div>
      </Link>
    </main>
  )
}