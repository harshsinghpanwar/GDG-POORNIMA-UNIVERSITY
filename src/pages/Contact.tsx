import React from 'react';
import { Building, MapPin, ShieldCheck, ExternalLink } from 'lucide-react';
import { COMMUNITY_CONFIG, SOCIAL_LINKS } from '../config/community';
import { usePageSeo } from '../lib/seo';
import { Container } from '../components/ui/Container';
import { ContactForm } from '../components/features/ContactForm';
import { WhatsAppIcon, TelegramIcon, LinkedInIcon, InstagramIcon, GlobeLinkIcon } from '../components/icons/BrandIcons';
import { BranchMotif } from '../components/brand/BranchMotif';

export const Contact: React.FC = () => {
  usePageSeo({
    title: "Contact",
    description: "Connect with GDG on Campus Poornima University organizers via verified WhatsApp, Telegram, LinkedIn, Instagram channels, or the connected form."
  });

  const getChannelIcon = (id: string) => {
    switch (id) {
      case 'whatsapp': return <WhatsAppIcon size={20} />;
      case 'telegram': return <TelegramIcon size={20} />;
      case 'linkedin': return <LinkedInIcon size={20} />;
      case 'instagram': return <InstagramIcon size={20} />;
      default: return <GlobeLinkIcon size={20} />;
    }
  };

  return (
    <div className="py-12 md:py-20 space-y-16">
      
      {/* Header */}
      <Container size="lg">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wide bg-[#E8F0FE] text-[#1557B0] border border-[#CEE0FD]">
            Community Channels
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#15171A] tracking-tight">
            Connect with Chapter Organizers
          </h1>
          <p className="text-base sm:text-lg text-[#4B525C] leading-relaxed">
            Reach out regarding technical workshops, hackathons, or campus collaborations through our verified channels.
          </p>
          <BranchMotif className="w-48 opacity-70 pt-2" />
        </div>
      </Container>

      {/* Main Grid: Form on Left, Verified Channels & Campus on Right */}
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Form Column (Section 8.9) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Details Column: Verified channels (no email address per Section 8.9) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Verified Community Channels Card (Section 8.9) */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E6E3DC] shadow-[0_4px_16px_-4px_rgba(21,23,26,0.06)] space-y-4">
              <h2 className="text-lg font-bold font-display text-[#15171A]">
                Verified Discussion Channels
              </h2>
              <p className="text-xs text-[#4B525C] leading-relaxed">
                As per chapter policy, no public email address is published. Please connect through these official channels:
              </p>
              
              <div className="space-y-2.5 pt-1">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#FBFAF7] border border-[#E6E3DC] hover:border-[#D1CDC2] hover:bg-[#F4F2EC] text-xs font-semibold text-[#15171A] transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-[#FFFFFF] border border-[#E6E3DC]">
                        {getChannelIcon(link.id)}
                      </div>
                      <span>{link.label}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#4B525C] group-hover:text-[#1557B0] transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Campus Card (no PIN code per Section 3.1) */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E6E3DC] shadow-[0_4px_16px_-4px_rgba(21,23,26,0.06)] space-y-4">
              <h2 className="text-lg font-bold font-display text-[#15171A] flex items-center gap-2">
                <Building className="w-5 h-5 text-[#1557B0]" />
                <span>Campus Location</span>
              </h2>

              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4B525C]">
                <MapPin className="w-5 h-5 text-[#4B525C] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#15171A] block">University Address:</span>
                  <p className="text-[#4B525C] mt-0.5">{COMMUNITY_CONFIG.location}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E6E3DC] text-xs text-[#4B525C]">
                <span className="font-semibold text-[#15171A] block mb-1">Postal Address Transparency:</span>
                <p>{COMMUNITY_CONFIG.disclaimers.postalNotice}</p>
              </div>
            </div>

            {/* Organizers Note */}
            <div className="p-4 rounded-xl bg-[#FBFAF7] border border-[#E6E3DC] text-xs text-[#4B525C] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#188038] shrink-0 mt-0.5" />
              <span>
                Community discussions on WhatsApp and Telegram are moderated by student organizers Raghav Arora and Keshav Verma.
              </span>
            </div>

          </div>

        </div>
      </Container>

    </div>
  );
};
