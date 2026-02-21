import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { ensureCurrentUser } from "../lib/ensureCurrentUser";
import { RegistrationForm } from "../components/auth/RegistrationForm";
import { GoogleAuthButton } from "../components/auth/GoogleAuthButton";

export const Route = createFileRoute("/register")({
  beforeLoad: async ({ context }) => {
    const user = await ensureCurrentUser(context.queryClient);
    if (user) throw redirect({ to: "/today" });
  },
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm sm:max-w-md">
        <div className="mb-8 sm:mb-10 text-center">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Start building better habits today
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 sm:p-6">
          <RegistrationForm onSuccess={() => navigate({ to: "/today" })} />

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-900/50 px-2 text-zinc-500 tracking-wider">or</span>
            </div>
          </div>

          <GoogleAuthButton />
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
