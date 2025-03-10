import { DateTime } from "luxon";

export function formatISODate(isoDate: string): string {
  return DateTime.fromISO(isoDate).toLocaleString(DateTime.DATETIME_MED);
}
