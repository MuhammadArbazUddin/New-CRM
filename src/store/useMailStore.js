import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";

export const useMailStore = create((set, get) => ({
  isOpen: false,
  sendMailData: null,
  inboxEmails: [],
  users:[],

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
      set({users:res.data})
      console.log("getAllUser", res.data)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },

  getInboxEmails: async () => {
    try {
      const res = await axiosInstance.get("/mail/inbox");
      set({ inboxEmails: res.data });
      console.log("getInboxEmails", res.data)
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  },

  getSentEmails: async () => {
    try {
      const res = await axiosInstance.get("/mail/sent");
      set({ inboxEmails: res.data });
      console.log("getSentEmails", res.data)
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  },

}));
