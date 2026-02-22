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

  deleteUser: async () => {
    await apiClient.delete("/users/me");
  }
}