import { create } from "zustand";


export const useStore = create((set) => ({
    dead: false,
    setDead: () => {
        set(() => ({ dead: true }));
    },
    userData: { name: "Player", cid: "cid", color: "red", age: 0, bio: "bio" },
    setUserData: (res) => {
        set(() => ({ userData: res }));
    },
    isNewUser: true,
    setNewUser: (res) => {
        set(() => ({ isNewUser: res }));
    },
    roomId: true,
    setRoomId: (res) => {
        set(() => ({ roomId: res }));
    },
}))