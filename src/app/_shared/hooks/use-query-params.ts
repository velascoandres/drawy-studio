'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const useQueryParams = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, value)

    const queryParams = params.toString()

    router.push(pathname + '?' + queryParams)
  }

  const removeParam = (key: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(key)

    const queryParams = params.toString()

    router.push(pathname + '?' + queryParams)
  }

  return {
    searchParams,
    setParam,
    removeParam,
  }
}
