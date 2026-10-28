import React from 'react';
import { ExternalLink, Globe } from 'lucide-react';
import { COMMUNITY_CONFIG } from '../config/community';
import { usePageSeo } from '../lib/seo';
import { Container } from '../components/ui/Container';
import { WhatsAppIcon, TelegramIcon, LinkedInIcon, InstagramIcon } from '../components/icons/BrandIcons';
import { BranchMotif } from '../components/brand/BranchMotif';

export const Join: React.FC = () => {
  usePageSeo({
    title: "Join Community",
    description: "Learn how to join GDG on Campus Poornima University through the official community page and verified discussion channels."
  });

  const verifiedChannels = [
    {
      id: "whatsapp",
      title: "Student WhatsApp Group",
      url: COMMUNITY_CONFIG.channels.whatsapp,
      icon: <WhatsAppIcon size={24} />,
      expectText: "Chat with the student community and receive informal campus event notifications."
    },
    {
      id: "telegram",
      title: "Telegram Broadcast Channel",
      url: COMMUNITY_CONFIG.channels.telegram,
      icon: <TelegramIcon size={24} />,
      expectText: "Receive broadcast alerts, workshop links, and resource slides without group noise."
    },
    {
      id: "linkedin",
      title: "LinkedIn Page",
      url: COMMUNITY_CONFIG.channels.linkedin,
      icon: <LinkedInIcon size={24} />,
      expectText: "Follow chapter professional highlights, speaker announcements, and campus activities."
    },
    {
      id: "instagram",
      title: "Instagram Highlights",
      url: COMMUNITY_CONFIG.channels.instagram,
      icon: <InstagramIcon size={24} />,
      expectText: "View photos and visual recaps from university workshops and sessions."
    }
  ];

  return (
    <div className="py-12 md:py-20 space-y-16">
      
      {/* Header */}
      <Container size="lg">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wide bg-[#E8F0FE] text-[#1557B0] border border-[#CEE0FD]">
            Community Pathways
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#15171A] tracking-tight">
            Join GDG on Campus Poornima University
          </h1>
          <p className="text-base sm:text-lg text-[#4B525C] leading-relaxed">
            Connect with the chapter through our official directory listing and verified student communication channels.
          </p>
          <BranchMotif className="w-48 opacity-70 pt-2" />
        </div>
      </Container>

      {/* Primary Route: Official Community Page (Section 8.8) */}
      <Container size="lg">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#FFFFFF] border-2 border-[#1A73E8]/30 shadow-xs space-y-6 max-w-3xl">
          <div className="flex items-center gap-3 text-[#1557B0]">
            <div className="w-12 h-12 rounded-xl bg-[#E8F0FE] border border-[#CEE0FD] flex items-center justify-center">
              <Globe className="w-6 h-6 text-[#1A73E8]" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A73E8] block">
                Primary Official Route
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#15171A]">
                Join on the Official Community Page
              </h2>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#4B525C] leading-relaxed">
            The official community page at gdg.community.dev handles official chapter membership. Creating an account and clicking "Join Chapter" subscribes you to official workshop notices, hackathon announcements, and attendance RSVPs.
          </p>

          <div className="pt-2">
            <a
              href={COMMUNITY_CONFIG.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1A73E8] hover:bg-[#1557B0] text-white font-semibold text-sm transition-colors shadow-xs"
            >
              <span>Open Official Community Page</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </Container>

      {/* The Four Verified Social Channels as Cards (Section 8.8) */}
      <Container size="lg">
        <div className="space-y-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557B0]">
              Discussion & Alerts
            </span>
            <h2 className="text-2xl font-bold font-display text-[#15171A] mt-1">
              Verified Social Channels
            </h2>
            <p className="text-sm text-[#4B525C] mt-1">
              What to expect when joining our student community groups:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {verifiedChannels.map((ch) => (
              <div
                key={ch.id}
                className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6E3DC] hover:border-[#D1CDC2] hover:shadow-[0_4px_16px_-4px_rgba(21,23,26,0.06)] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold font-display text-[#15171A]">
                      {ch.title}
                    </span>
                    <div className="p-2 rounded-lg bg-[#F4F2EC] text-[#15171A]">
                      {ch.icon}
                    </div>
                  </div>

                  {/* What to expect here (Section 8.8) */}
                  <p className="text-sm text-[#4B525C] leading-relaxed">
                    {ch.expectText}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E6E3DC]">
                  <a
                    href={ch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full text-xs font-semibold text-[#1557B0] hover:underline"
                  >
                    <span>Connect on {ch.title}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Optional interestFormUrl: rendered ONLY if non-null (Section 8.8) */}
      {COMMUNITY_CONFIG.interestFormUrl && (
        <Container size="lg">
          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6E3DC] space-y-3">
            <h2 className="text-lg font-bold text-[#15171A]">Interest Form</h2>
            <p className="text-sm text-[#4B525C]">
              Share your technical interests and topics you would like to see in upcoming sessions.
            </p>
            <a
              href={COMMUNITY_CONFIG.interestFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1A73E8] text-white text-xs font-semibold rounded-lg"
            >
              <span>Open Interest Form</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </Container>
      )}

    </div>
  );
};
