import { create } from "zustand";
import { AuthSlice, UserInfo } from "./slice/authSlice";
import { customStorage } from "../utils/localStorage";
import { persist } from "zustand/middleware";



export const useAppStore = create(
  persist<AuthSlice>(
    (set) => ({
      userInfo: undefined,
      setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
      clearUserInfo: () => set ({userInfo:undefined})
    }),
    {
      name: "currentUser",
      storage: customStorage,
    }
  )
);