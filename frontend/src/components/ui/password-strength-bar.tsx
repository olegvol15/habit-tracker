import * as Progress from "@radix-ui/react-progress";
import type { calculatePasswordStrength } from "../../utils/validators";

const strengthConfig = {
  Weak: { value: 25, color: "bg-red-500", text: "text-red-400" },
  Medium: { value: 50, color: "bg-orange-500", text: "text-orange-400" },
  Strong: { value: 75, color: "bg-yellow-500", text: "text-yellow-400" },
  "Very Strong": { value: 100, color: "bg-green-500", text: "text-green-400" },
} as const;

export function PasswordStrengthBar({ strength }: { strength: ReturnType<typeof calculatePasswordStrength> }) {
  const config = strengthConfig[strength];
  return (
    <div className="mt-2">
      <Progress.Root
        value={config.value}
        max={100}
        className="h-2 w-full overflow-hidden rounded-full bg-zinc-800"
      >
        <Progress.Indicator
          className={`h-full rounded-full transition-all duration-300 ${config.color}`}
          style={{ width: `${config.value}%` }}
        />
      </Progress.Root>
      <p className={`mt-1 text-xs ${config.text}`}>{strength}</p>
    </div>
  );
}
