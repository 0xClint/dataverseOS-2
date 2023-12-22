import { create } from "zustand";


export const useStore = create((set) => ({
    dead: false,
    setDead: () => {
        set(() => ({ dead: true }));
    },
}))