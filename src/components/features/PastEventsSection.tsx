import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Globe, 
  ExternalLink, 
  ArrowRight, 
  History, 
  CheckCircle2, 
  Filter
} from 'lucide-react';
import { CommunityEvent } from '../../types/community';
import { COMMUNITY_CONFIG } from '../../config/community';
import { formatSafeVenue } from '../../lib/eventStatus';
import { formatDisplayDate, formatTimeRangeIST } from '../../lib/format';
import { Badge } from '../ui/Badge';

interface PastEventsSectionProps {
  events: CommunityEvent[];
}

export const PastEventsSection: React.FC<PastEventsSectionProps> = ({ events }) => {
  const [selectedFormat, setSelectedFormat] = useState<'all' | 'in-person' | 'virtual'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter events based on selections
  const filteredEvents = events.filter((event) => {
    if (selectedFormat !== 'all') {
      const isVirtual = event.format.toLowerCase().includes('virtual');
      if (selectedFormat === 'virtual' && !isVirtual) return false;
      if (selectedFormat === 'in-person' && isVirtual) return false;
    }
    if (selectedCategory !== 'all') {
      if (!event.categories.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase())) {
        return false;
      }
    }
    return true;
  });

  const nodeColors = ['#1A73E8', '#D93025', '#F9AB00', '#188038'];

  return (
    <section className="py-12 md:py-16 bg-[#FBFAF7] border-y border-[#E6E3DC]" aria-labelledby="past-events-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header with Title and Verified Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0FE] text-[#1557B0] text-xs font-mono font-semibold tracking-wide border border-[#CEE0FD]">
              <History className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Chapter Archive</span>
            </div>
            
            <h2 id="past-events-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-[#15171A] tracking-tight">
              Past Events & Technical Workshops
            </h2>
            
            <p className="text-sm sm:text-base text-[#4B525C] max-w-2xl leading-relaxed">
              Records of completed workshops, hackathons, and briefings organized by GDG on Campus Poornima University. All event information is verified against the official chapter directory.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <a
              href={COMMUNITY_CONFIG.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FFFFFF] border border-[#E6E3DC] hover:border-[#D1CDC2] text-xs font-semibold text-[#15171A] transition-colors shadow-2xs"
            >
              <span>View Official Directory</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#1557B0]" aria-hidden="true" />
              <span className="sr-only">(opens official chapter page in a new tab)</span>
            </a>

            <Link
              to="/events"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1A73E8] hover:bg-[#1557B0] text-xs font-semibold text-white transition-colors shadow-2xs"
            >
              <span>All Events</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#E6E3DC] flex flex-wrap items-center justify-between gap-4 shadow-2xs">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#4B525C] font-semibold flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-[#1557B0]" aria-hidden="true" />
              <span>Filter:</span>
            </span>

            <button
              type="button"
              onClick={() => { setSelectedFormat('all'); setSelectedCategory('all'); }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedFormat === 'all' && selectedCategory === 'all'
                  ? 'bg-[#1557B0] text-white shadow-2xs'
                  : 'bg-[#F4F2EC] text-[#4B525C] hover:bg-[#E6E3DC]'
              }`}
            >
              All Events ({events.length})
            </button>

            <button
              type="button"
              onClick={() => setSelectedFormat(selectedFormat === 'in-person' ? 'all' : 'in-person')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedFormat === 'in-person'
                  ? 'bg-[#1557B0] text-white shadow-2xs'
                  : 'bg-[#F4F2EC] text-[#4B525C] hover:bg-[#E6E3DC]'
              }`}
            >
              In-Person
            </button>

            <button
              type="button"
              onClick={() => setSelectedFormat(selectedFormat === 'virtual' ? 'all' : 'virtual')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedFormat === 'virtual'
                  ? 'bg-[#1557B0] text-white shadow-2xs'
                  : 'bg-[#F4F2EC] text-[#4B525C] hover:bg-[#E6E3DC]'
              }`}
            >
              Virtual
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory(selectedCategory === 'Hackathon' ? 'all' : 'Hackathon')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedCategory === 'Hackathon'
                  ? 'bg-[#1557B0] text-white shadow-2xs'
                  : 'bg-[#F4F2EC] text-[#4B525C] hover:bg-[#E6E3DC]'
              }`}
            >
              Hackathon
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory(selectedCategory === 'Workshop' ? 'all' : 'Workshop')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedCategory === 'Workshop'
                  ? 'bg-[#1557B0] text-white shadow-2xs'
                  : 'bg-[#F4F2EC] text-[#4B525C] hover:bg-[#E6E3DC]'
              }`}
            >
              Workshop
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory(selectedCategory === 'AI' ? 'all' : 'AI')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedCategory === 'AI'
                  ? 'bg-[#1557B0] text-white shadow-2xs'
                  : 'bg-[#F4F2EC] text-[#4B525C] hover:bg-[#E6E3DC]'
              }`}
            >
              AI
            </button>
          </div>

          <span className="text-xs text-[#4B525C] font-mono">
            Showing {filteredEvents.length} of {events.length} past events
          </span>
        </div>

        {/* Branch Graph Timeline Representation */}
        <div className="relative pl-6 sm:pl-10 space-y-6 before:absolute before:left-3 sm:before:left-4.5 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#E6E3DC]">
          {filteredEvents.map((event, index) => {
            const nodeColor = nodeColors[index % nodeColors.length];
            const displayDateStr = event.displayDate || formatDisplayDate(event.startsAt || event.dateISO || '');
            const timeStr = event.timeIST || formatTimeRangeIST(event.startsAt, event.endsAt);
            const safeVenueStr = formatSafeVenue(event.venue);
            const isVirtual = event.format.toLowerCase().includes('virtual');

            return (
              <div key={event.id} className="relative group">
                
                {/* Branch Graph Node Commit Marker */}
                <div
                  className="absolute -left-6 sm:-left-10 top-6 w-6 h-6 rounded-full bg-[#FBFAF7] border-2 flex items-center justify-center transition-transform group-hover:scale-110 shadow-2xs"
                  style={{ borderColor: nodeColor }}
                  aria-hidden="true"
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: nodeColor }}
                  />
                </div>

                {/* Event Card Content */}
                <div className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E6E3DC] hover:border-[#D1CDC2] hover:shadow-[0_4px_16px_-4px_rgba(21,23,26,0.06)] transition-all flex flex-col md:flex-row md:items-start justify-between gap-6">
                  
                  {/* Left Column: Event Details */}
                  <div className="space-y-3.5 flex-1 min-w-0">
                    {/* Top Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6]">
                        <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Concluded</span>
                      </span>

                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-[#F4F2EC] border border-[#E6E3DC] text-[#15171A]">
                        {isVirtual ? (
                          <Globe className="w-3 h-3 text-[#1557B0]" aria-hidden="true" />
                        ) : (
                          <MapPin className="w-3 h-3 text-[#D93025]" aria-hidden="true" />
                        )}
                        <span>{event.format}</span>
                      </span>

                      {event.categories.map((cat) => (
                        <Badge key={cat} variant="blue" size="sm">
                          {cat}
                        </Badge>
                      ))}
                    </div>

                    {/* Event Title */}
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-[#15171A] group-hover:text-[#1557B0] transition-colors leading-snug">
                      <Link 
                        to={`/events/${event.slug}`}
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] rounded"
                      >
                        {event.title}
                      </Link>
                    </h3>

                    {/* Summary */}
                    <p className="text-sm sm:text-base text-[#4B525C] leading-relaxed max-w-3xl">
                      {event.summary}
                    </p>

                    {/* Key Notes if present */}
                    {event.notes && (
                      <p className="text-xs text-[#5F6368] bg-[#FBFAF7] px-3 py-1.5 rounded-lg border border-[#E6E3DC] inline-block font-mono">
                        Note: {event.notes}
                      </p>
                    )}

                    {/* Metadata strip: Date, Time IST, Venue */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs text-[#4B525C] border-t border-[#F4F2EC]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#1A73E8] shrink-0" aria-hidden="true" />
                        <span className="font-semibold text-[#15171A]">{displayDateStr}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#188038] shrink-0" aria-hidden="true" />
                        <span>{timeStr}</span>
                      </div>

                      <div className="flex items-center gap-1.5 max-w-md">
                        <MapPin className="w-4 h-4 text-[#D93025] shrink-0" aria-hidden="true" />
                        <span className="truncate">{safeVenueStr}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Actions */}
                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#E6E3DC]">
                    <Link
                      to={`/events/${event.slug}`}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#1557B0] hover:bg-[#1A73E8] text-white text-xs font-semibold transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8]"
                    >
                      <span>Session Details</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>

                    <a
                      href={event.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FBFAF7] hover:bg-[#F4F2EC] text-[#4B525C] hover:text-[#15171A] text-xs font-medium border border-[#E6E3DC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8]"
                    >
                      <span>Official Page</span>
                      <ExternalLink className="w-3 h-3 text-[#1557B0]" aria-hidden="true" />
                      <span className="sr-only">(opens official event page in a new tab)</span>
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner with Verification Notice */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#E6E3DC] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4B525C]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#188038] shrink-0" aria-hidden="true" />
            <span>
              All 4 events above were sourced from the verified chapter listing at{' '}
              <a
                href={COMMUNITY_CONFIG.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1557B0] font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>gdg.community.dev</span>
                <ExternalLink className="w-3 h-3" />
              </a>.
            </span>
          </div>

          <Link
            to="/events"
            className="text-[#1557B0] font-semibold hover:underline inline-flex items-center gap-1 shrink-0"
          >
            <span>Explore full event archive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
};
