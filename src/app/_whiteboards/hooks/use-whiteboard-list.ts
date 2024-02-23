import { useQueryParams } from '@/app/_shared/hooks/use-query-params'
import { useModalStore } from '@/app/_shared/store/modal-store'
import { api } from '@/trpc/react'

import { CreateUpdateWhiteboard } from '../components/create-update-whiteboard'
import { DeleteWhiteboard } from '../components/delete-whiteboard'


const DEFAULT_PER_PAGE = 10

interface Whiteboard {
  id: number
  name: string
}


export const useWhiteboardList = () => {
  const { openModal } = useModalStore()
  const { searchParams, setParam, removeParam } = useQueryParams()

  const currentPage = Number(searchParams.get('page') ?? 1)
  const currentSearch = searchParams.get('search') ?? ''

  const { data: response, isLoading, error } = api.whiteboard.findUserWhiteboards.useQuery({
    search: currentSearch,
    page: currentPage,
    perPage: DEFAULT_PER_PAGE
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
        whiteboard: whiteboard
      }
    })
  }

  const openRemoveWhiteboard = (whiteboard: Whiteboard) => {
    openModal({
      component: DeleteWhiteboard,
      props: {
        whiteboard: whiteboard
      }
    })
  }

  return {
    error,
    isLoading,
    whiteboards: response?.data ?? [],
    totalPages: response?.totalPages ?? 0,
    currentSearch,
    onSearchHandler,
    openCreateWhiteboard,
    openUpdateWhiteboard,
    openRemoveWhiteboard,
    currentPage,
    onPageChange,
  }
}
