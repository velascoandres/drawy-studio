
interface Options {
    name: string
    serialized: string
    type: 'image/svg+xml' | 'image/png'
  }
  
  
export const prepareDownload = ({ name, serialized, type }: Options) => {
  const blob = new Blob([serialized], { type })
  
  const downloadLink = document.createElement('a')
  const url = window.URL.createObjectURL(blob)

  downloadLink.href = url
  downloadLink.style.display = 'none'
  downloadLink.download = name

  downloadLink.click()
  window.URL.revokeObjectURL(url)
}
