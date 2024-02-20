'use client'

import { useEffect } from 'react'

import { useModalStore } from '@/app/_shared/store/modal-store'

import { Dialog } from '../ui/dialog'


export const ModalContainer = () => {

  const {
    currentModal,
    closeModal,
    isOpen,
  } = useModalStore()


  const renderModal = () => {
    if (!currentModal) {
      return null
    }

    const { component, componentProps } = currentModal

    if (!component) {
      return null
    }

    const ModalComponent = component

    return <ModalComponent {...componentProps} />
  }

  const onOpenChange = (value: boolean) => {
    if (!value) {
      closeModal()

      return
    }
  }

  useEffect(() => {
    const hasCloseOnEscapeKeydown = currentModal?.config?.closeOnEscapeKeydown

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return
      }

      if (!hasCloseOnEscapeKeydown) {
        return
      }

      closeModal()
    }

    document.addEventListener('keydown', handleKeydown)

    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }

  }, [closeModal, currentModal])

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {renderModal()}
    </Dialog>
  )
}
