import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";

export const useMailStore = create((set, get) => ({
  isOpen: false,
  sendMailData: null,
  inboxEmails: [],
  users: [],
  currentEmail: null,
  sentEmails: [],
  searchQuery: "",

  setSearchQuery: (query) => set({ searchQuery: query }),

  toggleModal: () => {
    const next = !get().isOpen;
    set({ isOpen: next });
  },

  sendMail: async (sendMailData) => {
    try {
      const response = await axiosInstance.post("/mail/send", sendMailData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 200) {
        throw new Error(response.data.message || "Something went wrong");
      }
      set({ sendMailData: response.data });
      console.log("Email sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending email:", error.message);
    }
  },

  getAllUser: async () => {
    try {
      const res = await axiosInstance.get("/user/get-all");
      set({ users: res.data });
      console.log("getAllUser", res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },

  getInboxEmails: async () => {
    try {
      const res = await axiosInstance.get("/mail/inbox");
      set({ inboxEmails: res.data });
      console.log("getInboxEmails", res.data);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  },

  getSentEmails: async () => {
    try {
      const res = await axiosInstance.get("/mail/sent");
      set({ sentEmails: res.data });
      console.log("getSentEmails", res.data);
    } catch (error) {
      console.error("Error fetching sent emails:", error);
    }
  },

  getMailById: async (mailId) => {
    try {
      const res = await axiosInstance.get(`/mail/${mailId}`);
      set({ currentEmail: res.data });
      console.log("getMailById", res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching email details:", error);
      throw error;
    }
  },
}));
