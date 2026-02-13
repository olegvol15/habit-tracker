import { apiClient } from "../lib/api";
import type { AuthResponse, LoginInput, RegisterInput } from "../types/auth";

export const authApi = {
  getMe: async () => {
    const { data } = await apiClient.get<AuthResponse>("/auth/me");
    return data;
  },

  login: async (payload: LoginInput) => {
    const { data } = await apiClient.post<AuthResponse>("/auth/login", payload);
    return data;
  },

  register: async (payload: RegisterInput) => {
    const { data } = await apiClient.post<AuthResponse>(
      "/auth/register",
      payload,
    );

    return data;
  },

  logout: async () => {
    const { data } = await apiClient.post<AuthResponse>("/auth/logout");
    return data;
  },
};
