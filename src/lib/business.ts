import { business } from '@/config/business';

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/** Current weekday + minutes-since-midnight in Lagos time, regardless of the visitor's device clock. */
function lagosNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: business.timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return {
    day: days.indexOf(get('weekday')),
    minutes: (Number(get('hour')) % 24) * 60 + Number(get('minute')),
  };
}

/** Is the kitchen open on `day` (0–6) at `minutes` past midnight? */
export function isOpenAt(day: number, minutes: number) {
  const h = business.hours[day];
  if (!h) return false;
  return minutes >= toMinutes(h.open) && minutes < toMinutes(h.close);
}

export function isOpenNow() {
  const { day, minutes } = lagosNow();
  return isOpenAt(day, minutes);
}

/**
 * Validate a scheduled "YYYY-MM-DD" + "HH:MM" (entered as Lagos time).
 * Returns an error message, or null if it's fine.
 */
export function validateSchedule(date: string, time: string): string | null {
  if (!date || !time) return 'Please choose both a date and a time';
  // Lagos is UTC+1 all year (no DST).
  const when = new Date(`${date}T${time}:00+01:00`);
  if (Number.isNaN(when.getTime())) return 'Please choose a valid date and time';
  if (when.getTime() < Date.now() + 30 * 60 * 1000) {
    return 'Please pick a time at least 30 minutes from now';
  }
  const { day, minutes } = lagosNow(when);
  if (!isOpenAt(day, minutes)) {
    return `We're closed at that time. Hours: ${business.hoursText.join(', ')}`;
  }
  return null;
}

export const formatNaira = (amount: number) => `₦${amount.toLocaleString('en-NG')}`;
