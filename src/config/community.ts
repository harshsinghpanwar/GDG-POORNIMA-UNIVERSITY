import { CommunityConfig, SocialLink, NavItem } from '../types/community';

/**
 * GDG on Campus Poornima University - Jaipur, India
 * Configuration and Verified Community Metadata (Section 3 & Section 9)
 * 
 * Strict Compliance:
 * - Location: Strictly NO postal PIN code (Section 3.1).
 * - Social Channels: Exactly the 5 verified channels (Section 3.2).
 * - LinkedIn URL: Configured to https://www.linkedin.com/company/gdg-poornima/ per Section 3.2 instructions.
 * - interestFormUrl: Set to null (Section 8.8: when null, section is not rendered).
 */

const siteUrl = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SITE_URL)
  ? import.meta.env.VITE_SITE_URL
  : "https://gdg-poornima.netlify.app";

const officialUrl = "https://gdg.community.dev/gdg-on-campus-poornima-university-jaipur-india/";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" }
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    url: "https://chat.whatsapp.com/BUzm2aq56HJHVmyiuzGIpJ",
    ariaLabel: "Join our official student WhatsApp group for real-time announcements",
    icon: "whatsapp",
    ctaText: "Join WhatsApp Group"
  },
  {
    id: "telegram",
    label: "Telegram",
    url: "https://t.me/gdgpoornima",
    ariaLabel: "Subscribe to our official Telegram channel for workshop broadcasts",
    icon: "telegram",
    ctaText: "Join Telegram Channel"
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/gdg-poornima/",
    ariaLabel: "Follow our verified LinkedIn chapter page",
    icon: "linkedin",
    ctaText: "Follow on LinkedIn"
  },
  {
    id: "instagram",
    label: "Instagram",
    url: "https://instagram.com/gdg.poornima",
    ariaLabel: "Follow our chapter highlights and photos on Instagram",
    icon: "instagram",
    ctaText: "Follow on Instagram"
  },
  {
    id: "official",
    label: "GDG Directory",
    url: officialUrl,
    ariaLabel: "Visit official chapter profile on gdg.community.dev",
    icon: "globe",
    ctaText: "Official Community Page"
  }
];

export const COMMUNITY_CONFIG: CommunityConfig = {
  name: "GDG on Campus Poornima University - Jaipur, India",
  shortName: "GDG on Campus Poornima University",
  tagline: "Learn to build. Build with people.",
  description: "An active, welcoming student developer community for coding, software development, AI, cloud computing, and open source collaboration at Poornima University, Jaipur.",
  location: "Poornima University, Sitapura Industrial Area, Vidhani, Jaipur, Rajasthan, India",
  officialUrl,
  siteUrl,
  navItems: NAV_ITEMS,
  socialLinks: SOCIAL_LINKS,
  interestFormUrl: null, // Set to null per Section 8.8 and 9

  channels: {
    officialCommunityPage: officialUrl,
    whatsapp: "https://chat.whatsapp.com/BUzm2aq56HJHVmyiuzGIpJ",
    instagram: "https://instagram.com/gdg.poornima",
    linkedin: "https://www.linkedin.com/company/gdg-poornima/",
    telegram: "https://t.me/gdgpoornima"
  },

  disclaimers: {
    independence: "A community website for GDG on Campus Poornima University. It is not an official Google website. Google and Google Developer Groups are trademarks of Google LLC.",
    nonImpersonation: "This is an independent community portal and does not impersonate Google or the official Google Developer Groups platform.",
    postalNotice: "Campus address excludes postal code due to conflicting records in official university registrations.",
  }
};

// Aliases for compatibility
export const CHAPTER_CONFIG = COMMUNITY_CONFIG;
export const COMMUNITY_CHANNELS = COMMUNITY_CONFIG.channels;
