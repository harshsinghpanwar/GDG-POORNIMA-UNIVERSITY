import { ChapterEvent } from '../types';

/**
 * Event Status Evaluation (Section 8.3 & Section 9)
 * 
 * Strict Rule:
 * Status is computed at runtime from the event's start and end timestamps
 * against the visitor's current time (NEVER from a manual flag).
 * An event whose end time has passed is Past and never shows a registration button.
 * Takes `now` as a parameter so it can be unit tested predictably.
 */
export function eventStatus(event: ChapterEvent, now: Date = new Date()): 'upcoming' | 'past' {
  // Use endsAt if available, otherwise fallback to startsAt or dateISO
  const endTimestamp = event.endsAt || event.startsAt || event.dateISO;
  if (!endTimestamp) return 'past';

  const endDate = new Date(endTimestamp);
  if (isNaN(endDate.getTime())) return 'past';

  return now.getTime() > endDate.getTime() ? 'past' : 'upcoming';
}

/**
 * Backward compatibility alias for components calling getEventState
 */
export function getEventState(event: ChapterEvent, now: Date = new Date()): 'completed' | 'upcoming' {
  const status = eventStatus(event, now);
  return status === 'past' ? 'completed' : 'upcoming';
}

/**
 * Returns accessible badge label and styling for event state
 */
export function getEventStatusBadge(event: ChapterEvent, now: Date = new Date()) {
  const status = eventStatus(event, now);
  if (status === 'past') {
    return {
      label: 'Past Event',
      ariaLabel: 'Past event - concluded',
      className: 'bg-[#F4F2EC] text-[#4B525C] border-[#E6E3DC]',
      canRegister: false
    };
  }
  return {
    label: 'Upcoming Event',
    ariaLabel: 'Upcoming event - registration available',
    className: 'bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]',
    canRegister: Boolean(event.registrationUrl)
  };
}

/**
 * Formats venue string safely removing any inadvertent PIN codes
 */
export function formatSafeVenue(venue?: string): string {
  if (!venue) return 'Online';
  // Strip any 6-digit Indian PIN codes per Section 3.1
  return venue.replace(/\b\d{6}\b/g, '').replace(/,\s*,/g, ',').trim();
}
