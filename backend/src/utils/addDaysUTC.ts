export function addDaysUTC(date: Date | string, days: number): Date {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

export function toYMD(date: Date): string {
  return date.toISOString().slice(0, 10);
}
