import React, { Suspense } from 'react'
import { type Metadata,type ResolvingMetadata } from 'next'
import { redirect } from 'next/navigation'

import Loading from '@/app/(protected)/loading'
import findPublicWhiteboardById from '@/server/api/whiteboard/usecases/find-public-whiteboard'
import { db } from '@/server/db'


export async function generateMetadata({ params }: {params: {id: string}}, parent: ResolvingMetadata) {
  const id = Number(params.id)

  const whiteboard = await findPublicWhiteboardById(db, { id, omitContent: true })


  if (!whiteboard){
    redirect('/not-found')
  }


  const previousDescription = (await parent).openGraph?.description ?? ''

  return {
    title: whiteboard.name,
    description: whiteboard.description,
    openGraph:{
      title: whiteboard.name,
      description: whiteboard.description ?? previousDescription,
      url: 'https://drawy-studio.vercel.app/',
      images: [{ 
        url: 'https://drawy-studio.vercel.app/preview.jpg',        
        width: 1200,
        height: 630, 
      }],
      siteName: 'Drawy studio',
    }
  } as Metadata
}

const Layout = ({ children }: {children: React.ReactNode}) => {
  return (
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  )
}


export default Layout