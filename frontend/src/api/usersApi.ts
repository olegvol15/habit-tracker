import { apiClient } from "../lib/api"
import { type UpdateProfileInput, type ProfileResponse, type PublicUser } from "../types/auth"

export const usersApi = {
  getProfile: async () => {
    const {data} = await apiClient.get<ProfileResponse>("/users/me")
    return data
  },

  updateProfile: async (payload: UpdateProfileInput) => {
    const {data} = await apiClient.patch<{user: PublicUser}>("/users/me", payload)
    return data;
  },

  uploadAvatar: async (file: File) => {
    const form = new FormData();
    form.append("avatar", file);
    const { data } = await apiClient.post<{ user: PublicUser }>("/users/me/avatar", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  deleteUser: async () => {
    await apiClient.delete("/users/me");
  }
}