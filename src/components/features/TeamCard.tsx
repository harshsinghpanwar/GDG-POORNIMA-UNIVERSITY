import React, { useState } from 'react';
import { ExternalLink, Building, ShieldCheck } from 'lucide-react';
import { TeamMember } from '../../types/community';
import { Card } from '../ui/Card';

export interface TeamCardProps {
  member: TeamMember;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  const [imgError, setImgError] = useState(false);

  // Compute initials avatar fallback (Section 8.6)
  const initials = member.name
    .split(' ')
    .filter(Boolean)
    .map(part => part.replace(/[^a-zA-Z]/g, '')[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const photoUrl = member.photo ? member.photo.replace(/^\/public/, '') : null;
  const isFaculty = member.domain === 'faculty';

  return (
    <Card
      variant="bordered"
      padding="none"
      className="flex flex-col justify-between h-full bg-[#FFFFFF] border-[#E6E3DC] hover:border-[#D1CDC2] hover:shadow-[0_6px_20px_-4px_rgba(21,23,26,0.08)] transition-all text-left group overflow-hidden"
    >
      <div className="p-6">
        {/* Top Header: Photo / Initials and Verification Badge */}
        <div className="flex items-start justify-between gap-4 mb-5">
          {photoUrl && !imgError ? (
            <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden border-2 border-[#CEE0FD] shrink-0 bg-[#F4F2EC] shadow-2xs group-hover:scale-105 transition-transform duration-200">
              <img
                src={photoUrl}
                alt={`Photograph of ${member.name}`}
                className="w-full h-full object-cover object-top"
                loading="lazy"
                onError={() => setImgError(true)}
              />
            </div>
          ) : (
            <div 
              className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-[#E8F0FE] border-2 border-[#CEE0FD] text-[#1557B0] font-display font-bold text-2xl flex items-center justify-center shrink-0 shadow-2xs"
              aria-hidden="true"
            >
              {initials}
            </div>
          )}

          <div className="flex flex-col items-end gap-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#188038]" aria-hidden="true" />
              <span>{isFaculty ? "Faculty Advisory" : "Verified Organizer"}</span>
            </span>

            {member.domain && (
              <span className="text-[11px] font-mono text-[#4B525C] uppercase tracking-wider">
                {member.domain === 'lead' ? 'Chapter Lead' : member.domain}
              </span>
            )}
          </div>
        </div>

        {/* Member Name */}
        <h3 className="text-xl sm:text-2xl font-bold font-display text-[#15171A] group-hover:text-[#1557B0] transition-colors mb-1">
          {member.name}
        </h3>

        {/* Published Role Title (Section 8.6) */}
        <p className="text-sm font-semibold text-[#1557B0] mb-3">
          {member.role || member.roleTitle}
        </p>

        {/* Optional Bio - rendered only when present */}
        {member.bio && (
          <p className="text-xs sm:text-sm text-[#4B525C] leading-relaxed mb-4">
            {member.bio}
          </p>
        )}
      </div>

      {/* Institution Info & Profile Link */}
      <div className="px-6 py-4 bg-[#FBFAF7] border-t border-[#E6E3DC] flex items-center justify-between text-xs text-[#4B525C]">
        <div className="flex items-center gap-1.5">
          <Building className="w-3.5 h-3.5 text-[#4B525C] shrink-0" aria-hidden="true" />
          <span className="font-medium text-[#15171A]">{member.institution || 'Poornima University'}</span>
        </div>

        {member.profileUrl && (
          <a
            href={member.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#1557B0] hover:underline font-semibold"
            aria-label={`Official profile of ${member.name} (opens in new tab)`}
          >
            <span>Official Profile</span>
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        )}
      </div>
    </Card>
  );
};
