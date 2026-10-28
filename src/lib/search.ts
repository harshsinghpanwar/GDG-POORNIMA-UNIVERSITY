/**
 * Client-side search and scoring utilities
 */

export function matchQuery(text: string, query: string): boolean {
  if (!text || !query) return false;
  return text.toLowerCase().includes(query.toLowerCase().trim());
}

export function highlightMatch(text: string, query: string): string {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark class="bg-blue-500/30 text-blue-200 px-0.5 rounded">$1</mark>');
}
