/**
 * Safe URL validation helper (Section 9 & Section 13)
 * Strict Requirement: Allows ONLY https: URLs (and rejects anything else) before rendering.
 */

export function isSafeUrl(url: string | undefined | null): boolean {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function safeUrl(url: string | undefined | null): string {
  if (!url) return '';
  return isSafeUrl(url) ? url : '';
}

export function getSafeExternalLinkProps(url: string) {
  const safe = safeUrl(url);
  if (safe) {
    return {
      href: safe,
      target: '_blank' as const,
      rel: 'noopener noreferrer' as const
    };
  }
  return {
    href: '#'
  };
}
