import { useQueryParams } from '@/app/_shared/hooks/use-query-params'
import { useModalStore } from '@/app/_shared/store/modal-store'

import { CreateUpdateWhiteboard } from '../components/create-update-whiteboard'
import { useWhiteBoardStore } from '../store/whiteboard-store'


const items = [
  {
    id: '1',
    name: 'Studio design',
    description: 'Some description'
  },
  {
    id: '2',
    name: 'API definition',
    description: 'Some description'
  },
  {
    id: '3',
    name: 'Best project ideas',
    description: 'Some description asdasdasdasdasdasd'
  },
  {
    id: '4',
    name: 'Best project ideas',
    description: 'Some description asdasdasdasdasdasd'
  },
  {
    id: '5',
    name: 'Best project ideas',
    description: 'Some description asdasdasdasdasdasd'
  },
  {
    id: '6',
    name: 'Studio',
    description: 'Some description'
  },
  {
    id: '7',
    name: 'API definition',
    description: 'Some description'
  },
  {
    id: '8',
    name: 'Best project ideas',
    description: 'Some description asdasdasdasdasdasd'
  },
  {
    id: '9',
    name: 'Best project ideas',
    description: 'Some description asdasdasdasdasdasd'
  },
  {
    id: '10',
    name: 'Best project ideas 10',
    description: 'Some description asdasdasdasdasdasd'
  },
  {
    id: '11',
    name: 'Best project ideas',
    description: 'Some description asdasdasdasdasdasd'
  },
  {
    id: '12',
    name: 'Project ideas 10',
    description: 'Some description asdasdasdasdasdasd'
  },
]

export const useWhiteboardList = () => {
  const { openModal } = useModalStore()

  const { selectWhiteboard, currentWhiteboard } = useWhiteBoardStore()
  const { searchParams, setParam, removeParam } = useQueryParams()

  const onSearchHandler = (search: string) => {
    if (search) {
      setParam('search', search)
    } else {
      removeParam('search')
    }
  }

  const currentPage = Number(searchParams.get('page') ?? 1)


  const handleSelect = selectWhiteboard

  const onPageChange = (newPage: number) => {
    setParam('page', newPage.toString())
  }

  const openCreateWhiteboard = () => {
    openModal({
      component: CreateUpdateWhiteboard
    })
  }

  return {
    whiteboards: items,
    totalPages: 2,
    currentSearch: searchParams.get('search') ?? '',
    onSearchHandler,
    openCreateWhiteboard,
    currentPage,
    handleSelect,
    onPageChange,
    currentWhiteboard
  }
}
