
// export const b64encode = (buf: ArrayBuffer) => {
//   return btoa(String.fromCharCode(...new Uint8Array(buf)))
// }

export const b64encode = (buffer: ArrayBuffer) => {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]!)
  }
  
  return window.btoa(binary)
}
  
// export const b64decode = (str: string) => {
//   const binary_string = window.atob(str)
//   const len = binary_string.length
//   const bytes = new Uint8Array(new ArrayBuffer(len))
//   for (let i = 0; i < len; i++) {
//     bytes[i] = binary_string.charCodeAt(i)
//   }
  
//   return bytes
// }

export const b64decode = (base64: string) => {
  const buffer = Buffer.from(base64, 'base64')

  return new Uint8Array(buffer)
} 