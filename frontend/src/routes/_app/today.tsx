import { createFileRoute } from "@tanstack/react-router";
import { useTodayQuery } from "../../hooks/today";
import { useCurrentUser } from "../../hooks/auth";
import BlurText from "../../components/ui/blur-text-animation";

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

      <div className="grid gap-3 mt-6">
        {data.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-zinc-300">
            No habits for today.
          </div>
        ) : (
          data.map((h) => (
            <div
              key={h.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 flex items-center justify-between"
            >
              <div className="min-w-0">
                <div className="font-medium truncate">{h.title}</div>
                <div className="text-xs text-zinc-400">
                  {h.checkedToday ? "Done today ✅" : "Not done yet"}
                </div>
              </div>

              <span
                className={[
                  "text-xs px-2 py-1 rounded-md border shrink-0",
                  h.checkedToday
                    ? "border-emerald-800 bg-emerald-950 text-emerald-200"
                    : "border-zinc-700 bg-zinc-950 text-zinc-300",
                ].join(" ")}
              >
                {h.checkedToday ? "Completed" : "Pending"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
