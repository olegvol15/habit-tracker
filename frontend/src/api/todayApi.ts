import { apiClient } from "../lib/api";
import type { TodayResponse } from "../types/today";

export const todayApi = {
  getToday: async (userId: number) => {
    const {data} = await apiClient.get<TodayResponse>(`/users/${userId}/today`);
    return data;
  }
}