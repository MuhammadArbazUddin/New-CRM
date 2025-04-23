import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";

export const useMailStore = create((set, get) => ({
  isOpen: false,
  sendMailData: null,
  sendDraftData: null,
  inboxEmails: [],
  draftEmails: [],
  importantEmails: [],
  starredEmails: [],
  trashEmails: [],
  users: [],
  currentEmail: null,
  sentEmails: [],
  searchQuery: "",

  setSearchQuery: (query) => set({ searchQuery: query }),

  toggleModal: () => {
    const next = !get().isOpen;
    set({ isOpen: next });
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

  sendMail: async (sendMailData) => {
    try {
      const response = await axiosInstance.post("/mail/send", sendMailData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.data.message || "Something went wrong");
      }
      set({ sendMailData: response.data });
      console.log("Email sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending email:", error.message);
    }
  },

  sendDraft: async (sendDraftData) => {
    try {
      const response = await axiosInstance.post(
        "/mail/add-to-draft",
        sendDraftData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.data.message || "Something went wrong");
      }
      set({ sendDraftData: response.data });
      console.log("Draft sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending email:", error.message);
    }
  },

  getDraftEmails: async () => {
    try {
      const res = await axiosInstance.get("/mail/get-draft");
      set({ draftEmails: res.data });
      console.log("getDraftEmails", res.data);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  },

  removeDraft: async (id) => {
    try {
      const res = await axiosInstance.put(`/mail/remove-draft/${id}`);
      console.log("Draft removed:", res.data);
      const updatedDrafts = get().draftEmails.filter(
        (email) => email._id !== id
      );
      set({ draftEmails: updatedDrafts });

      return res.data;
    } catch (error) {
      console.error("Error removing draft:", error.message);
      throw error;
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

  getImportantEmails: async () => {
    try {
      const res = await axiosInstance.get("/mail/get-important");
      set({ importantEmails: res.data });
      console.log("getImportantEmails", res.data);
    } catch (error) {
      console.error("Error fetching important emails:", error);
    }
  },

  getStarredEmails: async () => {
    try {
      const res = await axiosInstance.get("/mail/get-starred");
      set({ starredEmails: res.data });
      console.log("getStarredEmails", res.data);
    } catch (error) {
      console.error("Error fetching starred emails:", error);
    }
  },

  getTrashEmails: async () => {
    try {
      const res = await axiosInstance.get("/mail/get-trash");
      set({ trashEmails: res.data });
      console.log("getTrashEmails", res.data);
    } catch (error) {
      console.error("Error fetching trash emails:", error);
    }
  },

  removeTrash: async (id) => {
    try {
      const res = await axiosInstance.put(`/mail/remove-trash/${id}`);
      console.log("Trash email removed:", res.data);
  
      const updatedTrash = get().trashEmails.filter(
        (email) => email._id !== id
      );
      set({ trashEmails: updatedTrash });
  
      return res.data;
    } catch (error) {
      console.error("Error removing trash email:", error.message);
      throw error;
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

  toggleStarred: async (mailId) => {
    try {
      const res = await axiosInstance.put(`/mail/toggle-starred/${mailId}`);
      console.log("Toggled starred:", res.data);
    } catch (error) {
      console.error("Error toggling starred:", error);
    }
  },

  toggleImportant: async (mailId) => {
    try {
      const res = await axiosInstance.put(`/mail/toggle-important/${mailId}`);
      console.log("Toggled important:", res.data);
    } catch (error) {
      console.error("Error toggling important:", error);
    }
  },

  toggleTrash: async (mailId) => {
    try {
      const res = await axiosInstance.put(`/mail/toggle-trash/${mailId}`);
      console.log("Toggled trash:", res.data);
    } catch (error) {
      console.error("Error toggling trash:", error);
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
