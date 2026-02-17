export type TodayHabit = {
  id: number;
  title: string;
  isActive: boolean;
  createdAt: string; // ISO
  userId: number;
  checkedToday: boolean;
  streak: number;
}

export type TodayResponse = TodayHabit[];