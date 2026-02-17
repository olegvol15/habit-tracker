import { apiClient } from "../lib/api";
import {
  type ToggleCheckinResponse,
  type CreateHabitInput,
  type Habit,
  type HabitsResponse,
  type HabitsWeekResponse,
  type ToggleCheckinInput,
} from "../types/habit";

export const habitsApi = {
  getHabits: async () => {
    const { data } = await apiClient.get<HabitsResponse>(`/habits`);
    return data;
  },

  getWeekHabits: async (start: string) => {
    const { data } = await apiClient.get<HabitsWeekResponse>(`/habits/week`, {
      params: { start },
    });
    return data;
  },

  createHabit: async (payload: CreateHabitInput) => {
    const { data } = await apiClient.post<Habit>(`/habits`, payload);
    return data;
  },

  toggleCheckin: async (habitId: number, payload: ToggleCheckinInput) => {
    const { data } = await apiClient.post<ToggleCheckinResponse>(
      `/habits/${habitId}/checkins`,
      payload,
    );
    return data;
  },

  editHabit: async (habitId: number, title: string) => {
    const { data } = await apiClient.patch<Habit>(`/habits/${habitId}`, { title });
    return data;
  },

  deleteHabit: async (habitId: number) => {
    await apiClient.delete(`/habits/${habitId}`);
  },
};
