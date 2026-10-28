import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, Search, X, AlertCircle, ExternalLink } from 'lucide-react';
import { dataSource } from '../services/dataSource';
import { CommunityEvent } from '../types/community';
import { eventStatus } from '../lib/eventStatus';
import { usePageSeo } from '../lib/seo';
import { Container } from '../components/ui/Container';
import { EventCard } from '../components/features/EventCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Chip } from '../components/ui/Chip';
import { COMMUNITY_CONFIG } from '../config/community';

export const Events: React.FC = () => {
  usePageSeo({
    title: "Events",
    description: "Workshops, hackathons, and technical sessions organized by GDG on Campus Poornima University, Jaipur. Search past and upcoming developer events."
  });

  const [searchParams, setSearchParams] = useSearchParams();

  // Sync state with URL search params (Section 8.3)
  const activeTab = searchParams.get('tab') === 'upcoming' ? 'upcoming' : 'past';
  const selectedCategory = searchParams.get('category') || 'all';
  const selectedFormat = searchParams.get('format') || 'all';
  const searchQuery = searchParams.get('q') || '';

  const [allEvents, setAllEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const data = await dataSource.getEvents();
        setAllEvents(data);

        const catSet = new Set<string>();
        data.forEach(e => e.categories.forEach(c => catSet.add(c)));
        setCategories(Array.from(catSet));
      } catch {
        setError('Failed to load events. Please refresh the page or check your connection.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Update query params helper
  const updateFilter = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, val]) => {
      if (!val || val === 'all' || val === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, val);
      }
    });
    setSearchParams(newParams, { replace: true });
  };

  const handleClearFilters = () => {
    const newParams = new URLSearchParams();
    if (activeTab === 'upcoming') {
      newParams.set('tab', 'upcoming');
    }
    setSearchParams(newParams);
  };

  // Status is computed at runtime from timestamps against current time (Section 8.3)
  const now = new Date();
  
  const eventsByTab = allEvents.filter(e => {
    const status = eventStatus(e, now);
    return activeTab === 'upcoming' ? status === 'upcoming' : status === 'past';
  });

  // Apply filters
  const filteredEvents = eventsByTab.filter(e => {
    if (selectedCategory !== 'all' && !e.categories.some(c => c.toLowerCase() === selectedCategory.toLowerCase())) {
      return false;
    }
    if (selectedFormat !== 'all') {
      if (selectedFormat === 'in-person' && !e.format.toLowerCase().includes('in-person')) return false;
      if (selectedFormat === 'virtual' && !e.format.toLowerCase().includes('virtual')) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = e.title.toLowerCase().includes(q);
      const matchSummary = e.summary.toLowerCase().includes(q);
      const matchVenue = Boolean(e.venue && e.venue.toLowerCase().includes(q));
      const matchCat = e.categories.some(c => c.toLowerCase().includes(q));
      if (!matchTitle && !matchSummary && !matchVenue && !matchCat) return false;
    }
    return true;
  });

  const nodeColors = ['#1A73E8', '#D93025', '#F9AB00', '#188038'];

  return (
    <div className="py-12 md:py-20 space-y-12">
      
      {/* Page Header */}
      <Container size="lg">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wide bg-[#E8F0FE] text-[#1557B0] border border-[#CEE0FD]">
            Events Directory
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#15171A] tracking-tight">
            Workshops, Hackathons & Tech Talks
          </h1>
          <p className="text-base sm:text-lg text-[#4B525C] leading-relaxed">
            Browse campus coding sessions, technical briefings, and orientation meetups at Poornima University.
          </p>
        </div>
      </Container>

      {/* Tabs: Upcoming vs Past (Section 8.3) */}
      <Container size="lg">
        <div className="flex border-b border-[#E6E3DC]" role="tablist" aria-label="Event Status Tabs">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'past'}
            onClick={() => updateFilter({ tab: null })}
            className={`px-6 py-3 font-display text-sm sm:text-base font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'past'
                ? 'border-[#1A73E8] text-[#1557B0] bg-[#E8F0FE]/40'
                : 'border-transparent text-[#4B525C] hover:text-[#15171A]'
            }`}
          >
            Past Events ({allEvents.filter(e => eventStatus(e, now) === 'past').length})
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'upcoming'}
            onClick={() => updateFilter({ tab: 'upcoming' })}
            className={`px-6 py-3 font-display text-sm sm:text-base font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'upcoming'
                ? 'border-[#1A73E8] text-[#1557B0] bg-[#E8F0FE]/40'
                : 'border-transparent text-[#4B525C] hover:text-[#15171A]'
            }`}
          >
            Upcoming Events ({allEvents.filter(e => eventStatus(e, now) === 'upcoming').length})
          </button>
        </div>
      </Container>

      {/* Filter and Search Controls (Section 8.3) */}
      <Container size="lg">
        <div className="bg-[#FFFFFF] p-4 sm:p-6 rounded-2xl border border-[#E6E3DC] shadow-2xs space-y-4">
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4B525C]" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => updateFilter({ q: e.target.value })}
                placeholder="Search by title, summary, venue, category..."
                aria-label="Search events"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#FBFAF7] border border-[#E6E3DC] text-sm text-[#15171A] placeholder-[#4B525C]/60 focus:outline-none focus:ring-2 focus:ring-[#1A73E8]"
              />
            </div>

            {/* Format Filter */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-medium text-[#4B525C]">Format:</span>
              <select
                value={selectedFormat}
                onChange={(e) => updateFilter({ format: e.target.value })}
                aria-label="Filter by format"
                className="px-3 py-2 rounded-lg bg-[#FBFAF7] border border-[#E6E3DC] text-xs font-medium text-[#15171A] focus:outline-none focus:ring-2 focus:ring-[#1A73E8] cursor-pointer"
              >
                <option value="all">All Formats</option>
                <option value="in-person">In-person</option>
                <option value="virtual">Virtual</option>
              </select>

              {(selectedCategory !== 'all' || selectedFormat !== 'all' || searchQuery) && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="px-3 py-2 rounded-lg text-xs text-[#D93025] hover:bg-[#FCE8E6] transition-colors inline-flex items-center gap-1 cursor-pointer font-semibold"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Clear filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#E6E3DC]">
            <span className="text-xs text-[#4B525C] font-semibold mr-1">Category:</span>
            <Chip
              selected={selectedCategory === 'all'}
              onClick={() => updateFilter({ category: 'all' })}
            >
              All
            </Chip>
            {categories.map((cat) => (
              <Chip
                key={cat}
                selected={selectedCategory.toLowerCase() === cat.toLowerCase()}
                onClick={() => updateFilter({ category: cat })}
              >
                {cat}
              </Chip>
            ))}
          </div>

          {/* Results Count announced via aria-live region (Section 8.3 & 11) */}
          <div 
            aria-live="polite" 
            aria-atomic="true" 
            className="text-xs text-[#4B525C] pt-2"
          >
            Showing {filteredEvents.length} {activeTab} {filteredEvents.length === 1 ? 'event' : 'events'}
          </div>

        </div>
      </Container>

      {/* Main Events Presentation Area */}
      <Container size="lg">
        {loading ? (
          <div className="p-12 text-center text-[#4B525C]">
            <p>Loading events...</p>
          </div>
        ) : error ? (
          /* Error State (Section 8.3) */
          <div role="alert" className="p-8 rounded-2xl bg-[#FCE8E6] border border-[#FAD2CF] text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-[#D93025] mx-auto" />
            <h2 className="text-base font-bold text-[#B31412]">{error}</h2>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#D93025] text-white text-xs font-semibold rounded-lg hover:bg-[#B31412] transition-colors"
            >
              Retry
            </button>
          </div>
        ) : activeTab === 'upcoming' ? (
          /* UPCOMING EVENTS TAB */
          filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            /* Polished Empty State for Upcoming Events (Section 8.1 D & 8.3) */
            <div className="p-10 rounded-3xl bg-[#FFFFFF] border border-[#E6E3DC] text-center space-y-5 max-w-2xl mx-auto shadow-2xs">
              <div className="w-14 h-14 rounded-2xl bg-[#E8F0FE] border border-[#CEE0FD] text-[#1557B0] flex items-center justify-center mx-auto">
                <Calendar className="w-7 h-7" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold font-display text-[#15171A]">
                  No upcoming events are listed right now
                </h2>
                <p className="text-sm text-[#4B525C] leading-relaxed max-w-md mx-auto">
                  At this time, no future meetups are published on official chapter records. Check the official chapter directory or join our discussion channels.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={COMMUNITY_CONFIG.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1A73E8] hover:bg-[#1557B0] text-white text-xs font-semibold transition-colors shadow-xs"
                >
                  <span>Official Chapter Page</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>

                <a
                  href={COMMUNITY_CONFIG.channels.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-[#F4F2EC] hover:bg-[#E6E3DC] text-xs font-semibold text-[#15171A] border border-[#E6E3DC] transition-colors"
                >
                  Join WhatsApp Group
                </a>

                <a
                  href={COMMUNITY_CONFIG.channels.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-[#F4F2EC] hover:bg-[#E6E3DC] text-xs font-semibold text-[#15171A] border border-[#E6E3DC] transition-colors"
                >
                  Join Telegram Channel
                </a>
              </div>
            </div>
          )
        ) : (
          /* PAST EVENTS TAB (Reverse Chronological Order using Branch-Graph Timeline, Section 8.3 & 5.4) */
          filteredEvents.length > 0 ? (
            <div className="space-y-8">
              
              {/* Branch Graph Timeline Representation */}
              <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-4.5 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#E6E3DC]">
                {filteredEvents.map((event, index) => {
                  const nodeColor = nodeColors[index % nodeColors.length];
                  return (
                    <div key={event.id} className="relative group">
                      
                      {/* Branch Graph Node Commit Marker (Section 5.4) */}
                      <div
                        className="absolute -left-6 sm:-left-10 top-6 w-6 h-6 rounded-full bg-[#FBFAF7] border-2 flex items-center justify-center transition-transform group-hover:scale-110"
                        style={{ borderColor: nodeColor }}
                        aria-hidden="true"
                      >
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: nodeColor }}
                        />
                      </div>

                      {/* Event Card */}
                      <EventCard event={event} />
                    </div>
                  );
                })}
              </div>

            </div>
          ) : (
            <EmptyState
              title="No past events matched your filters"
              description="Try adjusting your search query, format, or category filter to discover past chapter sessions."
              action={
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="px-4 py-2 rounded-lg bg-[#1A73E8] hover:bg-[#1557B0] text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              }
            />
          )
        )}
      </Container>

    </div>
  );
};
