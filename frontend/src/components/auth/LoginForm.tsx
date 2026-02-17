import { useState } from "react";
import { toast } from "sonner";
import { useLogin } from "../../hooks/auth";
import { Button } from "../ui/button";
import { validateEmail, validatePassword } from "../../utils/validators";

type LoginFormProps = {
  onSuccess: () => void;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    if (emailError) { toast.error(emailError); return; }

    const passwordError = validatePassword(password);
    if (passwordError) { toast.error(passwordError); return; }

    try {
      await login.mutateAsync({ email, password });
      onSuccess();
    } catch (err: unknown) {
      // 401 is skipped by global interceptor, so handle it here
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-400">
          Email
        </span>
        <input
          type="email"
          required
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-3 sm:py-2.5 text-base sm:text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-400">
          Password
        </span>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-3 sm:py-2.5 text-base sm:text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
        />
      </label>

<Button type="submit" disabled={login.isPending} className="mt-2 w-full">
        {login.isPending ? "Signing in..." : "Sign in"}
      </Button>

    </form>
  );
}
