import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Surface Card Container
 * Section 5.1 Palette:
 * - Surface: #FFFFFF
 * - Border: #E6E3DC
 * - Generous whitespace, refined elevation, zero heavy gradients
 */
export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  className = '',
  children,
  ...props
}) => {
  const variantStyles = {
    default: "bg-[#FFFFFF] border border-[#E6E3DC] shadow-[0_1px_3px_0_rgba(21,23,26,0.04)]",
    elevated: "bg-[#FFFFFF] border border-[#E6E3DC] shadow-[0_4px_16px_-2px_rgba(21,23,26,0.06)]",
    bordered: "bg-[#FBFAF7] border border-[#E6E3DC]",
    interactive: "bg-[#FFFFFF] border border-[#E6E3DC] hover:border-[#D1CDC2] hover:shadow-[0_4px_16px_-4px_rgba(21,23,26,0.08)] transition-all duration-200"
  };

  const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  };

  return (
    <div 
      className={`rounded-xl overflow-hidden ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
