import { IUser } from "@/interfaces";
import { getCurrentUserSession } from "@/services/users";
import { create } from "zustand";

export interface AuthState {
  checkingUserSession: boolean;
  checkUserSession: () => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  checkingUserSession: true,
  checkUserSession: async () => {
    set({ checkingUserSession: true });
    const userResponse = await getCurrentUserSession();
    // console.log("🚀 ~ userResponse:", userResponse);

    if (userResponse) {
      set({ user: userResponse });
    } else {
      set({ user: null });
    }

    set({ checkingUserSession: false });
  },
  user: null,
  setUser: (payload) => set({ user: payload }),
}));
