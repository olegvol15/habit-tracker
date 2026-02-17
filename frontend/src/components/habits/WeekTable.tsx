import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { DropdownMenu } from "../ui/dropdown-menu";
import { useToggleCheckin, useWeekHabits, useDeleteHabit, useEditHabit } from "../../hooks/habits";
import { validateHabitTitle } from "../../utils/validators";

function getMonday(): string {
  const now = new Date();
  const day = now.getUTCDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + diff),
  );
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
    d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });

  return `${fmt(s)} – ${fmt(e)}`;
}

function getDayLabel(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00.000Z`);
  return d.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });
}

function HabitRow({
  habit,
  editHabit,
  deleteHabit,
  children,
}: {
  habit: { id: number; title: string };
  editHabit: ReturnType<typeof useEditHabit>;
  deleteHabit: ReturnType<typeof useDeleteHabit>;
  children: React.ReactNode;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(habit.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const save = () => {
    const trimmed = draft.trim();
    if (trimmed === habit.title) { setEditing(false); return; }

    const titleError = validateHabitTitle(trimmed);
    if (titleError) { toast.error(titleError); return; }

    editHabit.mutate({ habitId: habit.id, title: trimmed });
    setEditing(false);
  };

  return (
    <tr>
      <td className="py-2 pr-8 text-base font-medium text-white max-w-[160px] sm:max-w-[220px]">
        <div className="flex items-center gap-0.5">
          {editing ? (
            <input
              ref={inputRef}
              size={Math.max(draft.length, 1)}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={save}
              onKeyDown={(e) => {
                if (e.key === "Enter") save();
                if (e.key === "Escape") {
                  setDraft(habit.title);
                  setEditing(false);
                }
              }}
              className="min-w-0 max-w-full bg-transparent border-b border-zinc-500 text-sm text-white outline-none py-0.5"
            />
          ) : (
            <span className="truncate">{habit.title}</span>
          )}
          <DropdownMenu
            items={[
              {
                label: "Edit",
                icon: <Edit size={14} />,
                variant: "default",
                onClick: () => {
                  setDraft(habit.title);
                  setEditing(true);
                },
              },
              {
                label: "Delete",
                icon: <Trash2 size={14} />,
                variant: "danger",
                onClick: () => deleteHabit.mutate(habit.id),
              },
            ]}
          />
        </div>
      </td>
      {children}
    </tr>
  );
}

export function WeekTable() {
  const [start, setStart] = useState(getMonday);

  const { data, isLoading, error } = useWeekHabits(start);
  const toggleCheckin = useToggleCheckin(start);
  const editHabit = useEditHabit();
  const deleteHabit = useDeleteHabit();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setStart((s) => addDays(s, -7))}
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline ml-1">Prev</span>
        </Button>

        <span className="text-sm font-medium text-zinc-300">
          {formatRange(start)}
        </span>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setStart((s) => addDays(s, 7))}
        >
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
                <th className="pb-3 pr-8 text-left text-sm font-medium text-zinc-500 w-0">
                  Habit
                </th>
                {data.days.map((day) => (
                  <th
                    key={day}
                    className="pb-3 pl-3 text-center text-sm font-medium text-zinc-500"
                  >
                    {getDayLabel(day)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.habits.map((habit) => (
                <HabitRow
                  key={habit.id}
                  habit={habit}
                  editHabit={editHabit}
                  deleteHabit={deleteHabit}
                >
                  {data.days.map((day) => {
                    const checked =
                      data.checkins[String(habit.id)]?.[day] ?? false;
                    return (
                      <td key={day} className="py-2 pl-3">
                        <div className="flex justify-center">
                          <button
                            type="button"
                            aria-label={
                              checked
                                ? `Uncheck ${habit.title} for ${day}`
                                : `Check ${habit.title} for ${day}`
                            }
                            onClick={() =>
                              toggleCheckin.mutate({
                                habitId: habit.id,
                                payload: { date: day },
                              })
                            }
                            className={[
                              "h-10 w-10 rounded-lg border transition-colors cursor-pointer",
                              "hover:opacity-80",
                              checked
                                ? "border-emerald-600 bg-emerald-500"
                                : "border-zinc-700 bg-zinc-800 hover:border-zinc-600",
                            ].join(" ")}
                          />
                        </div>
                      </td>
                    );
                  })}
                </HabitRow>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
