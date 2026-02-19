import { useState } from "react";
import { toast } from "sonner";
import { useRegister } from "../../hooks/auth";
import { Button } from "../ui/button";
import {
  validateEmail,
  validatePassword,
  calculatePasswordStrength,
} from "../../utils/validators";
import { PasswordStrengthBar } from "../ui/password-strength-bar";

type RegistrationFormProps = {
  onSuccess: () => void;
};

export function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = useRegister();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    if (emailError) {
      toast.error(emailError);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await register.mutateAsync({
        email,
        password,
        name: name || null,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
      onSuccess();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
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
        {password && (
          <PasswordStrengthBar strength={calculatePasswordStrength(password)} />
        )}
      </label>

      <label className="block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-400">
          Confirm Password
        </span>
        <input
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-3 sm:py-2.5 text-base sm:text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
        />
      </label>

      <Button
        type="submit"
        disabled={register.isPending}
        className="mt-2 w-full"
      >
        {register.isPending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
