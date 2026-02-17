import axios from "axios";
import { toast } from "sonner";

export const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ??
      error.response?.data?.error ??
      error.message ??
      "Unknown API error";

    error.message = message;

    const status = error.response?.status;
    if (status && status !== 401) {
      toast.error(message);
    }

    return Promise.reject(error);
  },
);
