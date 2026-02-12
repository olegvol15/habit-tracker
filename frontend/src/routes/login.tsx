import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { ensureCurrentUser } from "../lib/ensureCurrentUser";
import { LoginForm } from "../components/auth/LoginForm";

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>) => ({
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
  }),
  beforeLoad: async ({ context }) => {
    const user = await ensureCurrentUser(context.queryClient);
    if (user) throw redirect({ to: "/today" });
  },
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { redirect: redirectTo } = Route.useSearch();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-semibold">Sign in</h1>
        <p className="mt-1 text-sm text-zinc-400">Welcome back</p>

        <div className="mt-6">
          <LoginForm
            onSuccess={() => navigate({ to: redirectTo ?? "/today" })}
          />
        </div>
      </div>
    </div>
  );
}