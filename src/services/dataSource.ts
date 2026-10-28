import { 
  CommunityEvent, 
  Project, 
  TeamMember, 
  LearningResource, 
  LearningArea, 
  FAQItem 
} from '../types/community';
import { EVENTS } from '../data/events';
import { TEAM_MEMBERS } from '../data/team';
import { PROJECTS } from '../data/projects';
import { LEARNING_RESOURCES } from '../data/resources';
import { LEARNING_AREAS } from '../data/learningAreas';
import { FAQS } from '../data/faqs';
import { COMMUNITY_CONFIG } from '../config/community';

export interface EventFilterOptions {
  category?: string;
  format?: string;
  status?: 'all' | 'upcoming' | 'past';
  query?: string;
}

export interface ProjectFilterOptions {
  tag?: string;
  query?: string;
}

export interface ResourceFilterOptions {
  topic?: string;
  level?: string;
  query?: string;
}

/**
 * Asynchronous data access functions (Section 9)
 * Separates data logic from UI components.
 * Remote providers (such as Firestore) can replace this implementation later
 * without modifying UI pages. No artificial setTimeout delays.
 */

export async function getEvents(filters?: EventFilterOptions): Promise<CommunityEvent[]> {
  let result = [...EVENTS];

  if (filters?.category && filters.category !== 'all') {
    result = result.filter(e => 
      e.categories.some(c => c.toLowerCase() === filters.category!.toLowerCase())
    );
  }

  if (filters?.format && filters.format !== 'all') {
    result = result.filter(e => e.format.toLowerCase().includes(filters.format!.toLowerCase()));
  }

  if (filters?.query) {
    const q = filters.query.toLowerCase().trim();
    result = result.filter(e => 
      e.title.toLowerCase().includes(q) ||
      e.summary.toLowerCase().includes(q) ||
      (e.venue && e.venue.toLowerCase().includes(q)) ||
      e.categories.some(c => c.toLowerCase().includes(q))
    );
  }

  // Sort descending by start time
  return result.sort((a, b) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime());
}

export async function getEventBySlug(slug: string): Promise<CommunityEvent | null> {
  const event = EVENTS.find(e => e.slug === slug || e.id === slug);
  return event || null;
}

export async function getProjects(filters?: ProjectFilterOptions): Promise<Project[]> {
  let result = [...PROJECTS];

  if (filters?.tag && filters.tag !== 'all') {
    result = result.filter(p => 
      p.techTags.some(t => t.toLowerCase() === filters.tag!.toLowerCase())
    );
  }

  if (filters?.query) {
    const q = filters.query.toLowerCase().trim();
    result = result.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.techTags.some(t => t.toLowerCase().includes(q))
    );
  }

  return result;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const proj = PROJECTS.find(p => p.slug === slug || p.id === slug);
  return proj || null;
}

export async function getTeam(): Promise<TeamMember[]> {
  return [...TEAM_MEMBERS];
}

export async function getResources(filters?: ResourceFilterOptions): Promise<LearningResource[]> {
  let result = [...LEARNING_RESOURCES];

  if (filters?.topic && filters.topic !== 'all') {
    result = result.filter(r => r.topic.toLowerCase() === filters.topic!.toLowerCase());
  }

  if (filters?.level && filters.level !== 'all') {
    result = result.filter(r => r.level.toLowerCase() === filters.level!.toLowerCase());
  }

  if (filters?.query) {
    const q = filters.query.toLowerCase().trim();
    result = result.filter(r => 
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.topic.toLowerCase().includes(q)
    );
  }

  return result;
}

export async function getFaqs(category?: string): Promise<FAQItem[]> {
  if (category && category !== 'all') {
    return FAQS.filter(f => f.category === category);
  }
  return [...FAQS];
}

export async function getLearningAreas(): Promise<LearningArea[]> {
  return [...LEARNING_AREAS];
}

// Global search helper
export interface SearchItem {
  type: 'event' | 'project' | 'team' | 'resource' | 'faq' | 'channel';
  title: string;
  subtitle: string;
  url: string;
  badge?: string;
}

export async function searchGlobal(query: string): Promise<SearchItem[]> {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: SearchItem[] = [];

  // Search Events
  for (const event of EVENTS) {
    if (
      event.title.toLowerCase().includes(q) || 
      event.summary.toLowerCase().includes(q) ||
      event.categories.some(c => c.toLowerCase().includes(q))
    ) {
      results.push({
        type: 'event',
        title: event.title,
        subtitle: `${event.displayDate || ''} • ${event.format}`,
        url: `/events/${event.slug}`,
        badge: 'Event'
      });
    }
  }

  // Search Team
  for (const member of TEAM_MEMBERS) {
    if (
      member.name.toLowerCase().includes(q) || 
      member.role.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'team',
        title: member.name,
        subtitle: member.role,
        url: '/team',
        badge: 'Organizer'
      });
    }
  }

  // Search Resources
  for (const resource of LEARNING_RESOURCES) {
    if (
      resource.title.toLowerCase().includes(q) || 
      resource.description.toLowerCase().includes(q) ||
      resource.topic.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'resource',
        title: resource.title,
        subtitle: `${resource.topic} • ${resource.level}`,
        url: '/resources',
        badge: 'Resource'
      });
    }
  }

  // Search FAQs
  for (const faq of FAQS) {
    if (
      faq.question.toLowerCase().includes(q) || 
      faq.answer.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'faq',
        title: faq.question,
        subtitle: faq.answer.slice(0, 100) + '...',
        url: '/faq',
        badge: 'FAQ'
      });
    }
  }

  // Quick channels
  if ('whatsapp telegram group channel chat'.includes(q)) {
    results.push({
      type: 'channel',
      title: 'Official Community WhatsApp Group',
      subtitle: 'Real-time discussions and updates for members',
      url: COMMUNITY_CONFIG.channels.whatsapp,
      badge: 'Channel'
    });
    results.push({
      type: 'channel',
      title: 'Official Community Telegram Channel',
      subtitle: 'Broadcast alerts and resource links',
      url: COMMUNITY_CONFIG.channels.telegram,
      badge: 'Channel'
    });
  }

  return results;
}

// Unified dataSource object for components
export const dataSource = {
  getEvents,
  getEventBySlug,
  getProjects,
  getProjectBySlug,
  getTeam,
  getResources,
  getFaqs,
  getLearningAreas,
  searchGlobal
};
