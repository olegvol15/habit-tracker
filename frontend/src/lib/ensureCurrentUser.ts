import type { QueryClient } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { apiKeys } from "../hooks/api-keys";
import type { PublicUser } from "../types/auth";

async function safeGetMe(): Promise<PublicUser | null> {
  try {
    const data = await authApi.getMe(); 
    return data?.user ?? null;
  } catch (e: any) {
    if (e?.response?.status === 401) return null;
    throw e;
  }
}

export function ensureCurrentUser(queryClient: QueryClient) {
  return queryClient.ensureQueryData({
    queryKey: apiKeys.auth.currentUser(),
    queryFn: safeGetMe,
    retry: false,
  });
}