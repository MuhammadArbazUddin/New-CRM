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

  // getAllUser: async () => {
  //   try {
  //     const res = await axiosInstance.get("/user/get-all");
  //     set({ users: res.data.data });
  //     console.log("Users fetched successfully:", res.data.data);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // },

  getAllUser: async () => {
    try {
      const res = await axiosInstance.get("/hrm/member/get-all-members");
      set({ users: res.data.data.users });
      console.log("Users fetched successfully:", res.data.data.users);
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
      console.log("Email sent successfully:", response.data.data);
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
      console.log("Draft saved successfully:", response.data.data);
    } catch (error) {
      console.error("Error sending email:", error.message);
    }
  },

  getDraftEmails: async () => {
    try {
      const res = await axiosInstance.get("/mail/get-draft");
      set({ draftEmails: res.data.data });
      console.log("Draft emails fetched successfully:", res.data.data);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  },

  removeDraft: async (id) => {
    try {
      const res = await axiosInstance.put(`/mail/remove-draft/${id}`);
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
  
  getInboxEmails: async (page = 1) => {
    try {
      const res = await axiosInstance.get(`/mail/inbox?page=${page}`);
      set({ inboxEmails: res.data.data });
      console.log("Inbox emails fetched successfully:", res.data.data);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  },
  
  getImportantEmails: async (page = 1) => {
    try {
      const res = await axiosInstance.get(`/mail/get-important?page=${page}`);
      set({ importantEmails: res.data.data });
      console.log("Important emails fetched successfully:", res.data.data);
    } catch (error) {
      console.error("Error fetching important emails:", error);
    }
  },

  getStarredEmails: async (page = 1) => {
    try {
      const res = await axiosInstance.get(`/mail/get-starred?page=${page}`);
      set({ starredEmails: res.data.data });
      console.log("Starred emails fetched successfully:", res.data.data);
    } catch (error) {
      console.error("Error fetching starred emails:", error);
    }
  },

  getTrashEmails: async (page = 1) => {
    try {
      const res = await axiosInstance.get(`/mail/get-trash?page=${page}`);
      set({ trashEmails: res.data.data });
      console.log("Trash emails fetched successfully:", res.data.data);
    } catch (error) {
      console.error("Error fetching trash emails:", error);
    }
  },

  removeTrash: async (id) => {
    try {
      const res = await axiosInstance.put(`/mail/remove-trash/${id}`);
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
  
  getSentEmails: async (page = 1) => {
    try {
      const res = await axiosInstance.get(`/mail/sent`, {
        params: { page },
      });
      set({ sentEmails: res.data.data });
      console.log("Sent emails fetched successfully:", res.data.data);
    } catch (error) {
      console.error("Error fetching sent emails:", error);
    }
  },  

  toggleStarred: async (mailId) => {
    try {
      const res = await axiosInstance.put(`/mail/toggle-starred/${mailId}`);
    } catch (error) {
      console.error("Error toggling starred:", error);
    }
  },

  toggleImportant: async (mailId) => {
    try {
      const res = await axiosInstance.put(`/mail/toggle-important/${mailId}`);
    } catch (error) {
      console.error("Error toggling important:", error);
    }
  },

  toggleTrash: async (mailId) => {
    try {
      const res = await axiosInstance.put(`/mail/toggle-trash/${mailId}`);
    } catch (error) {
      console.error("Error toggling trash:", error);
    }
  },

  getMailById: async (mailId) => {
    try {
      const res = await axiosInstance.get(`/mail/${mailId}`);
      set({ currentEmail: res.data.data });
      console.log("Email by ID fetched successfully:", res.data.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching email details:", error);
      throw error;
    }
  },
}));
