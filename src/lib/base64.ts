export  const b64encode = (arrayBuffer: ArrayBuffer) => {
  const buffer = Buffer.from(arrayBuffer)
  const base64String = buffer.toString('base64')

  return base64String
}

export const b64decode = (base64: string) => {
  const buffer = Buffer.from(base64, 'base64')

  return new Uint8Array(buffer)
}