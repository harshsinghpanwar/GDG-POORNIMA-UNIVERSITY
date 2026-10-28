/**
 * Core Domain & Application Type Definitions
 * GDG on Campus Poornima University - Jaipur, India
 */

export type ActiveView = 
  | 'architecture' 
  | 'design-system' 
  | 'components' 
  | 'accessibility' 
  | 'section-15' 
  | 'section-16';

export type ThemeMode = 'dark' | 'light' | 'high-contrast';

export type ColorVisionFilter = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

export interface C4Node {
  id: string;
  name: string;
  type: 'client' | 'gateway' | 'service' | 'database' | 'cache' | 'queue';
  layer: 'Presentation' | 'API Gateway' | 'Domain Core' | 'Data Tier' | 'Messaging';
  description: string;
  technology: string;
  p99Latency: string;
  sla: string;
  status: 'healthy' | 'warning' | 'degraded';
  dependencies: string[];
  contractSchema: string;
  faultTolerance: {
    circuitBreaker: string;
    retryPolicy: string;
    fallback: string;
  };
}

export interface DesignToken {
  category: 'color' | 'typography' | 'spacing' | 'radius' | 'shadow';
  name: string;
  value: string;
  computed: string;
  contrastOnDark?: number;
  contrastOnLight?: number;
  description: string;
}

export interface StageItem {
  stageNumber: number;
  title: string;
  subtitle: string;
  discipline: string;
  status: 'completed' | 'in-progress' | 'pending';
  deliverables: string[];
  architecturalDecisions: string[];
  verificationCriteria: string;
}

export interface MetricItem {
  id: string;
  label: string;
  value: string;
  subValue: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  timeframe: string;
}

export interface AuditScoreItem {
  dimension: string;
  score: number;
  status: 'exemplary' | 'pass' | 'attention';
  leadReviewer: string;
  notes: string;
}

/* =========================================================================
 * CHAPTER DOMAIN TYPES
 * ========================================================================= */

export type EventFormat = 'in-person' | 'virtual' | 'hybrid' | 'virtual (online)';
export type EventState = 'completed' | 'upcoming';

export interface ChapterEvent {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description?: string;
  status?: EventState;
  placeholder?: boolean;
  startsAt: string;     // ISO with +05:30 (Section 9)
  endsAt: string;       // ISO with +05:30 (Section 9)
  dateISO?: string;     // alias for startsAt
  displayDate?: string; // formatted in IST
  timeIST?: string;     // e.g. "10:00 to 11:00 IST"
  format: EventFormat;
  venue?: string;       // strictly no PIN code
  categories: string[];
  notes?: string;
  officialUrl: string;
  registrationUrl?: string;
  registrationNote?: string;
  agenda?: { time: string; title: string; description?: string }[];
  speakers?: { name: string; roleOrAffiliation: string }[];
  costNote?: string;
}

export * from './community';

export type ProjectDomain = 'all' | 'web' | 'mobile' | 'ai-ml' | 'cloud' | 'open-source';

export interface StudentProject {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  domain: 'web' | 'mobile' | 'ai-ml' | 'cloud' | 'open-source';
  technologies: string[];
  placeholder: boolean;
  submissionNote?: string;
  githubUrl?: string;
  liveUrl?: string;
  authorOrTeam?: string;
}

export type TeamDomain = 'all' | 'lead' | 'technical' | 'community' | 'faculty';

export interface TeamOrganizer {
  id: string;
  name: string;
  roleTitle: string;
  domain: 'lead' | 'technical' | 'community' | 'faculty';
  institution: string;
  verified: boolean;
  bio?: string;
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
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  description: string;
  technologies: string[];
  milestones: LearningMilestone[];
  estimatedWeeks: number;
}

export interface LearningArea {
  id: string;
  title: string;
  description: string;
  accent: 'blue' | 'emerald' | 'amber' | 'rose' | 'indigo';
  iconName: string;
  technologies: string[];
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'documentation' | 'curriculum' | 'tools' | 'starter-kit';
  description: string;
  url: string;
  isExternal: boolean;
  tags: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'events' | 'membership' | 'projects';
}

export interface ContactSubmission {
  name: string;
  topic: string;
  message: string;
  targetChannel: 'whatsapp' | 'telegram' | 'linkedin' | 'instagram' | 'community-page';
}

export interface EventFilterParams {
  category?: string;
  format?: 'all' | EventFormat;
  status?: 'all' | EventState;
  query?: string;
}

export interface ProjectFilterParams {
  domain?: ProjectDomain;
  query?: string;
}

export interface IDataSource {
  getEvents(filters?: EventFilterParams): Promise<ChapterEvent[]>;
  getEventBySlug(slug: string): Promise<ChapterEvent | null>;
  getProjects(filters?: ProjectFilterParams): Promise<StudentProject[]>;
  getProjectBySlug(slug: string): Promise<StudentProject | null>;
  getTeam(): Promise<TeamOrganizer[]>;
  getLearningTracks(): Promise<LearningTrack[]>;
  getLearningAreas(): Promise<LearningArea[]>;
  getResources(): Promise<ResourceItem[]>;
  getFaqs(category?: string): Promise<FaqItem[]>;
  searchGlobal(query: string): Promise<SearchResult[]>;
}

export interface SearchResult {
  type: 'event' | 'project' | 'team' | 'track' | 'faq' | 'channel';
  title: string;
  subtitle: string;
  url: string;
  badge?: string;
}
