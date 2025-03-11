import { DateTime } from "luxon";

export function formatISODateTime(isoDate: string): string {
  return DateTime.fromISO(isoDate).toLocaleString(DateTime.DATETIME_MED);
}

export function formatISODate(isoDate: string): string {
  return DateTime.fromISO(isoDate).toLocaleString(DateTime.DATE_MED);
}
