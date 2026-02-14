import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useWeekHabits } from "../../hooks/habits";

function getMonday(): string {
  const now = new Date();
  const day = now.getUTCDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + diff));
  return toYMD(monday);
}

function toYMD(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(`${dateStr}T00:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return toYMD(d);
}

function formatRange(start: string): string {
  const s = new Date(`${start}T00:00:00.000Z`);
  const e = new Date(`${start}T00:00:00.000Z`);
  e.setUTCDate(e.getUTCDate() + 6);

  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

  return `${fmt(s)} – ${fmt(e)}`;
}

function getDayLabel(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00.000Z`);
  return d.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });
}

type WeekTableProps = {
  userId: number;
};

export function WeekTable({ userId }: WeekTableProps) {
  const [start, setStart] = useState(getMonday);

  const { data, isLoading, error } = useWeekHabits(userId, start);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => setStart((s) => addDays(s, -7))}>
          <ChevronLeft size={16} />
          <span className="hidden sm:inline ml-1">Prev</span>
        </Button>

        <span className="text-sm font-medium text-zinc-300">{formatRange(start)}</span>

        <Button variant="ghost" size="sm" onClick={() => setStart((s) => addDays(s, 7))}>
          <span className="hidden sm:inline mr-1">Next</span>
          <ChevronRight size={16} />
        </Button>
      </div>

      {isLoading && <p className="text-center text-zinc-400">Loading...</p>}

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center">
          <p className="text-red-400">Failed to load week data</p>
        </div>
      )}

      {data && data.habits.length === 0 && (
        <p className="text-center text-zinc-400">No active habits yet.</p>
      )}

      {data && data.habits.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="pb-2 pr-3 text-left text-xs font-medium text-zinc-500">Habit</th>
                {data.days.map((day) => (
                  <th key={day} className="pb-2 text-center text-xs font-medium text-zinc-500">
                    {getDayLabel(day)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.habits.map((habit) => (
                <tr key={habit.id}>
                  <td className="py-1.5 pr-3 text-sm text-white truncate max-w-[140px] sm:max-w-[200px]">
                    {habit.title}
                  </td>
                  {data.days.map((day) => {
                    const checked = data.checkins[String(habit.id)]?.[day] ?? false;
                    return (
                      <td key={day} className="py-1.5">
                        <div className="flex justify-center">
                          <div
                            className={[
                              "h-8 w-8 rounded-md border transition-colors",
                              checked
                                ? "border-emerald-600 bg-emerald-500"
                                : "border-zinc-700 bg-zinc-800",
                            ].join(" ")}
                          />
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
