import { useQueryParams } from '@/app/_shared/hooks/use-query-params'
import { useModalStore } from '@/app/_shared/store/modal-store'
import { api } from '@/trpc/react'

import { CreateUpdateWhiteboard } from '../components/create-update-whiteboard'
import { DeleteWhiteboard } from '../components/delete-whiteboard'
import { useWhiteBoardStore } from '../store/whiteboard-store'


const DEFAULT_PER_PAGE = 10

export const useWhiteboardList = () => {
  const { openModal } = useModalStore()

  const { selectWhiteboard, currentWhiteboard } = useWhiteBoardStore()
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



  const handleSelect = selectWhiteboard

  const onPageChange = (newPage: number) => {
    setParam('page', newPage.toString())
  }

  const openCreateWhiteboard = () => {
    openModal({
      component: CreateUpdateWhiteboard
    })
  }

  const openUpdateWhiteboard = () => {
    openModal({
      component: CreateUpdateWhiteboard,
      props: {
        whiteboard: currentWhiteboard
      }
    })
  }

  const openRemoveWhiteboard = () => {
    openModal({
      component: DeleteWhiteboard,
      props: {
        whiteboard: currentWhiteboard
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
    handleSelect,
    onPageChange,
    currentWhiteboard
  }
}
