import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface WhiteBoardStore {
    currentWhiteboard?: { id: number; name: string }
    selectWhiteboard: (whiteBoard: { id: number; name: string }) => void
}

export const useWhiteBoardStore = create<WhiteBoardStore>()(
  devtools((setStore) => ({
    selectWhiteboard: (whiteBoard) => {
      setStore({ currentWhiteboard: whiteBoard })
    },
  })
  )
)
