import { useQueryParams } from '@/app/_shared/hooks/use-query-params'
import { useModalStore } from '@/app/_shared/store/modal-store'
import { AttachWhiteboardSpace } from '@/app/_spaces/components/attach-space'
import { DetachWhiteboardSpace } from '@/app/_spaces/components/detach-space'
import { type Space } from '@/app/_spaces/interfaces/space'

import { CreateUpdateWhiteboard } from '../components/create-update-whiteboard'
import { DeleteWhiteboard } from '../components/delete-whiteboard'
import { type Whiteboard } from '../interfaces/whiteboard'

import { useFindUserWhiteboards } from './use-find-user-whiteboards'

interface Options {
  query?: {
    spaceId?: number | null
  },
}

export const useWhiteboardList = ({ query }: Options = { query: { spaceId: undefined } }) => {  
  const { openModal } = useModalStore()
  const { searchParams, setParam, removeParam } = useQueryParams()

  const currentPage = Number(searchParams.get('page') ?? 1)
  const currentSearch = searchParams.get('search') ?? ''

  const { whiteboards, isLoading, error, totalPages } = useFindUserWhiteboards({
    page: currentPage,
    query: {
      spaceId: query?.spaceId,
      search: currentSearch
    }
  })

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
    totalPages,
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
