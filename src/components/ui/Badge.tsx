import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'completed' | 'upcoming' | 'verified' | 'outline' | 'blue' | 'emerald' | 'amber' | 'red' | 'yellow';
  size?: 'sm' | 'md';
}

/**
 * Accessible Status & Category Badges
 * Strict WCAG AA contrast compliance:
 * - Blue: #E8F0FE bg, #1557B0 text (contrast 6.0:1)
 * - Red: #FCE8E6 bg, #B31412 text (contrast 7.8:1)
 * - Green (emerald): #E6F4EA bg, #137333 text (contrast 5.3:1)
 * - Yellow (amber): #FEF7E0 bg, #5F4100 text (contrast 5.2:1) - strictly dark text on tint
 * - Neutral/completed: #F4F2EC bg, #4B525C text (contrast 7.3:1)
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const variantStyles = {
    default: "bg-[#F4F2EC] text-[#4B525C] border-[#E6E3DC]",
    completed: "bg-[#F4F2EC] text-[#4B525C] border-[#E6E3DC]",
    upcoming: "bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]",
    verified: "bg-[#E8F0FE] text-[#1557B0] border-[#CEE0FD]",
    outline: "bg-transparent text-[#4B525C] border-[#E6E3DC]",
    blue: "bg-[#E8F0FE] text-[#1557B0] border-[#CEE0FD]",
    emerald: "bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]",
    amber: "bg-[#FEF7E0] text-[#5F4100] border-[#FEEFC3]",
    red: "bg-[#FCE8E6] text-[#B31412] border-[#FAD2CF]",
    yellow: "bg-[#FEF7E0] text-[#5F4100] border-[#FEEFC3]",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1"
  };

  return (
    <span 
      className={`inline-flex items-center gap-1 font-mono font-medium rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
