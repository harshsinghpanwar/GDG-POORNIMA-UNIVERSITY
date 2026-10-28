import React, { useState, useEffect } from 'react';
import { CommunityEvent, Project, LearningTrack, TeamMember } from '../types/community';
import { 
  Search, 
  X, 
  Calendar, 
  Code2, 
  BookOpen, 
  Users, 
  ArrowRight
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: CommunityEvent[];
  projects: Project[];
  tracks: LearningTrack[];
  organizers: TeamMember[];
  onSelectEvent: (event: CommunityEvent) => void;
  onAnnounce: (msg: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  events,
  projects,
  tracks,
  organizers,
  onSelectEvent
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedEvents = q 
    ? events.filter(e => 
        e.title.toLowerCase().includes(q) || 
        e.summary.toLowerCase().includes(q) || 
        e.slug.toLowerCase().includes(q) ||
        (e.venue && e.venue.toLowerCase().includes(q)) ||
        e.categories.some(c => c.toLowerCase().includes(q))
      )
    : events;

  const matchedProjects = q
    ? projects.filter(p => 
        p.title.toLowerCase().includes(q) || 
        (p.techTags && p.techTags.some(t => t.toLowerCase().includes(q))) || 
        (p.technologies && p.technologies.some(t => t.toLowerCase().includes(q))) ||
        (p.domain && p.domain.toLowerCase().includes(q))
      )
    : projects;

  const matchedTracks = q
    ? tracks.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.domain.toLowerCase().includes(q) || 
        t.technologies.some(tech => tech.toLowerCase().includes(q))
      )
    : [];

  const matchedOrganizers = q
    ? organizers.filter(m => 
        m.name.toLowerCase().includes(q) || 
        (m.role && m.role.toLowerCase().includes(q)) ||
        (m.roleTitle && m.roleTitle.toLowerCase().includes(q))
      )
    : [];

  const totalResults = matchedEvents.length + matchedProjects.length + matchedTracks.length + matchedOrganizers.length;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-dialog-title"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-[#15171A]/40 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl rounded-2xl bg-[#FFFFFF] border border-[#E6E3DC] shadow-[0_10px_25px_-5px_rgba(21,23,26,0.15)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative border-b border-[#E6E3DC] flex items-center px-4 py-3 bg-[#FFFFFF]">
          <Search className="w-4 h-4 text-[#4B525C] shrink-0" />
          <input
            id="search-dialog-title"
            type="text"
            autoFocus
            placeholder="Search sessions, curriculum, projects, or organizers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-3 pr-8 py-1.5 text-sm bg-transparent text-[#15171A] placeholder-[#4B525C]/60 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-[#4B525C] hover:text-[#15171A] cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4 text-xs bg-[#FBFAF7]">
          {totalResults === 0 && (
            <div className="text-center py-8 text-[#4B525C]">
              No verified records found matching "{query}"
            </div>
          )}

          {matchedEvents.length > 0 && (
            <div>
              <div className="text-[11px] font-mono text-[#4B525C] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#1A73E8]" />
                <span>Sessions & Workshops</span>
              </div>
              <div className="space-y-1.5">
                {matchedEvents.map((ev) => (
                  <button
                    key={ev.id}
                    onClick={() => {
                      onSelectEvent(ev);
                      onClose();
                    }}
                    className="w-full p-2.5 rounded-lg bg-[#FFFFFF] border border-[#E6E3DC] hover:border-[#1A73E8] text-left transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-semibold text-[#15171A] group-hover:text-[#1557B0] transition-colors">{ev.title}</div>
                      <div className="text-[11px] text-[#4B525C] mt-0.5">{ev.displayDate} · {ev.timeIST} · {ev.venue}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#4B525C] shrink-0 group-hover:translate-x-0.5 group-hover:text-[#1557B0] transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchedProjects.length > 0 && (
            <div>
              <div className="text-[11px] font-mono text-[#4B525C] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-[#188038]" />
                <span>Project Repositories</span>
              </div>
              <div className="space-y-1.5">
                {matchedProjects.map((p) => (
                  <a
                    key={p.id}
                    href={`/projects/${p.slug}`}
                    onClick={onClose}
                    className="block p-2.5 rounded-lg bg-[#FFFFFF] border border-[#E6E3DC] hover:border-[#188038] transition-colors"
                  >
                    <div className="font-semibold text-[#15171A]">{p.title}</div>
                    <div className="text-[11px] text-[#4B525C] mt-0.5 truncate">{p.tagline}</div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {matchedTracks.length > 0 && (
            <div>
              <div className="text-[11px] font-mono text-[#4B525C] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#5F4100]" />
                <span>Curriculum Tracks</span>
              </div>
              <div className="space-y-1.5">
                {matchedTracks.map((t) => (
                  <a
                    key={t.id}
                    href="/resources"
                    onClick={onClose}
                    className="block p-2.5 rounded-lg bg-[#FFFFFF] border border-[#E6E3DC] hover:border-[#1A73E8] transition-colors"
                  >
                    <div className="font-semibold text-[#15171A]">{t.title}</div>
                    <div className="text-[11px] text-[#4B525C] mt-0.5">{t.domain}</div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {matchedOrganizers.length > 0 && (
            <div>
              <div className="text-[11px] font-mono text-[#4B525C] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#1557B0]" />
                <span>Verified Organizers</span>
              </div>
              <div className="space-y-1.5">
                {matchedOrganizers.map((r) => (
                  <a
                    key={r.id}
                    href="/team"
                    onClick={onClose}
                    className="block p-2.5 rounded-lg bg-[#FFFFFF] border border-[#E6E3DC] hover:border-[#1557B0] transition-colors"
                  >
                    <div className="font-semibold text-[#15171A]">{r.name}</div>
                    <div className="text-[11px] text-[#1557B0] mt-0.5 font-medium">{r.roleTitle} · {r.institution}</div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-3 bg-[#FFFFFF] border-t border-[#E6E3DC] text-[11px] text-[#4B525C] flex items-center justify-between">
          <span>Search verified chapter information</span>
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-[#F4F2EC] border border-[#E6E3DC] text-[#15171A] font-mono">Esc</kbd> to exit</span>
        </div>
      </div>
    </div>
  );
};
