import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Search, Menu, ExternalLink } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { COMMUNITY_CONFIG, NAV_ITEMS } from '../../config/community';
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from '../ui/ThemeToggle';

export interface HeaderProps {
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  // Subtle border on scroll (Section 7)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleCloseMenu = () => {
    setMobileMenuOpen(false);
    // Return focus to hamburger button on close (Section 7)
    setTimeout(() => {
      hamburgerButtonRef.current?.focus();
    }, 50);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 bg-[#FBFAF7]/95 backdrop-blur-md ${
          isScrolled ? 'border-b border-[#E6E3DC] shadow-xs' : 'border-b border-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Logo / Wordmark with "Poornima University" (Section 5.4, 7) */}
          <Link
            to="/"
            className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] focus-visible:ring-offset-2 rounded-lg py-1 px-1.5 -ml-1.5"
            aria-label="GDG on Campus Poornima University - Home"
          >
            <Logo size={36} showText={true} />
          </Link>

          {/* Desktop Navigation Links (>= 900px) */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === '/'}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] focus-visible:ring-offset-2 ${
                    isActive
                      ? 'text-[#1557B0] bg-[#E8F0FE] font-semibold shadow-xs'
                      : 'text-[#4B525C] hover:text-[#15171A] hover:bg-[#F4F2EC]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Header Action Items */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Trigger */}
            {onOpenSearch && (
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Search community content (Ctrl+K)"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm text-[#4B525C] hover:text-[#15171A] bg-[#FFFFFF] border border-[#E6E3DC] hover:border-[#D1CDC2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] cursor-pointer"
              >
                <Search className="w-4 h-4 text-[#4B525C]" aria-hidden="true" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-[#F4F2EC] text-[#4B525C] rounded border border-[#E6E3DC]">
                  ⌘K
                </kbd>
              </button>
            )}

            {/* Dark / Light Theme Toggle */}
            <ThemeToggle />

            {/* Prominent "Join Community" button linking to official community page (Section 7) */}
            <a
              href={COMMUNITY_CONFIG.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join Community on the official chapter page (opens in a new tab)"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1A73E8] hover:bg-[#1557B0] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] focus-visible:ring-offset-2 shadow-xs select-none"
            >
              <span>Join Community</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>

            {/* Mobile Menu Trigger (Hamburger) */}
            <button
              ref={hamburgerButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[#4B525C] hover:text-[#15171A] hover:bg-[#F4F2EC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] cursor-pointer"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Panel (< 900px) */}
      <MobileMenu
        id="mobile-navigation"
        isOpen={mobileMenuOpen}
        onClose={handleCloseMenu}
      />
    </>
  );
};
