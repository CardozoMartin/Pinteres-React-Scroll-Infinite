import { create } from 'zustand'

export const useBockStore = create((set) => ({
    value: 'cat',
    updateValue: (newValue) => set(({ value : newValue })),
    
  }))