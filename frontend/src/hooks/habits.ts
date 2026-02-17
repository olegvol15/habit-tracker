import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { habitsApi } from "../api/habitsApi";
import { apiKeys } from "./api-keys";
import {
  type HabitsWeekResponse,
  type ToggleCheckinInput,
} from "../types/habit";

export function useHabitsQuery() {
  return useQuery({
    queryKey: apiKeys.habits.all,
    queryFn: () => habitsApi.getHabits(),
  });
}

export function useWeekHabits(start: string) {
  return useQuery({
    queryKey: [...apiKeys.habits.week(start)],
    queryFn: () => habitsApi.getWeekHabits(start),
  });
}

export function useCreateHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { title: string }) => habitsApi.createHabit(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: apiKeys.habits.all });
    },
  });
}

export function useToggleCheckin(start: string) {
  const queryClient = useQueryClient();
  const weekKey = apiKeys.habits.week(start);

  return useMutation({
    mutationFn: ({
      habitId,
      payload,
    }: {
      habitId: number;
      payload: ToggleCheckinInput;
    }) => habitsApi.toggleCheckin(habitId, payload),

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
      queryClient.invalidateQueries({ queryKey: apiKeys.today.all });
    },
  });
}

export function useEditHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ habitId, title }: { habitId: number; title: string }) =>
      habitsApi.editHabit(habitId, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: apiKeys.habits.all });
    },
  });
}

export function useDeleteHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (habitId: number) => habitsApi.deleteHabit(habitId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: apiKeys.habits.all });
    },
  });
}
