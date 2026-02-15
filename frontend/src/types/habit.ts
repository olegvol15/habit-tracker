export type Habit = {
  id: number;
  title: string;
  isActive: boolean;
  createdAt: string;
  userId: number;
};

export type CreateHabitInput = {
  title: string;
};

export type HabitsResponse = Habit[];

export type HabitsWeekResponse = {
  days: string[];
  habits: Pick<Habit, "id" | "title" | "createdAt">[];
  checkins: Record<string, Record<string, boolean>>;
};

export type ToggleCheckinInput = {
  date: string
}

export type ToggleCheckinResponse  = {
  habitId: number
  date: string
  checked: boolean
}
