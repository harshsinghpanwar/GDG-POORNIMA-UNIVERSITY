import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Globe, 
  ArrowLeft, 
  ExternalLink, 
  Share2, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck 
} from 'lucide-react';
import { dataSource } from '../services/dataSource';
import { CommunityEvent } from '../types/community';
import { usePageSeo } from '../lib/seo';
import { eventStatus, formatSafeVenue } from '../lib/eventStatus';
import { formatDisplayDate, formatTimeRangeIST } from '../lib/format';
import { Container } from '../components/ui/Container';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const EventDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<CommunityEvent | null>(null);
  const [allEvents, setAllEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadEventData() {
      setLoading(true);
      const [eventsList, currentEvt] = await Promise.all([
        dataSource.getEvents(),
        slug ? dataSource.getEventBySlug(slug) : null
      ]);
      setAllEvents(eventsList);
      setEvent(currentEvt);
      setLoading(false);
    }
    loadEventData();
  }, [slug]);

  usePageSeo({
    title: event ? event.title : "Event Details",
    description: event?.summary || "GDG on Campus Poornima University event details"
  });

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Find previous and next events (Section 8.4)
  const currentIndex = event ? allEvents.findIndex(e => e.slug === event.slug) : -1;
  const prevEvent = currentIndex > 0 ? allEvents[currentIndex - 1] : null;
  const nextEvent = currentIndex >= 0 && currentIndex < allEvents.length - 1 ? allEvents[currentIndex + 1] : null;

  if (loading) {
    return (
      <Container size="md" className="py-20 text-center">
        <p className="text-[#4B525C]">Loading event details...</p>
      </Container>
    );
  }

  // Friendly not found state for unknown event slug (Section 6 & 8.4)
  if (!event) {
    return (
      <div className="py-16 md:py-24">
        <Container size="md" className="text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-[#F4F2EC] border border-[#E6E3DC] text-[#4B525C] flex items-center justify-center mx-auto">
            <Calendar className="w-7 h-7 text-[#1A73E8]" aria-hidden="true" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#15171A]">
              Event Not Found
            </h1>
            <p className="text-sm text-[#4B525C] max-w-md mx-auto leading-relaxed">
              We couldn't locate an event matching "{slug}". It may have moved or the link may be inaccurate.
            </p>
          </div>
          <div className="pt-2">
            <Link to="/events">
              <Button variant="primary" size="md">
                Return to Events Directory
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  const status = eventStatus(event);
  const isUpcoming = status === 'upcoming';
  const displayDateStr = event.displayDate || formatDisplayDate(event.startsAt || event.dateISO || '');
  const timeStr = event.timeIST || formatTimeRangeIST(event.startsAt, event.endsAt);
  const safeVenueStr = formatSafeVenue(event.venue);
  const isInPerson = !event.format.toLowerCase().includes('virtual');

  // Google Maps URL with encodeURIComponent (Section 8.4)
  const mapsUrl = event.venue 
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue)}`
    : null;

  return (
    <div className="py-12 md:py-20 space-y-12">
      <Container size="md">
        
        {/* Back Link */}
        <Link 
          to="/events"
          className="inline-flex items-center gap-2 text-sm text-[#4B525C] hover:text-[#1557B0] transition-colors mb-6 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] rounded px-1"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Events</span>
        </Link>

        {/* Event Main Container */}
        <article className="bg-[#FFFFFF] border border-[#E6E3DC] rounded-3xl p-6 sm:p-10 space-y-8 shadow-[0_4px_16px_-4px_rgba(21,23,26,0.06)]">
          
          <div className="space-y-4">
            
            {/* Status & Categories */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {event.categories.map((c) => (
                  <Badge key={c} variant="blue" size="md">
                    {c}
                  </Badge>
                ))}
              </div>

              {/* Status Badge (Section 8.4) */}
              <Badge variant={isUpcoming ? "upcoming" : "completed"} size="md">
                {isUpcoming ? "Upcoming Event" : "Past Event • Concluded"}
              </Badge>
            </div>

            {/* Title (One h1 per page, Section 5.2) */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-[#15171A] tracking-tight leading-tight">
              {event.title}
            </h1>

            {/* Metadata Bar (Date & Time in IST, Venue) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E6E3DC] text-sm">
              <div className="flex items-center gap-3 text-[#15171A]">
                <Calendar className="w-5 h-5 text-[#1A73E8] shrink-0" aria-hidden="true" />
                <div>
                  <span className="text-xs text-[#4B525C] block">Date</span>
                  <span className="font-semibold">{displayDateStr}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#15171A]">
                <Clock className="w-5 h-5 text-[#188038] shrink-0" aria-hidden="true" />
                <div>
                  <span className="text-xs text-[#4B525C] block">Time</span>
                  <span className="font-semibold">{timeStr}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#15171A] sm:col-span-2">
                {isInPerson ? (
                  <MapPin className="w-5 h-5 text-[#D93025] shrink-0 mt-0.5" aria-hidden="true" />
                ) : (
                  <Globe className="w-5 h-5 text-[#1557B0] shrink-0 mt-0.5" aria-hidden="true" />
                )}
                <div className="space-y-1">
                  <span className="text-xs text-[#4B525C] block">Venue & Format ({event.format})</span>
                  <p className="font-semibold">{safeVenueStr}</p>
                  
                  {/* Open in Maps link for in-person events (Section 8.4) */}
                  {isInPerson && mapsUrl && (
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#1557B0] hover:underline font-semibold pt-0.5"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      <span className="sr-only">(opens Google Maps in a new tab)</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-6 pt-6 border-t border-[#E6E3DC]">
            <div>
              <h2 className="text-base font-bold text-[#15171A] uppercase tracking-wider mb-2 font-display">
                About this Session
              </h2>
              <p className="text-[#4B525C] leading-relaxed sm:text-lg">
                {event.description || event.summary}
              </p>
            </div>

            {event.notes && (
              <div className="p-5 rounded-2xl bg-[#F4F2EC] border border-[#E6E3DC] space-y-2">
                <h3 className="text-xs font-mono font-bold text-[#15171A] uppercase tracking-wider">
                  Session Notes
                </h3>
                <p className="text-sm text-[#4B525C] leading-relaxed">
                  {event.notes}
                </p>
              </div>
            )}

            {/* Agenda section ONLY when provided in data (Section 8.4) */}
            {event.agenda && event.agenda.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-[#E6E3DC]">
                <h2 className="text-base font-bold text-[#15171A] uppercase tracking-wider font-display">
                  Agenda
                </h2>
                <div className="space-y-2">
                  {event.agenda.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#FBFAF7] border border-[#E6E3DC] flex items-start gap-3">
                      <span className="text-xs font-mono font-bold text-[#1557B0] shrink-0">{item.time}</span>
                      <div>
                        <span className="text-sm font-semibold text-[#15171A] block">{item.title}</span>
                        {item.description && <p className="text-xs text-[#4B525C]">{item.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Speakers section ONLY when provided in data (Section 8.4) */}
            {event.speakers && event.speakers.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-[#E6E3DC]">
                <h2 className="text-base font-bold text-[#15171A] uppercase tracking-wider font-display">
                  Speakers
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.speakers.map((spk, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#FBFAF7] border border-[#E6E3DC]">
                      <span className="text-sm font-bold text-[#15171A] block">{spk.name}</span>
                      <span className="text-xs text-[#4B525C]">{spk.roleOrAffiliation}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cost note notice */}
            {event.costNote && (
              <div className="p-4 rounded-xl bg-[#FBFAF7] border border-[#E6E3DC] text-xs text-[#4B525C] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#188038] shrink-0" />
                <span>{event.costNote}</span>
              </div>
            )}
          </div>

          {/* Action CTAs (Section 8.4):
              Upcoming: Register (registrationUrl)
              Past: View on official page (officialUrl)
          */}
          <div className="pt-6 border-t border-[#E6E3DC] flex flex-wrap items-center justify-between gap-4">
            <div>
              {isUpcoming && event.registrationUrl ? (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#1A73E8] hover:bg-[#1557B0] text-white font-semibold text-sm transition-colors shadow-xs"
                >
                  <span>Register for Event</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <a
                  href={event.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#1A73E8] hover:bg-[#1557B0] text-white font-semibold text-sm transition-colors shadow-xs"
                >
                  <span>View on official page</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            <Button
              variant="secondary"
              size="md"
              onClick={handleShare}
              icon={copied ? <Check className="w-4 h-4 text-[#188038]" /> : <Share2 className="w-4 h-4" />}
            >
              {copied ? 'Link Copied!' : 'Share Event'}
            </Button>
          </div>

        </article>

        {/* Previous / Next Event Navigation (Section 8.4) */}
        <nav aria-label="Event pagination" className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevEvent ? (
            <Link
              to={`/events/${prevEvent.slug}`}
              className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E6E3DC] hover:border-[#D1CDC2] transition-colors flex items-center gap-3 text-left group"
            >
              <ChevronLeft className="w-5 h-5 text-[#4B525C] group-hover:-translate-x-1 transition-transform shrink-0" />
              <div className="min-w-0">
                <span className="text-[11px] font-mono text-[#4B525C] uppercase block">Previous Event</span>
                <span className="text-sm font-bold text-[#15171A] truncate block group-hover:text-[#1557B0] transition-colors">
                  {prevEvent.title}
                </span>
              </div>
            </Link>
          ) : <div />}

          {nextEvent ? (
            <Link
              to={`/events/${nextEvent.slug}`}
              className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E6E3DC] hover:border-[#D1CDC2] transition-colors flex items-center justify-end gap-3 text-right group sm:col-start-2"
            >
              <div className="min-w-0">
                <span className="text-[11px] font-mono text-[#4B525C] uppercase block">Next Event</span>
                <span className="text-sm font-bold text-[#15171A] truncate block group-hover:text-[#1557B0] transition-colors">
                  {nextEvent.title}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#4B525C] group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>
          ) : null}
        </nav>

      </Container>
    </div>
  );
};
