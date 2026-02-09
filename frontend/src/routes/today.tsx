import { createFileRoute } from "@tanstack/react-router";
import { apiKeys } from "../hooks/api-keys";
import { todayApi } from "../api/todayApi";
import { useTodayQuery } from "../hooks/today";

const userId = 8; // временно, как в Postman (потом заменим на auth/me)

export const Route = createFileRoute("/today")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: apiKeys.today(userId),
      queryFn: () => todayApi.getToday(userId),
      staleTime: 30_000,
    });
    return null;
  },
  component: TodayPage,
});

function TodayPage() {
  const { data, isLoading, isError, error } = useTodayQuery(userId);

  if (isLoading) return <div className="text-zinc-400">Loading...</div>;
  if (isError) return <div className="text-red-400">Error: {(error as Error).message}</div>;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Today</h1>
        <p className="text-zinc-400 text-sm">User: {userId}</p>
      </div>

      <div className="grid gap-3">
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
