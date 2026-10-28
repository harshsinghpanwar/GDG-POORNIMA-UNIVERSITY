/**
 * Formatting Utilities (Section 8.3)
 * Strict Requirement: Dates and times are formatted with Intl.DateTimeFormat
 * in the Asia/Kolkata time zone and labelled "IST".
 */

const TIME_ZONE = 'Asia/Kolkata';

/**
 * Formats an ISO date into readable Indian Standard Time date string
 */
export function formatDisplayDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: TIME_ZONE,
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(d);
  } catch {
    return isoString;
  }
}

/**
 * Formats start and end times in IST
 */
export function formatTimeRangeIST(startIso: string, endIso?: string): string {
  try {
    const start = new Date(startIso);
    if (isNaN(start.getTime())) return 'IST';

    const timeFormatter = new Intl.DateTimeFormat('en-IN', {
      timeZone: TIME_ZONE,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    const formattedStart = timeFormatter.format(start);

    if (endIso) {
      const end = new Date(endIso);
      if (!isNaN(end.getTime())) {
        const formattedEnd = timeFormatter.format(end);
        return `${formattedStart} to ${formattedEnd} IST`;
      }
    }

    return `${formattedStart} IST`;
  } catch {
    return 'IST';
  }
}

/**
 * Truncates text safely with trailing ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}

/**
 * Creates URL-friendly slug from string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
