import React from 'react';
import { Container } from './Container';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  badge?: string;
  title?: string;
  description?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'full';
}

export const Section: React.FC<SectionProps> = ({
  id,
  badge,
  title,
  description,
  containerSize = 'lg',
  className = '',
  children,
  ...props
}) => {
  return (
    <section 
      id={id} 
      aria-labelledby={title ? `${id}-heading` : undefined}
      className={`py-14 md:py-20 relative ${className}`}
      {...props}
    >
      <Container size={containerSize}>
        {(badge || title || description) && (
          <div className="mb-10 max-w-3xl">
            {badge && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wide uppercase bg-[#E8F0FE] text-[#1557B0] border border-[#CEE0FD] mb-3">
                {badge}
              </span>
            )}
            {title && (
              <h2 
                id={`${id}-heading`} 
                className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display tracking-tight text-[#15171A]"
              >
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-2.5 text-base sm:text-lg text-[#4B525C] leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
};
