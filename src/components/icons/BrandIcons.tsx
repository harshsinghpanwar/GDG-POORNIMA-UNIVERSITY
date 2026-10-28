import React from 'react';

interface BrandIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}

/**
 * WhatsApp Accessible SVG Brand Icon
 */
export const WhatsAppIcon: React.FC<BrandIconProps> = ({ 
  size = 20, 
  title = "WhatsApp", 
  className = "", 
  ...props 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    role="img"
    aria-label={title}
    className={`inline-block shrink-0 ${className}`}
    {...props}
  >
    <title>{title}</title>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.34C9.33 7.34 9.04 7.41 8.8 7.68C8.55 7.94 7.86 8.59 7.86 9.91C7.86 11.23 8.82 12.5 8.96 12.69C9.09 12.87 10.82 15.54 13.48 16.69C14.12 16.96 14.61 17.12 15 17.25C15.65 17.45 16.24 17.43 16.71 17.36C17.23 17.28 18.31 16.71 18.54 16.07C18.77 15.43 18.77 14.88 18.7 14.77C18.63 14.66 18.45 14.6 18.18 14.46C17.91 14.33 16.58 13.68 16.33 13.59C16.08 13.5 15.9 13.45 15.72 13.72C15.54 13.99 15.02 14.6 14.86 14.79C14.71 14.97 14.55 15 14.28 14.86C14.01 14.73 13.14 14.44 12.11 13.52C11.3 12.8 10.75 11.91 10.6 11.64C10.44 11.37 10.58 11.22 10.72 11.08C10.84 10.96 10.99 10.77 11.13 10.61C11.26 10.45 11.31 10.33 11.4 10.15C11.49 9.97 11.45 9.81 11.38 9.68C11.31 9.54 10.73 8.1 10.49 7.51C10.25 6.94 10.01 7.02 9.83 7.01C9.66 7 9.53 7.34 9.53 7.34Z" />
  </svg>
);

/**
 * Instagram Accessible SVG Brand Icon
 */
export const InstagramIcon: React.FC<BrandIconProps> = ({ 
  size = 20, 
  title = "Instagram", 
  className = "", 
  ...props 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    role="img"
    aria-label={title}
    className={`inline-block shrink-0 ${className}`}
    {...props}
  >
    <title>{title}</title>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

/**
 * LinkedIn Accessible SVG Brand Icon
 */
export const LinkedInIcon: React.FC<BrandIconProps> = ({ 
  size = 20, 
  title = "LinkedIn", 
  className = "", 
  ...props 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    role="img"
    aria-label={title}
    className={`inline-block shrink-0 ${className}`}
    {...props}
  >
    <title>{title}</title>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

/**
 * Telegram Accessible SVG Brand Icon
 */
export const TelegramIcon: React.FC<BrandIconProps> = ({ 
  size = 20, 
  title = "Telegram", 
  className = "", 
  ...props 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    role="img"
    aria-label={title}
    className={`inline-block shrink-0 ${className}`}
    {...props}
  >
    <title>{title}</title>
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

/**
 * Generic Globe/ExternalLink Accessible SVG Icon
 */
export const GlobeLinkIcon: React.FC<BrandIconProps> = ({ 
  size = 20, 
  title = "External Link", 
  className = "", 
  ...props 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    role="img"
    aria-label={title}
    className={`inline-block shrink-0 ${className}`}
    {...props}
  >
    <title>{title}</title>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);
