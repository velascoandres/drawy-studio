import { useMemo } from 'react'

import { transformSpace } from '@/app/_spaces/utils/transform-space'
import { api } from '@/trpc/react'

const DEFAULT_PER_PAGE = 10

interface Options {
  query?: {
    search?: string
    spaceId?: number | null
  },
  perPage?: number
  page: number
}

export const useFindUserWhiteboards = (options: Options) => {
  const { query, perPage = DEFAULT_PER_PAGE, page } = options

  const { data: response, isLoading, error } = api.whiteboard.findUserWhiteboards.useQuery({
    search: query?.search ?? '',
    spaceId: query?.spaceId,
    page,
    perPage
  })
    
  const whiteboards = useMemo(() => {
    if (!response?.data?.length){
      return []
    }
    
    return response.data.map((whiteboard) => ({
      ...whiteboard,
      description: whiteboard.description ?? '',
      space: whiteboard.space ? transformSpace(whiteboard?.space) : undefined,
    }))
  }, [response?.data])

  return {
    error,
    isLoading,
    whiteboards,
    totalPages: response?.totalPages ?? 0,
  }
}