import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { apiKeys } from "./api-keys";

export function useCurrentUser() {
  return useQuery({
    queryKey: apiKeys.auth.currentUser(),
    queryFn: authApi.getMe,
    retry: false,
  });
}
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      queryClient.setQueryData(apiKeys.auth.currentUser(), data);
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.register,

    onSuccess: (data) => {
      queryClient.setQueryData(apiKeys.auth.currentUser(), data);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,

    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: apiKeys.auth.currentUser(),
      });
    },
  });
}
