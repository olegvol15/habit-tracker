export function addDaysUTC(date, days) {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

export function toYMD(date) {
  return date.toISOString().slice(0, 10);
}
