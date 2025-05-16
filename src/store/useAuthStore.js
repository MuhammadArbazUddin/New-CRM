import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  // isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("auth/check");
      set({ authUser: res.data.data });
      console.log("User authenticated successfully:", res.data.data);
    } catch (error) {
      console.error(error.response.data.data.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // signup: async (data) => {
  //   set({ isSigningUp: true });
  //   console.log("Data to be sent:", data);
  //   try {
  //     const res = await axiosInstance.post("auth/signup", data);
  //     console.log("User signed up successfully:", res.data);
  //     set({ authUser: res.data });
  //     toast.success("Account created successfully");
  //   } catch (error) {
  //     console.error(error.response.data.message);
  //   } finally {
  //     set({ isSigningUp: false });
  //   }
  // },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response.data.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response.data.data.message);
    }
  },
}));
