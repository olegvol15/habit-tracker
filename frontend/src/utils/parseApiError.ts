import type { AxiosError } from "axios";

type ApiErrorBody = {
  message?: string;
  errors?: Record<string, string>; 
};

export function parseApiError(err: unknown) {
  const axiosErr = err as AxiosError<ApiErrorBody>;

  const status = axiosErr?.response?.status;
  const message =
    axiosErr?.response?.data?.message ??
    (err instanceof Error ? err.message : "Something went wrong");

  const fieldErrors = axiosErr?.response?.data?.errors;

  return { status, message, fieldErrors };
}