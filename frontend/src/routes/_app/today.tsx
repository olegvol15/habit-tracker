import { createFileRoute } from "@tanstack/react-router";
import { useTodayQuery } from "../../hooks/today";
import { useCurrentUser } from "../../hooks/auth";
import BlurText from "../../components/ui/blur-text-animation";
import { StreakBadge } from "../../components/ui/streak-badge";

export const Route = createFileRoute("/_app/today")({
  component: TodayPage,
});

function TodayPage() {
  const { data: me } = useCurrentUser();
  const name = me?.user?.name;
  const { data, isLoading, isError, error } = useTodayQuery();

  if (isLoading) return <div className="text-zinc-400">Loading...</div>;
  if (isError)
    return (
      <div className="text-red-400">Error: {(error as Error).message}</div>
    );

  return (
    <div>
      <BlurText
        text={`Hello${name ? `, ${name}` : ""}! Let's look what you have done today!`}
        delay={200}
        animateBy="words"
        direction="top"
        className="text-3xl sm:text-5xl lg:text-7xl font-bold flex justify-center text-center"
      />

      {data.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-zinc-300 mt-6">
          No habits for today.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {data.map((h) => (
            <StreakBadge key={h.id} streak={h.streak} title={h.title} />
          ))}
        </div>
      )}
    </div>
  );
}
