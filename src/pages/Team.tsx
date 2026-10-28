import React, { useState, useEffect } from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { dataSource } from '../services/dataSource';
import { TeamMember } from '../types/community';
import { TEAM_ROSTER_NOTE } from '../data/team';
import { usePageSeo } from '../lib/seo';
import { Container } from '../components/ui/Container';
import { TeamCard } from '../components/features/TeamCard';

export const Team: React.FC = () => {
  usePageSeo({
    title: "Team",
    description: "Meet the verified student organizers and faculty coordinator of GDG on Campus Poornima University, Jaipur."
  });

  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    dataSource.getTeam().then(setTeam);
  }, []);

  return (
    <div className="py-12 md:py-20 space-y-12">
      
      {/* Header */}
      <Container size="lg">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wide bg-[#E8F0FE] text-[#1557B0] border border-[#CEE0FD]">
            Chapter Leadership
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#15171A] tracking-tight">
            Verified Chapter Organizers
          </h1>
          <p className="text-base sm:text-lg text-[#4B525C] leading-relaxed">
            The student organizers and faculty coordinator leading technical sessions, campus hackathons, and developer activities at Poornima University.
          </p>
        </div>
      </Container>

      {/* Verified Organizers Grid (Section 8.6) */}
      <Container size="lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </Container>

      {/* Roster May Change Note (Section 8.6) */}
      <Container size="lg">
        <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6E3DC] shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-[#1557B0]">
            <Info className="w-5 h-5 shrink-0" aria-hidden="true" />
            <h2 className="text-sm font-bold font-display text-[#15171A]">
              Chapter Roster Notice
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4B525C] leading-relaxed">
            {TEAM_ROSTER_NOTE}
          </p>
          <div className="text-xs text-[#4B525C] pt-2 border-t border-[#E6E3DC] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#188038]" />
            <span>All leadership records are verified against official chapter listings on gdg.community.dev.</span>
          </div>
        </div>
      </Container>

    </div>
  );
};
