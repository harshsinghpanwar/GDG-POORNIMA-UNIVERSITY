/**
 * Typed Data Models conforming to Section 9: DATA MODEL AND DATA LAYER
 * GDG on Campus Poornima University - Jaipur, India
 */

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  isExternal?: boolean;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  ariaLabel: string;
  icon: string;
  ctaText: string;
}

export interface CommunityConfig {
  name: string;
  shortName: string;
  tagline: string;
  description?: string;
  location: string;
  officialUrl: string;
  siteUrl: string;
  navItems: NavItem[];
  socialLinks: SocialLink[];
  interestFormUrl: string | null;
  channels: {
    officialCommunityPage: string;
    whatsapp: string;
    instagram: string;
    linkedin: string;
    telegram: string;
  };
  disclaimers: {
    independence: string;
    nonImpersonation: string;
    postalNotice: string;
  };
}

export type ChapterConfig = CommunityConfig;

export type ProjectDomain = 'all' | 'web' | 'mobile' | 'ai-ml' | 'cloud' | 'open-source';

export type EventFormat = 'in-person' | 'virtual' | 'hybrid' | 'virtual (online)';

export interface EventSpeaker {
  name: string;
  roleOrAffiliation: string;
}

export interface AgendaItem {
  time: string;
  title: string;
  description?: string;
}

export interface CommunityEvent {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description?: string;
  startsAt: string; // ISO with +05:30
  endsAt: string;   // ISO with +05:30
  format: EventFormat;
  venue?: string;   // strictly no PIN code
  categories: string[];
  officialUrl: string;
  registrationUrl?: string;
  agenda?: AgendaItem[];
  speakers?: EventSpeaker[];
  image?: {
    src: string;
    alt: string;
  };
  costNote?: string;
  placeholder?: boolean;
  // Aliases for compatibility
  dateISO?: string;
  displayDate?: string;
  timeIST?: string;
  notes?: string;
  registrationNote?: string;
  status?: 'completed' | 'upcoming';
}

// Backward-compatible alias
export type ChapterEvent = CommunityEvent;

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  status?: 'active' | 'archived' | 'completed' | 'in-progress';
  techTags: string[];
  contributors: string[];
  repoUrl?: string;
  demoUrl?: string;
  image?: {
    src: string;
    alt: string;
  };
  placeholder?: boolean;
  tagline?: string;
  domain?: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  authorOrTeam?: string;
  submissionNote?: string;
}

// Backward-compatible alias
export type StudentProject = Project;

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  roleTitle?: string;
  profileUrl?: string;
  photo?: string;
  bio?: string;
  links?: {
    label: string;
    url: string;
  }[];
  placeholder?: boolean;
  domain?: string;
  institution?: string;
  verified?: boolean;
}

// Backward-compatible alias
export type TeamOrganizer = TeamMember;

export type ResourceTopic = 'Web' | 'Android' | 'AI/ML' | 'Cloud' | 'Open source' | 'Git and tooling';
export type ResourceLevel = 'Beginner' | 'Intermediate';

export interface LearningResource {
  id: string;
  title: string;
  description: string;
  url: string;
  topic: ResourceTopic;
  level: ResourceLevel;
}

// Backward-compatible alias
export interface ResourceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  url: string;
  isExternal: boolean;
  tags: string[];
  level?: ResourceLevel;
  topic?: ResourceTopic;
}

export type FaqCategory = 'joining' | 'eligibility' | 'beginner participation' | 'events' | 'projects' | 'volunteering' | 'learning resources';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory | string;
}

// Backward-compatible alias
export type FaqItem = FAQItem;

export interface LearningArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  resourceTopic: ResourceTopic;
  technologies?: string[];
}

export interface LearningMilestone {
  step: number;
  title: string;
  description: string;
  duration: string;
}

export interface LearningTrack {
  id: string;
  title: string;
  domain: string;
  level: 'Beginner' | 'Intermediate';
  summary: string;
  description: string;
  technologies: string[];
  milestones: LearningMilestone[];
  estimatedWeeks: number;
}
