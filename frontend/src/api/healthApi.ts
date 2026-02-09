import { apiClient } from "../lib/api";

export type HealthResponse = { status: string };

export const healthApi = {
  getHealth: async () => {
    const { data } = await apiClient.get<HealthResponse>("/health");
    return data;
  },
};