import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../brand/Logo';
import { COMMUNITY_CONFIG, NAV_ITEMS } from '../../config/community';
import { WhatsAppIcon, TelegramIcon, LinkedInIcon, InstagramIcon, GlobeLinkIcon } from '../icons/BrandIcons';
import { Container } from '../ui/Container';
import { ThemeToggle } from '../ui/ThemeToggle';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E6E3DC] bg-[#F4F2EC] text-[#4B525C] py-12 md:py-16">
      <Container size="lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-[#E6E3DC]">
          
          {/* Brand & Wordmark with "Poornima University" (Section 5.4, Section 7) */}
          <div className="md:col-span-2 space-y-4">
            <Logo size={36} showText={true} />
            <p className="text-sm text-[#4B525C] max-w-md leading-relaxed font-sans">
              GDG on Campus Poornima University is a student tech community in Jaipur for coding, collaboration and learning, whether you are writing your first line of code or shipping your tenth project.
            </p>
            
            {/* Campus Location - Strictly without postal PIN code per Section 3.1 */}
            <div className="pt-2 text-xs space-y-1">
              <span className="font-semibold text-[#15171A] block">Campus Location:</span>
              <p className="text-[#4B525C]">{COMMUNITY_CONFIG.location}</p>
            </div>

            {/* Verified Social Channels with accessible labels (Section 7) */}
            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#15171A] block mb-2">
                Official Channels:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={COMMUNITY_CONFIG.channels.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#FFFFFF] border border-[#E6E3DC] hover:text-[#188038] hover:border-[#188038]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8]"
                  aria-label="Official Student WhatsApp Group (opens in a new tab)"
                >
                  <WhatsAppIcon size={18} />
                </a>
                <a
                  href={COMMUNITY_CONFIG.channels.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#FFFFFF] border border-[#E6E3DC] hover:text-[#1A73E8] hover:border-[#1A73E8]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8]"
                  aria-label="Official Telegram Broadcast Channel (opens in a new tab)"
                >
                  <TelegramIcon size={18} />
                </a>
                <a
                  href={COMMUNITY_CONFIG.channels.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#FFFFFF] border border-[#E6E3DC] hover:text-[#1557B0] hover:border-[#1557B0]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8]"
                  aria-label="Official LinkedIn Chapter Page (opens in a new tab)"
                >
                  <LinkedInIcon size={18} />
                </a>
                <a
                  href={COMMUNITY_CONFIG.channels.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#FFFFFF] border border-[#E6E3DC] hover:text-[#D93025] hover:border-[#D93025]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8]"
                  aria-label="Official Instagram Highlights Page (opens in a new tab)"
                >
                  <InstagramIcon size={18} />
                </a>
                <a
                  href={COMMUNITY_CONFIG.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#FFFFFF] border border-[#E6E3DC] hover:text-[#15171A] hover:border-[#15171A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8]"
                  aria-label="Official Chapter Directory on gdg.community.dev (opens in a new tab)"
                >
                  <GlobeLinkIcon size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#15171A]">
              Navigation
            </h2>
            <ul className="space-y-2 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="hover:text-[#1557B0] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Info & Supporting Links */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#15171A]">
              Community Info
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/join" className="hover:text-[#1557B0] transition-colors">Join Community</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#1557B0] transition-colors">Frequently Asked Questions</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#1557B0] transition-colors">Privacy Notice</Link>
              </li>
              <li>
                <a 
                  href={COMMUNITY_CONFIG.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1557B0] transition-colors inline-flex items-center gap-1"
                >
                  <span>Official GDG Directory</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Mandatory Exact Legal Notice & Dynamic Runtime Year (Section 7) */}
        <div className="pt-8 space-y-3 text-xs text-[#4B525C] leading-relaxed">
          <p>
            A community website for GDG on Campus Poornima University. It is not an official Google website. Google and Google Developer Groups are trademarks of Google LLC.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[#E6E3DC] text-[#4B525C]">
            <p>
              © {currentYear} GDG on Campus Poornima University.
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link to="/privacy" className="hover:underline hover:text-[#1557B0]">Privacy</Link>
              <span>•</span>
              <Link to="/faq" className="hover:underline hover:text-[#1557B0]">FAQ</Link>
              <span>•</span>
              <Link to="/contact" className="hover:underline hover:text-[#1557B0]">Contact</Link>
              <span className="hidden sm:inline">•</span>
              <ThemeToggle variant="icon" />
            </div>
          </div>
        </div>

      </Container>
    </footer>
  );
};
