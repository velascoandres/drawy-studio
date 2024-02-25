import { useMemo } from 'react'

import { useQueryParams } from '@/app/_shared/hooks/use-query-params'
import { useModalStore } from '@/app/_shared/store/modal-store'
import { AttachWhiteboardSpace } from '@/app/_spaces/components/attach-space'
import { DetachWhiteboardSpace } from '@/app/_spaces/components/detach-space'
import { type Space } from '@/app/_spaces/interfaces/space'
import { transformSpace } from '@/app/_spaces/utils/transform-space'
import { api } from '@/trpc/react'

import { CreateUpdateWhiteboard } from '../components/create-update-whiteboard'
import { DeleteWhiteboard } from '../components/delete-whiteboard'
import { type Whiteboard } from '../interfaces/whiteboard'


const DEFAULT_PER_PAGE = 10

interface Options {
  query?: {
    spaceId: number | null
  }
}

const DEFAULT_OPTIONS = {
  query: undefined
}


export const useWhiteboardList = ({ query }: Options = DEFAULT_OPTIONS) => {
  const { openModal } = useModalStore()
  const { searchParams, setParam, removeParam } = useQueryParams()

  const currentPage = Number(searchParams.get('page') ?? 1)
  const currentSearch = searchParams.get('search') ?? ''

  const { data: response, isLoading, error } = api.whiteboard.findUserWhiteboards.useQuery({
    search: currentSearch,
    spaceId: query?.spaceId,
    page: currentPage,
    perPage: DEFAULT_PER_PAGE
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

  const onSearchHandler = (search: string) => {
    if (search) {
      setParam('search', search)
    } else {
      removeParam('search')
    }
  }


  const onPageChange = (newPage: number) => {
    setParam('page', newPage.toString())
  }

  const openCreateWhiteboard = () => {
    openModal({
      component: CreateUpdateWhiteboard
    })
  }

  const openUpdateWhiteboard = (whiteboard: Whiteboard) => {
    openModal({
      component: CreateUpdateWhiteboard,
      props: {
        whiteboard
      }
    })
  }

  const openRemoveWhiteboard = (whiteboard: Whiteboard) => {
    openModal({
      component: DeleteWhiteboard,
      props: {
        whiteboard
      }
    })
  }

  const openDetachSpace = (whiteboard: Whiteboard) => {
    openModal({
      component: DetachWhiteboardSpace,
      props: {
        whiteboard
      }
    })
  }

  const openAttachSpace = (space: Space) => {
    openModal({
      component: AttachWhiteboardSpace,
      props: {
        space
      }
    })
  }

  return {
    // fetch response data
    error,
    isLoading,
    whiteboards,
    totalPages: response?.totalPages ?? 0,
    currentSearch,
    currentPage,
    // event handlers
    onPageChange,
    onSearchHandler,
    // Modals handlers
    openCreateWhiteboard,
    openUpdateWhiteboard,
    openRemoveWhiteboard,
    openDetachSpace,
    openAttachSpace,
  }
}
