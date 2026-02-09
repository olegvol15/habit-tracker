import { healthApi } from "../api/healthApi";
import { useQuery } from "@tanstack/react-query";

export function useHealthQuery() {
  return useQuery({
    queryKey: ["health"],
    queryFn: () => healthApi.getHealth(),
    staleTime: 60_000,
  })
}