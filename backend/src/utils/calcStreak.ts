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

 export function calcHighestStreak(checkinDates: Date[]): number {
   if (!checkinDates.length) return 0;

   const sorted = [...new Set(checkinDates.map(d => d.toISOString().slice(0, 10)))].sort();

   let best = 1, current = 1;
   for (let i = 1; i < sorted.length; i++) {
     const prev = new Date(sorted[i - 1]!);
     prev.setUTCDate(prev.getUTCDate() + 1);
     if (prev.toISOString().slice(0, 10) === sorted[i]) {
       best = Math.max(best, ++current);
     } else {
       current = 1;
     }
   }
   return best;
 }
 