import { useMemo } from 'react'

import { useQueryParams } from '@/app/_shared/hooks/use-query-params'
import { useModalStore } from '@/app/_shared/store/modal-store'
import { api } from '@/trpc/react'

import { CreateUpdateSpace } from '../components/create-update-space'
import { RemoveSpace } from '../components/remove-space'
import { type Space } from '../interfaces/space'
import { transformSpace } from '../utils/transform-space'


export const useSpaceList = () => {
  const { searchParams, setParam, removeParam } = useQueryParams()
  const currentSearch = searchParams.get('search') ?? ''

  const { openModal } = useModalStore()
    
  const { data: response, isLoading } = api.space.findUserSpacesSummary.useQuery({
    search: searchParams.get('search') ?? '',
  })

  const spaces = useMemo(() => {
    if (!response?.data){
      return []
    }

    return response.data.map((space) => transformSpace(space))

  }, [response])
  
  const onPageChange = (newPage: number) => {
    setParam('page', newPage.toString())
  }
  
  const openCreateSpaceModal = () => {
    openModal({
      component: CreateUpdateSpace,
    })
  }
  
  const openUpdateSpaceModal = (space: Space) => {
    openModal({
      component: CreateUpdateSpace,
      props: {
        space,
      }
    })
  }
  
  const openDeleteSpaceModal = (space: Space) => {
    openModal({
      component: RemoveSpace,
      props: {
        space,
      }
    })
  }

  const onSearchHandler = (search: string) => {
    if (search) {
      setParam('search', search)
    } else {
      removeParam('search')
    }
  }

  return {
    currentSearch,
    isLoading,
    spaces,
    openCreateSpaceModal,
    openDeleteSpaceModal,
    openUpdateSpaceModal,
    onPageChange,
    onSearchHandler,
  }
}
