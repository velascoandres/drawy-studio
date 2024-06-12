import { create } from 'zustand'
import { devtools,persist } from 'zustand/middleware'

import { type Space } from '@/app/_spaces/interfaces/space'

export interface WorkspaceState {
    currentSpace?: Space
}

export interface WorkspaceStoreActions{
    removeCurrentSpace(): void
    setCurrentSpace(space: Space): void
}

type WorspaceStore = WorkspaceState & WorkspaceStoreActions

export const useWorkspaceStore = create<WorspaceStore>()(
  devtools(
    persist(
      (set) => ({
        currentSpace: undefined,
        setCurrentSpace: (payload) => set((state) => ({ ...state, currentSpace: payload })),
        removeCurrentSpace: () => {
          set((state) => ({
            ...state,
            currentSpace: undefined
          }))
        },
      }),
      { name: 'workspaceStore' },
    ),
  ),
)