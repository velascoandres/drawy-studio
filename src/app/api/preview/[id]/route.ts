
import { type NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'

import uploadPreview from '@/server/api/whiteboard/usecases/upload-preview'
import { authOptions } from '@/server/auth'
import { db } from '@/server/db'


const previewHandler = async (req: NextRequest, { params }: {params: {id: string}}) => {
  const session = await getServerSession(authOptions)

  if (session) {
    const data = await req.formData()

    const file: File = data.get('file') as File
  
    const buffer = await file.arrayBuffer()
    const id = Number(params.id)

    const response = await uploadPreview(db, {
      id, 
      file: buffer,
      userId: session.user.id
    })
    
    return NextResponse.json(response, { status: 201 })
  }
  
  return NextResponse.json({ message: 'Not authorized' }, { status: 300 })
}

export { previewHandler as POST }