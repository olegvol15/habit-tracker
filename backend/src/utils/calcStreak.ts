export function calcStreak(checkinDates: Date[], todayDate: Date): number {
  const dateSet = new Set(
    checkinDates.map((d) => d.toISOString().slice(0, 10)),
  );

  let streak = 0;
  const current = new Date(todayDate.getTime());

  while (true) {
    const key = current.toISOString().slice(0, 10);
    if (!dateSet.has(key)) break;
    streak++;
    current.setUTCDate(current.getUTCDate() - 1);
  }

  return streak;
}
