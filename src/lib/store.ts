import { create } from 'zustand'

type Pillar = 'real-estate' | 'business' | 'club' | null

interface State {
    activePillar: Pillar
    setActivePillar: (pillar: Pillar) => void
}

export const useStore = create<State>((set) => ({
    activePillar: null,
    setActivePillar: (pillar) => set({ activePillar: pillar }),
}))
