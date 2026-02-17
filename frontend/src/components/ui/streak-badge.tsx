type StreakBadgeProps = {
  streak: number;
  title: string;
};

function getTier(streak: number) {
  if (streak >= 100)
    return { color: "#f59e0b", glow: "shadow-amber-500/20" };
  if (streak >= 30)
    return { color: "#f97316", glow: "shadow-orange-500/20" };
  if (streak >= 14)
    return { color: "#10b981", glow: "shadow-emerald-500/20" };
  if (streak >= 7)
    return { color: "#14b8a6", glow: "shadow-teal-500/20" };
  if (streak >= 1)
    return { color: "#a1a1aa", glow: "shadow-none" };
  return { color: "#52525b", glow: "shadow-none" };
}

function FireIcon({ color, size = 48 }: { color: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      fillOpacity={0.15}
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c4.97 0 8-3.58 8-8 0-3.5-2-6.5-4-8.5 0 2.5-2 4-3.5 4C13.5 9.5 14 7 12 2c-1.5 3-3 4.5-3 7 0 1.5-.5 3-2.5 3.5C5 13 4 14.5 4 17c0 3.31 2.69 5 8 5z" />
    </svg>
  );
}

export function StreakBadge({ streak, title }: StreakBadgeProps) {
  const tier = getTier(streak);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-6 flex flex-col items-center gap-1 shadow-lg ${tier.glow}`}
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${tier.color}, transparent 70%)`,
        }}
      />

      <div className="relative flex flex-col items-center">
        <FireIcon color={tier.color} size={52} />
        <span
          className="text-3xl font-extrabold tabular-nums -mt-0.5"
          style={{ color: tier.color }}
        >
          {streak}
        </span>
        <span
          className="text-[10px] font-semibold uppercase tracking-widest mt-0.5"
          style={{ color: tier.color }}
        >
          days
        </span>
      </div>

      <p className="relative text-sm font-medium text-zinc-200 mt-2 truncate max-w-full">
        {title}
      </p>
    </div>
  );
}
