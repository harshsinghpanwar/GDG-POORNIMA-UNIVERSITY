import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'full';
}

/**
 * Responsive Page Container (Section 5.3)
 * Container max-width: 1200px with responsive gutters (px-4 sm:px-6 lg:px-8).
 */
export const Container: React.FC<ContainerProps> = ({
  size = 'lg',
  className = '',
  children,
  ...props
}) => {
  const sizeStyles = {
    sm: "max-w-2xl",       // ~672px
    md: "max-w-4xl",       // ~896px
    lg: "max-w-[1200px]",  // strictly 1200px per Section 5.3
    full: "max-w-full"
  };

  return (
    <div 
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
