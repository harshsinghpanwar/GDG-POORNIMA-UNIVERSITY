import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { X, ExternalLink } from 'lucide-react';
import { COMMUNITY_CONFIG, NAV_ITEMS } from '../../config/community';
import { WhatsAppIcon, TelegramIcon, LinkedInIcon, InstagramIcon } from '../icons/BrandIcons';
import { ThemeToggle } from '../ui/ThemeToggle';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  id = "mobile-navigation"
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Body scroll locking while open (Section 7)
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      // Focus moves in on open (Section 7)
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Escape key closes mobile menu (Section 7)
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

  return (
    <div 
      id={id}
      className="fixed inset-0 z-50 lg:hidden flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#15171A]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div 
        ref={drawerRef}
        className="relative w-full max-w-xs bg-[#FFFFFF] border-l border-[#E6E3DC] h-full p-6 flex flex-col justify-between overflow-y-auto z-10 shadow-[0_10px_25px_-5px_rgba(21,23,26,0.15)]"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E6E3DC]">
            <span className="text-sm font-bold font-display text-[#15171A]">Menu Navigation</span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-[#4B525C] hover:text-[#15171A] hover:bg-[#F4F2EC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] cursor-pointer"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Links */}
          <nav className="mt-6 flex flex-col space-y-1" aria-label="Mobile Navigation Links">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#E8F0FE] text-[#1557B0] font-semibold'
                      : 'text-[#4B525C] hover:text-[#15171A] hover:bg-[#F4F2EC]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/faq"
              onClick={onClose}
              className={({ isActive }) =>
                `px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#E8F0FE] text-[#1557B0] font-semibold'
                    : 'text-[#4B525C] hover:text-[#15171A] hover:bg-[#F4F2EC]'
                }`
              }
            >
              FAQ
            </NavLink>
            <NavLink
              to="/privacy"
              onClick={onClose}
              className={({ isActive }) =>
                `px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#E8F0FE] text-[#1557B0] font-semibold'
                    : 'text-[#4B525C] hover:text-[#15171A] hover:bg-[#F4F2EC]'
                }`
              }
            >
              Privacy
            </NavLink>
          </nav>

          {/* Theme switcher */}
          <div className="mt-6 pt-4 border-t border-[#E6E3DC]">
            <span className="text-xs font-semibold text-[#4B525C] block mb-2 font-display">
              Theme Mode
            </span>
            <ThemeToggle variant="segmented" className="w-full flex justify-between" />
          </div>
        </div>

        {/* Action Button & Channels */}
        <div className="pt-6 border-t border-[#E6E3DC] space-y-4">
          <a
            href={COMMUNITY_CONFIG.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg bg-[#1A73E8] hover:bg-[#1557B0] text-white font-semibold text-sm text-center shadow-xs cursor-pointer transition-colors"
          >
            <span>Join Community</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="sr-only">(opens official community page in a new tab)</span>
          </a>

          <div>
            <span className="text-xs text-[#4B525C] block mb-2 font-medium">Verified Community Channels:</span>
            <div className="flex items-center gap-2.5 text-[#4B525C]">
              <a 
                href={COMMUNITY_CONFIG.channels.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#FBFAF7] border border-[#E6E3DC] hover:text-[#188038] hover:border-[#188038]/50 transition-colors"
                aria-label="Official WhatsApp Group"
              >
                <WhatsAppIcon size={18} />
              </a>
              <a 
                href={COMMUNITY_CONFIG.channels.telegram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#FBFAF7] border border-[#E6E3DC] hover:text-[#1A73E8] hover:border-[#1A73E8]/50 transition-colors"
                aria-label="Official Telegram Channel"
              >
                <TelegramIcon size={18} />
              </a>
              <a 
                href={COMMUNITY_CONFIG.channels.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#FBFAF7] border border-[#E6E3DC] hover:text-[#1557B0] hover:border-[#1557B0]/50 transition-colors"
                aria-label="Official LinkedIn Page"
              >
                <LinkedInIcon size={18} />
              </a>
              <a 
                href={COMMUNITY_CONFIG.channels.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#FBFAF7] border border-[#E6E3DC] hover:text-[#D93025] hover:border-[#D93025]/50 transition-colors"
                aria-label="Official Instagram Page"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
