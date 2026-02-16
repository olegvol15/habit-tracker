import { useQuery } from "@tanstack/react-query";
import { todayApi } from "../api/todayApi";
import { apiKeys } from "./api-keys";

export function useTodayQuery() {
  return useQuery({
    queryKey: apiKeys.today.all,
    queryFn: () => todayApi.getToday(),
    staleTime: 30_000,
  });
}
