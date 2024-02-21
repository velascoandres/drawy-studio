import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface WhiteBoardStore {
    currentWhiteboard?: { id: string; name: string }
    selectWhiteboard: (whiteBoard: { id: string; name: string }) => void
}

export const useWhiteBoardStore = create<WhiteBoardStore>()(
  devtools((setStore) => ({
    selectWhiteboard: (whiteBoard) => {
      setStore({ currentWhiteboard: whiteBoard })
    },
  })
  )
)
