import React, { useState, useEffect } from 'react';
import { Building, ShieldCheck, MapPin, ExternalLink, CheckCircle2 } from 'lucide-react';
import { COMMUNITY_CONFIG } from '../config/community';
import { dataSource } from '../services/dataSource';
import { TeamMember } from '../types/community';
import { usePageSeo } from '../lib/seo';
import { Container } from '../components/ui/Container';
import { TeamCard } from '../components/features/TeamCard';
import { BranchMotif } from '../components/brand/BranchMotif';

export const About: React.FC = () => {
  usePageSeo({
    title: "About",
    description: "Learn about GDG on Campus Poornima University, Jaipur: community purpose, culture, learning opportunities, and participation pathways."
  });

  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    dataSource.getTeam().then(setTeam);
  }, []);

  return (
    <div className="py-12 md:py-20 space-y-16">
      
      {/* Page Header */}
      <Container size="lg">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wide bg-[#E8F0FE] text-[#1557B0] border border-[#CEE0FD]">
            About the Community
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#15171A] tracking-tight">
            An independent student tech community at Poornima University.
          </h1>
          <p className="text-base sm:text-lg text-[#4B525C] leading-relaxed">
            GDG on Campus Poornima University is a student tech community in Jaipur for coding, collaboration and learning, whether you are writing your first line of code or shipping your tenth project.
          </p>
          <BranchMotif className="w-48 opacity-70 pt-2" />
        </div>
      </Container>

      {/* Community Purpose & Culture (Section 8.2) */}
      <Container size="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          <div className="space-y-6 text-[#4B525C] leading-relaxed text-base">
            <h2 className="text-2xl font-bold font-display text-[#15171A]">
              Community Purpose & Culture
            </h2>
            <p>
              The chapter is dedicated to facilitating peer-to-peer technical learning, practical coding practice, and collaborative software projects among students of Poornima University in Jaipur.
            </p>
            <p>
              We believe in an open, student-first culture where beginner questions are welcomed and experienced peers share insights freely. Our workshops are designed for attendees to bring their personal laptops, experiment with developer tooling, and construct real applications.
            </p>
            <p>
              Technology is explored collaboratively: from understanding problem statements and ideating software solutions to pushing code to version control repositories and deploying live demos.
            </p>
          </div>

          {/* Location & Status Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E6E3DC] shadow-[0_4px_16px_-4px_rgba(21,23,26,0.06)] space-y-6">
            <h3 className="text-xl font-bold font-display text-[#15171A] flex items-center gap-2">
              <Building className="w-5 h-5 text-[#1557B0]" />
              <span>Campus & Listing Details</span>
            </h3>

            <div className="space-y-4 text-sm text-[#4B525C]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#4B525C] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#15171A] block">Campus Location:</span>
                  <p className="text-[#4B525C] text-xs sm:text-sm">{COMMUNITY_CONFIG.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#188038] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#15171A] block">Community Status:</span>
                  <p className="text-[#4B525C] text-xs sm:text-sm">Verified GDG on Campus Chapter</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#1557B0] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#15171A] block">Official Chapter Directory:</span>
                  <a 
                    href={COMMUNITY_CONFIG.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1557B0] hover:underline inline-flex items-center gap-1 text-xs font-semibold"
                  >
                    <span>gdg.community.dev chapter listing</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Strict Notice regarding postal pin code transparency */}
            <div className="p-3.5 rounded-xl bg-[#F4F2EC] border border-[#E6E3DC] text-xs text-[#4B525C]">
              <span className="font-semibold text-[#15171A] block mb-1">Postal Address Transparency:</span>
              <span>{COMMUNITY_CONFIG.disclaimers.postalNotice}</span>
            </div>
          </div>

        </div>
      </Container>

      {/* Participation Pathways (Section 8.2) */}
      <Container size="lg">
        <div className="bg-[#FFFFFF] border border-[#E6E3DC] rounded-3xl p-6 sm:p-10 space-y-6 shadow-xs">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557B0]">
              Engagement
            </span>
            <h2 className="text-2xl font-bold font-display text-[#15171A] mt-1">
              Participation Pathways
            </h2>
            <p className="text-sm text-[#4B525C] mt-1 max-w-2xl leading-relaxed">
              Verified pathways for students at Poornima University to engage with the chapter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            
            <div className="p-5 rounded-2xl bg-[#FBFAF7] border border-[#E6E3DC] space-y-2">
              <span className="text-xs font-mono font-bold text-[#1A73E8]">Pathway 01</span>
              <h3 className="text-base font-bold text-[#15171A]">Join via Official Page</h3>
              <p className="text-xs text-[#4B525C] leading-relaxed">
                Register on the official gdg.community.dev chapter page to become a member and receive official notifications.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FBFAF7] border border-[#E6E3DC] space-y-2">
              <span className="text-xs font-mono font-bold text-[#188038]">Pathway 02</span>
              <h3 className="text-base font-bold text-[#15171A]">Follow Community Channels</h3>
              <p className="text-xs text-[#4B525C] leading-relaxed">
                Follow updates on WhatsApp, Telegram, Instagram, and LinkedIn for workshop links, slides, and discussions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FBFAF7] border border-[#E6E3DC] space-y-2">
              <span className="text-xs font-mono font-bold text-[#F9AB00]">Pathway 03</span>
              <h3 className="text-base font-bold text-[#15171A]">Attend Chapter Events</h3>
              <p className="text-xs text-[#4B525C] leading-relaxed">
                Participate in campus workshops and online briefings to practice modern developer tools and learn with peers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FBFAF7] border border-[#E6E3DC] space-y-2">
              <span className="text-xs font-mono font-bold text-[#D93025]">Pathway 04</span>
              <h3 className="text-base font-bold text-[#15171A]">Take Part in Projects</h3>
              <p className="text-xs text-[#4B525C] leading-relaxed">
                Take part in collaborative coding projects once listed on our projects showcase to build your portfolio.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FBFAF7] border border-[#E6E3DC] space-y-2 md:col-span-2">
              <span className="text-xs font-mono font-bold text-[#1557B0]">Pathway 05</span>
              <h3 className="text-base font-bold text-[#15171A]">Interested in Helping Out?</h3>
              <p className="text-xs text-[#4B525C] leading-relaxed">
                Interested in helping out? Ask the organizers through the community channels (WhatsApp, Telegram, or LinkedIn). No formal volunteer programme is published.
              </p>
            </div>

          </div>
        </div>
      </Container>

      {/* Verified Chapter Organizers (Section 8.2 & 8.6) */}
      <Container size="lg">
        <div className="space-y-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557B0]">
              Chapter Leadership
            </span>
            <h2 className="text-2xl font-bold font-display text-[#15171A] mt-1">
              Verified Chapter Organizers
            </h2>
            <p className="text-sm text-[#4B525C] mt-1">
              The published organizers of GDG on Campus Poornima University based on official records.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>

          <p className="text-xs text-[#4B525C] italic pt-2">
            Community rosters change across academic years. Organizers listed here reflect verified public chapter records.
          </p>
        </div>
      </Container>

      {/* Mandatory Disclaimer (Section 7 & Section 8.2) */}
      <Container size="lg">
        <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6E3DC] text-xs text-[#4B525C] leading-relaxed space-y-2 shadow-2xs">
          <p className="font-semibold text-[#15171A]">Disclaimer & Independence:</p>
          <p>{COMMUNITY_CONFIG.disclaimers.independence}</p>
          <p>{COMMUNITY_CONFIG.disclaimers.nonImpersonation}</p>
        </div>
      </Container>

    </div>
  );
};
