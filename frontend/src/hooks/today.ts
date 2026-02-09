import { useQuery } from "@tanstack/react-query";
import { todayApi } from "../api/todayApi";
import { apiKeys } from "./api-keys";

export function useTodayQuery(userId: number) {
  return useQuery({
    queryKey: apiKeys.today(userId),
    queryFn: () => todayApi.getToday(userId),
    staleTime: 30_000,
  });
}