import { apiClient } from "../lib/api";
import type { TodayResponse } from "../types/today";

export const todayApi = {
  getToday: async () => {
    const { data } = await apiClient.get<TodayResponse>(`/today`);
    return data;
  },
}
