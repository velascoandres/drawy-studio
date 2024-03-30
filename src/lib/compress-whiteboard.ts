import { b64encode } from './base64'
import { 
  b64toStream, 
  compressStream, 
  decompressStream, 
  JSONtoStream,
  responseToBuffer 
} from './compress'

export const compressContent = async (content: Record<string, unknown>) => {
  const compressedStream =  await compressStream(JSONtoStream(content))
  const compressedBuffer = await  responseToBuffer(compressedStream)
   
  return b64encode(compressedBuffer)
}

export const decompressContent = (base64: string): Promise<Record<string, unknown>> => {
  const contentResponse = decompressStream(b64toStream(base64))
  
  return contentResponse.json() as Promise<Record<string, unknown>>    
}