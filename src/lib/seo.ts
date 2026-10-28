import { useEffect } from 'react';
import { COMMUNITY_CONFIG } from '../config/community';

export interface SeoProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
}

export function usePageSeo({ title, description, canonicalUrl }: SeoProps) {
  useEffect(() => {
    // Dynamic document title
    const fullTitle = title 
      ? `${title} | ${COMMUNITY_CONFIG.shortName}`
      : `${COMMUNITY_CONFIG.shortName} – Student Developer Community | Jaipur, India`;
    document.title = fullTitle;

    // Meta description
    const descContent = description || COMMUNITY_CONFIG.description || 'Student developer community at Poornima University, Jaipur.';
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', descContent);

    // Canonical link
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);
    }
  }, [title, description, canonicalUrl]);
}
