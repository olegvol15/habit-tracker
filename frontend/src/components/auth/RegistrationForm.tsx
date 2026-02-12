import { useState } from "react";
import { useRegister } from "../../hooks/auth";

type RegistrationFormProps = {
  onSuccess: () => void;
};

export function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const register = useRegister();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await register.mutateAsync({
        email,
        password,
        name: name || null,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
      onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-400">
          Name
        </span>
        <input
          type="text"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-3 sm:py-2.5 text-base sm:text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-400">
          Email
        </span>
        <input
          type="email"
          required
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
        disabled={register.isPending}
        className="mt-2 w-full rounded-lg bg-white py-3 sm:py-2.5 text-base sm:text-sm font-semibold text-zinc-950 transition-all hover:bg-zinc-200 active:scale-[0.98] disabled:opacity-50"
      >
        {register.isPending ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
