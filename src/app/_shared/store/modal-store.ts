import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type ModalProps = { [key in string]: unknown }

interface ModalConfig {
    closeOnClickOutside: boolean
    closeOnEscapeKeydown: boolean
}

export interface OpenModalArgs {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: React.FC<any>
    props?: ModalProps
    config?: ModalConfig
}

export interface ModalInfo {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: React.FC<any>
    componentProps?: ModalProps
    config?: ModalConfig
}

export interface ModalState {
    currentModal?: ModalInfo
    isOpen: boolean

    openModal: (args: OpenModalArgs) => void
    closeModal: () => void
}


const INITIAL_MODAL_STATE: Omit<ModalState, 'openModal' | 'closeModal'> = {
  isOpen: false,
}

export const useModalStore = create<ModalState>()(devtools((setStore) => ({
  ...INITIAL_MODAL_STATE,  
  openModal: (payload) => {
    setStore((state) => {
       
      return {
        ...state,
        currentModal: {
          component: payload.component,
          config: payload.config,
          componentProps: payload.props,
        },
        isOpen: true,
      }
    })
  },
  closeModal: () => {
    setStore(() => {
       
      return {
        currentModal: undefined,
        isOpen: false,
      }
    })
  },
}), 
{ name: 'modal-storage' }
))