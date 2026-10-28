import React from 'react';
import { COMMUNITY_CONFIG } from '../../config/community';
import { WhatsAppIcon, TelegramIcon, LinkedInIcon, InstagramIcon, GlobeLinkIcon } from '../icons/BrandIcons';

export interface SocialLinksProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabels?: boolean;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  size = 'md',
  className = "",
  showLabels = false
}) => {
  const iconSize = size === 'sm' ? 16 : size === 'md' ? 20 : 24;

  const links = [
    {
      name: "WhatsApp",
      label: "WhatsApp Group",
      url: COMMUNITY_CONFIG.channels.whatsapp,
      icon: <WhatsAppIcon size={iconSize} />,
      hoverColor: "hover:text-[#188038] hover:border-[#188038]/50"
    },
    {
      name: "Telegram",
      label: "Telegram Channel",
      url: COMMUNITY_CONFIG.channels.telegram,
      icon: <TelegramIcon size={iconSize} />,
      hoverColor: "hover:text-[#1A73E8] hover:border-[#1A73E8]/50"
    },
    {
      name: "LinkedIn",
      label: "LinkedIn Page",
      url: COMMUNITY_CONFIG.channels.linkedin,
      icon: <LinkedInIcon size={iconSize} />,
      hoverColor: "hover:text-[#1557B0] hover:border-[#1557B0]/50"
    },
    {
      name: "Instagram",
      label: "Instagram Profile",
      url: COMMUNITY_CONFIG.channels.instagram,
      icon: <InstagramIcon size={iconSize} />,
      hoverColor: "hover:text-[#D93025] hover:border-[#D93025]/50"
    },
    {
      name: "Official Page",
      label: "Official Community Page",
      url: COMMUNITY_CONFIG.channels.officialCommunityPage,
      icon: <GlobeLinkIcon size={iconSize} />,
      hoverColor: "hover:text-[#15171A] hover:border-[#15171A]"
    }
  ];

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {links.map((item) => (
        <a
          key={item.name}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FFFFFF] border border-[#E6E3DC] text-[#4B525C] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] shadow-xs ${item.hoverColor}`}
          aria-label={`${item.label} (opens in new tab)`}
        >
          {item.icon}
          {showLabels && <span className="text-xs font-medium text-[#15171A]">{item.name}</span>}
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ))}
    </div>
  );
};
