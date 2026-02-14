import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { habitsApi } from "../api/habitsApi";
import { apiKeys } from "./api-keys";

export function useHabitsQuery(userId: number) {
  return useQuery({
    queryKey: [...apiKeys.habits.all, userId],
    queryFn: () => habitsApi.getHabits(userId),
  });
}

export function useWeekHabits(userId: number, start: string) {
  return useQuery({
    queryKey: [...apiKeys.habits.week(start), userId],
    queryFn: () => habitsApi.getWeekHabits(userId, start),
  });
}

export function useCreateHabit(userId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { title: string }) => habitsApi.createHabit(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: apiKeys.habits.all });
    },
  });
}

export function useDeleteHabit(userId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (habitId: number) => habitsApi.deleteHabit(userId, habitId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: apiKeys.habits.all });
    },
  });
}
