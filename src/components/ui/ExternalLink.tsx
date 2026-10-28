import React from 'react';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { isSafeUrl } from '../../lib/safeUrl';

export interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  showIcon?: boolean;
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,
  showIcon = true,
  className = "",
  children,
  ...props
}) => {
  const safeHref = isSafeUrl(href) ? href : '#';

  return (
    <a
      href={safeHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-[#1557B0] hover:text-[#1A73E8] transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] rounded ${className}`}
      {...props}
    >
      <span>{children}</span>
      {showIcon && (
        <ExternalLinkIcon className="w-3.5 h-3.5 shrink-0 opacity-80" aria-hidden="true" />
      )}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
};
