const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

/**
 * Today's calendar date in the visitor's timezone, formatted for a date input.
 * Building it from local parts avoids the UTC shift of toISOString().
 */
export function getTodayISO(date = new Date()): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/**
 * Format a YYYY-MM-DD value for display without parsing it as UTC.
 * Returns an empty string for an invalid or incomplete value.
 */
export function formatISODate(value: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return ''
  }

  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return ''
  }

  return `${day} ${MONTHS[month - 1]} ${year}`
}

/** Format a time input value (HH:MM) as a readable local time. */
export function formatTime(value: string): string {
  if (!/^\d{2}:\d{2}$/.test(value)) {
    return value
  }

  const [hours, minutes] = value.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const hour = hours % 12 || 12

  return `${hour}:${pad(minutes)} ${period}`
}
