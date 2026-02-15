import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { habitsApi } from "../api/habitsApi";
import { apiKeys } from "./api-keys";
import {
  type HabitsWeekResponse,
  type ToggleCheckinInput,
} from "../types/habit";

export function useHabitsQuery(userId: number) {
  return useQuery({
    queryKey: [...apiKeys.habits.all, userId],
    queryFn: () => habitsApi.getHabits(userId),
  });
}

export function useWeekHabits(userId: number, start: string) {
  return useQuery({
    queryKey: [...apiKeys.habits.week(userId, start)],
    queryFn: () => habitsApi.getWeekHabits(userId, start),
  });
}

export function useCreateHabit(userId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { title: string }) =>
      habitsApi.createHabit(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: apiKeys.habits.all });
    },
  });
}

export function useToggleCheckin(userId: number, start: string) {
  const queryClient = useQueryClient();
  const weekKey = apiKeys.habits.week(userId, start);

  return useMutation({
    mutationFn: ({
      habitId,
      payload,
    }: {
      habitId: number;
      payload: ToggleCheckinInput;
    }) => habitsApi.toggleCheckin(userId, habitId, payload),

    onMutate: async ({ habitId, payload }) => {
      await queryClient.cancelQueries({ queryKey: weekKey });

      const previous = queryClient.getQueryData<HabitsWeekResponse>(weekKey);

      queryClient.setQueryData<HabitsWeekResponse>(weekKey, (old) => {
        if (!old) return old;

        const date = payload.date;
        const habitKey = String(habitId);

        const prevForHabit = old.checkins[habitKey] ?? {};
        const isChecked = !!prevForHabit[date];

        const nextForHabit = { ...prevForHabit };
        if (isChecked) {
          delete nextForHabit[date];
        } else {
          nextForHabit[date] = true;
        }

        return {
          ...old,
          checkins: {
            ...old.checkins,
            [habitKey]: nextForHabit,
          },
        };
      });

      return { previous };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(weekKey, ctx.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: weekKey });
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
