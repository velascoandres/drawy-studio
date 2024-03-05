import { useQueryParams } from '@/app/_shared/hooks/use-query-params'
import { useToast } from '@/app/_shared/hooks/use-toast'
import { useModalStore } from '@/app/_shared/store/modal-store'
import { AttachWhiteboardSpace } from '@/app/_spaces/components/attach-space'
import { DetachWhiteboardSpace } from '@/app/_spaces/components/detach-space'
import { type Space } from '@/app/_spaces/interfaces/space'
import { prepareDownload } from '@/lib/download'
import * as exportUtils from '@/lib/export-whiteboard' 

import { CreateUpdateWhiteboard } from '../components/create-update-whiteboard'
import { DeleteWhiteboard } from '../components/delete-whiteboard'
import { type Content } from '../components/whiteboard'
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
  const { toast } = useToast()


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

  const isEmptyContent = (whiteboard: Whiteboard) => {
    const isEmpty = Object.keys(whiteboard.content as Content ?? {}).length === 0

    if (isEmpty){
      toast({
        title: `🚨 Whiteboard: "${whiteboard.name}" is empty`,
        duration: 2000,
      })
    }

    return isEmpty
  }


  const onPageChange = (newPage: number) => {
    setParam('page', newPage.toString())
  }

  const openCreateWhiteboard = (spaceId?: number) => {
    openModal({
      component: CreateUpdateWhiteboard,
      props: {
        targetSpaceId: spaceId
      }
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

  const downloadSvg = (whiteboard: Whiteboard) => {
    if (isEmptyContent(whiteboard)){
      return
    }

    void exportUtils.exportToSVG(whiteboard.content as Content)
    .then((svg) => prepareDownload({
      name: `${whiteboard.name}.svg`,
      type: 'image/svg+xml',
      serialized: new XMLSerializer().serializeToString(svg)
    }))
  }

  const copyToClipboardPng = (whiteboard: Whiteboard) => {
    if (isEmptyContent(whiteboard)){

      return
    }

    void exportUtils.exportToClipboard(whiteboard.content as Content, 'png')
    .then(() => {
      toast({
        title: `✅ Whiteboard: "${whiteboard.name}" was copied to clipboard as a PNG`,
        duration: 2000,
      })
    })
  }

  const copyToClipboardJson = (whiteboard: Whiteboard) => {
    if (isEmptyContent(whiteboard)){
      return
    }

    void exportUtils.exportToClipboard(whiteboard.content as Content, 'json')
    .then(() => {
      toast({
        title: `✅ Whiteboard: "${whiteboard.name}" was copied to clipboard as a JSON`,
        duration: 2000,
      })
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
    // downloaders
    downloadSvg,
    copyToClipboardPng,
    copyToClipboardJson,
  }
}
