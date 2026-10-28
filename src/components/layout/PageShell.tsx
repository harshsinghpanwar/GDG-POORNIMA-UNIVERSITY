import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SkipLink } from './SkipLink';
import { Header } from './Header';
import { Footer } from './Footer';
import { SearchModal } from '../SearchModal';
import { EVENTS } from '../../data/events';
import { PROJECTS } from '../../data/projects';
import { LEARNING_TRACKS } from '../../data/resources';
import { TEAM_MEMBERS } from '../../data/team';
import { CommunityEvent } from '../../types/community';

export const PageShell: React.FC = () => {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  // Live Screen Reader Announcer (WCAG 2.2 AA)
  const [announcement, setAnnouncement] = useState<string>(
    'Welcome to GDG on Campus Poornima University, Jaipur. Community portal loaded.'
  );

  const handleAnnounce = (msg: string) => {
    setAnnouncement(msg);
  };

  // Route change: scroll to top, move focus to main heading or main region, update announcement (Section 6)
  useEffect(() => {
    window.scrollTo(0, 0);

    // Give the DOM a cycle to render new route view
    const timer = setTimeout(() => {
      const heading = document.querySelector('h1');
      if (heading) {
        if (!heading.hasAttribute('tabindex')) {
          heading.setAttribute('tabindex', '-1');
        }
        heading.focus({ preventScroll: true });
      } else if (mainRef.current) {
        mainRef.current.focus({ preventScroll: true });
      }
      handleAnnounce(`Navigated to ${document.title || 'page'}`);
    }, 80);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Global keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectEvent = (event: CommunityEvent) => {
    setSearchOpen(false);
    window.location.assign(`/events/${event.slug}`);
  };

  return (
    <div className="min-h-screen bg-[#FBFAF7] text-[#15171A] flex flex-col font-sans selection:bg-[#E8F0FE] selection:text-[#1557B0]">
      
      {/* Live Region for Screen Readers (WCAG 2.2 AA) */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        {announcement}
      </div>

      {/* WCAG AA Skip to Main Content Link (Section 7, 11) */}
      <SkipLink />

      {/* Main Header */}
      <Header onOpenSearch={() => setSearchOpen(true)} />

      {/* Main Content Body */}
      <main 
        id="main-content" 
        ref={mainRef}
        tabIndex={-1}
        className="flex-1 focus:outline-none"
      >
        <Outlet context={{ 
          openSearch: () => setSearchOpen(true)
        }} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Quick Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        events={EVENTS}
        projects={PROJECTS}
        tracks={LEARNING_TRACKS}
        organizers={TEAM_MEMBERS}
        onSelectEvent={handleSelectEvent}
        onAnnounce={handleAnnounce}
      />
    </div>
  );
};
