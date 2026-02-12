import { useState } from "react";
import { useLogin } from "../../hooks/auth";

type LoginFormProps = {
  onSuccess: () => void;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const login = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login.mutateAsync({ email, password });
      onSuccess();
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ??
        (err instanceof Error ? err.message : "Something went wrong");
      setError(message);
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

      {error && (
        <div className="rounded-lg border border-red-800/50 bg-red-950/50 px-3.5 py-2.5 text-sm text-red-300">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={login.isPending}
        className="mt-2 w-full rounded-lg bg-white py-3 sm:py-2.5 text-base sm:text-sm font-semibold text-zinc-950 transition-all hover:bg-zinc-200 active:scale-[0.98] disabled:opacity-50"
      >
        {login.isPending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
