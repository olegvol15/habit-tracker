import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import { ensureCurrentUser } from "../lib/ensureCurrentUser";
import { LoginForm } from "../components/auth/LoginForm";
import { GoogleAuthButton } from "../components/auth/GoogleAuthButton";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>) => ({
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
    error: typeof s.error === "string" ? s.error : undefined,
  }),
  beforeLoad: async ({ context }) => {
    const user = await ensureCurrentUser(context.queryClient);
    if (user) throw redirect({ to: "/today" });
  },
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { redirect: redirectTo, error } = Route.useSearch();

  useEffect(() => {
    if (error === "oauth_failed") {
      toast.error("Google sign-in failed. Please try again.");
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-semibold">Sign in</h1>
        <p className="mt-1 text-sm text-zinc-400">Welcome back</p>

        <div className="mt-6">
          <LoginForm
            onSuccess={() => navigate({ to: redirectTo ?? "/today" })}
          />

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-900/40 px-2 text-zinc-500 tracking-wider">or</span>
            </div>
          </div>

          <GoogleAuthButton />
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-white hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
