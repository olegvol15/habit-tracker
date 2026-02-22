import { usersApi } from "../api/usersApi";
import { queryClient } from "../lib/queryClient";
import { apiKeys } from "./api-keys";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetProfile() {
  return useQuery({
    queryKey: apiKeys.users.profile(),
    queryFn: usersApi.getProfile,
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: usersApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: apiKeys.users.profile() });
      queryClient.invalidateQueries({ queryKey: apiKeys.auth.currentUser() });
    },
  });
}

export function useUploadAvatar() {
  return useMutation({
    mutationFn: usersApi.uploadAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: apiKeys.users.profile() });
      queryClient.invalidateQueries({ queryKey: apiKeys.auth.currentUser() });
    },
  });
}

export function useDeleteAccount() {
  return useMutation({
    mutationFn: usersApi.deleteUser,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: apiKeys.auth.currentUser() });
      queryClient.removeQueries({ queryKey: apiKeys.users.profile() });
    },
  });
}
