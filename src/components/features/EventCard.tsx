import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Globe, ExternalLink, ArrowRight } from 'lucide-react';
import { CommunityEvent } from '../../types/community';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { eventStatus, formatSafeVenue } from '../../lib/eventStatus';
import { formatDisplayDate, formatTimeRangeIST } from '../../lib/format';

export interface EventCardProps {
  event: CommunityEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const status = eventStatus(event);
  const isUpcoming = status === 'upcoming';
  const displayDateStr = event.displayDate || formatDisplayDate(event.startsAt || event.dateISO || '');
  const timeStr = event.timeIST || formatTimeRangeIST(event.startsAt, event.endsAt);
  const safeVenueStr = formatSafeVenue(event.venue);

  return (
    <Card 
      variant="interactive" 
      padding="none"
      className="flex flex-col h-full border-[#E6E3DC] bg-[#FFFFFF] hover:border-[#D1CDC2] transition-all group overflow-hidden"
    >
      {/* Artwork Area with Tasteful Illustrated Fallback (Section 8.3) */}
      <div className="relative h-36 bg-[#F4F2EC] border-b border-[#E6E3DC] p-4 flex flex-col justify-between overflow-hidden">
        {/* Subtle decorative branch graph motif in artwork area */}
        <div className="absolute right-3 top-3 opacity-30 pointer-events-none" aria-hidden="true">
          <svg width="100" height="40" viewBox="0 0 100 40" fill="none">
            <line x1="5" y1="20" x2="95" y2="20" stroke="#15171A" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M20 20C35 20 45 8 60 8H80" stroke="#1A73E8" strokeWidth="2" fill="none" />
            <circle cx="20" cy="20" r="3.5" fill="#1A73E8" />
            <circle cx="60" cy="8" r="3" fill="#D93025" />
            <circle cx="80" cy="8" r="3" fill="#188038" />
          </svg>
        </div>

        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 z-10">
          <div className="flex flex-wrap gap-1.5">
            {event.categories.map((cat) => (
              <Badge key={cat} variant="blue" size="sm">
                {cat}
              </Badge>
            ))}
          </div>

          <Badge variant={isUpcoming ? "upcoming" : "completed"} size="sm">
            {isUpcoming ? "Upcoming Event" : "Past Event"}
          </Badge>
        </div>

        {/* Format Pill on Bottom of Artwork */}
        <div className="z-10 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-[#FFFFFF] border border-[#E6E3DC] text-[#15171A]">
            {event.format.toLowerCase().includes('virtual') ? (
              <Globe className="w-3 h-3 text-[#1557B0]" aria-hidden="true" />
            ) : (
              <MapPin className="w-3 h-3 text-[#D93025]" aria-hidden="true" />
            )}
            <span>{event.format}</span>
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold font-display text-[#15171A] group-hover:text-[#1557B0] transition-colors mb-2">
            <Link 
              to={`/events/${event.slug}`} 
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] rounded"
            >
              {event.title}
            </Link>
          </h3>

          {/* Summary */}
          <p className="text-sm text-[#4B525C] leading-relaxed mb-4 line-clamp-2">
            {event.summary}
          </p>

          {/* Metadata: Date and Time in IST, Venue */}
          <div className="space-y-2 text-xs text-[#4B525C] pt-3 border-t border-[#E6E3DC]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#1A73E8] shrink-0" aria-hidden="true" />
              <span>{displayDateStr}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#188038] shrink-0" aria-hidden="true" />
              <span>{timeStr}</span>
            </div>

            <div className="flex items-start gap-2">
              {event.format.toLowerCase().includes('virtual') ? (
                <Globe className="w-4 h-4 text-[#1557B0] shrink-0 mt-0.5" aria-hidden="true" />
              ) : (
                <MapPin className="w-4 h-4 text-[#4B525C] shrink-0 mt-0.5" aria-hidden="true" />
              )}
              <span className="line-clamp-1">{safeVenueStr}</span>
            </div>
          </div>
        </div>

        {/* Card Footer Actions (Section 8.3) */}
        <div className="mt-6 pt-4 border-t border-[#E6E3DC] flex items-center justify-between gap-3 text-xs">
          {event.costNote && (
            <span className="text-[11px] font-mono text-[#4B525C]">
              {event.costNote}
            </span>
          )}

          <div className="flex items-center gap-2 ml-auto">
            {isUpcoming && event.registrationUrl ? (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A73E8] hover:bg-[#1557B0] text-white font-semibold transition-colors shadow-xs"
              >
                <span>Register</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="sr-only">(opens registration in a new tab)</span>
              </a>
            ) : (
              <Link
                to={`/events/${event.slug}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F4F2EC] hover:bg-[#E6E3DC] text-[#15171A] font-semibold transition-colors"
              >
                <span>View details</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
