import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";

export const useHRMStore = create((set, get) => ({
  roles: [],
  members: [],
  selectedMember: null,
  loading: false,

  // Fetch default RBAC roles
  fetchRoles: async () => {
    set({ loading: true });
    try {
      const { data } = await axiosInstance.get("/get-default-rbac");
      set({ roles: data.roles || [] });
    } catch (err) {
      toast.error("Failed to load roles");
    } finally {
      set({ loading: false });
    }
  },

  // Fetch all members
  fetchMembers: async () => {
    set({ loading: true });
    try {
      const { data } = await axiosInstance.get("/get-all-members");
      set({ members: data.members || [] });
    } catch (err) {
      toast.error("Failed to fetch members");
    } finally {
      set({ loading: false });
    }
  },

  // Add new staff member
  addStaffMember: async (payload) => {
    set({ loading: true });
    try {
      await axiosInstance.post("/add-staff-member", payload);
      toast.success("Staff member added");
      get().fetchMembers(); // Refresh list
    } catch (err) {
      toast.error("Failed to add member");
    } finally {
      set({ loading: false });
    }
  },

  // Update existing member
  updateMember: async (payload) => {
    set({ loading: true });
    try {
      await axiosInstance.put("/update-member", payload);
      toast.success("Member updated");
      get().fetchMembers();
    } catch (err) {
      toast.error("Failed to update member");
    } finally {
      set({ loading: false });
    }
  },

  // Delete member
  deleteMember: async (memberId) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/delete-member`, { data: { id: memberId } });
      toast.success("Member deleted");
      get().fetchMembers();
    } catch (err) {
      toast.error("Failed to delete member");
    } finally {
      set({ loading: false });
    }
  },

  // Set selected member for editing
  setSelectedMember: (member) => set({ selectedMember: member }),
}));
