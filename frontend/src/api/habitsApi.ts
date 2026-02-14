import { apiClient } from "../lib/api";
import type { CreateHabitInput, Habit, HabitsResponse, HabitsWeekResponse } from "../types/habit";

export const habitsApi = {
  getHabits: async (userId: number) => {
    const { data } = await apiClient.get<HabitsResponse>(`/users/${userId}/habits`);
    return data;
  },

  getWeekHabits: async (userId: number, start: string) => {
    const { data } = await apiClient.get<HabitsWeekResponse>(`/users/${userId}/habits/week`, {
      params: { start },
    });
    return data;
  },

  createHabit: async (userId: number, payload: CreateHabitInput) => {
    const { data } = await apiClient.post<Habit>(`/users/${userId}/habits`, payload);
    return data;
  },

  deleteHabit: async (userId: number, habitId: number) => {
    await apiClient.delete(`/users/${userId}/habits/${habitId}`);
  },
};
