import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useToggleCheckin, useWeekHabits, useDeleteHabit, useEditHabit } from "../../hooks/habits";
import { addDays } from "../../utils/dayFormatter";
import HabitRow from "./HabitRow";
import { formatRange, getMonday, getDayLabel } from "../../utils/dayFormatter";


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
