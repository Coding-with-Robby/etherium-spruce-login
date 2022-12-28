import create from 'zustand'

type TAuthStore = {}

export const authStore = create<TAuthStore>((set) => ({}))

export default authStore
