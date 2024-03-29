import { b64decode,b64encode } from './base64'

export const JSONtoStream = (data: object) => {
  return new Blob([JSON.stringify(data)], {
    type: 'text/plain'
  }).stream()
}

export const b64toStream = (b64: string) => {
  return new Blob([b64decode(b64)], {
    type: 'text/plain'
  }).stream()
}

export const responseToJSON = async (response: Response): Promise<Record<string, unknown>> =>  {
  const blob = await response.blob()

  const textResponse = await blob.text() 
  
  return JSON.parse(textResponse) as Record<string, unknown>
}

export const responseToB64 = async (response: Response) => {
  const blob = await response.blob()
  const buffer = await blob.arrayBuffer()
  
  return b64encode(buffer)
}

export const responseToBuffer = async (response: Response) => {
  const blob = await response.blob()
  
  return blob.arrayBuffer()
}

export const compressStream = async (stream: ReadableStream<Uint8Array>) => {
  const compressedReadableStream = stream.pipeThrough(
    new CompressionStream('gzip')
  )

  return new Response(compressedReadableStream)
}

export const decompressStream = (stream: ReadableStream<Uint8Array>) => {
  const compressedReadableStream = stream.pipeThrough(
    new DecompressionStream('gzip')
  )

  return new Response(compressedReadableStream)
}
