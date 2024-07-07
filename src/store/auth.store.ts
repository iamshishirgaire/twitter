import api from "@/lib/api";
import type Users from "@/lib/models/Users";
import toast from "react-hot-toast";
import { create } from "zustand";

interface AuthState {
  user: Users | null;
  loading: boolean;
  logout: () => void;
  login: (token: string) => Promise<boolean>;
  getCurrentUser: () => Promise<Users | undefined>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  login: async (token) => {
    try {
      const data = await api.post<{
        accessToken: string;
      }>("/auth/signin/google", { token });
      localStorage.setItem("accessToken", data.data.accessToken);

      const usr = await api.get<Users>("/auth/me");
      set({ user: usr.data });
      return true;
    } catch (error) {
      return false;
    }
  },
  logout: async () => {
    try {
      set({ loading: true });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      await api.post("/auth/logout");
      set({ user: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
    }
    set({ user: null });
    set({ loading: false });
  },
  getCurrentUser: async () => {
    set({ loading: true });
    try {
      const localData = localStorage.getItem("user");
      if (localData) {
        set({ user: JSON.parse(localData) });
        set({ loading: false });
        return JSON.parse(localData);
      }
      const usr = await api.get<Users>("/auth/me");
      set({ user: usr.data });
      localStorage.setItem("user", JSON.stringify(usr.data));
      set({ loading: false });
      return usr.data;
    } catch (error) {
      set({ loading: false });
      return undefined;
    }
  },
}));
