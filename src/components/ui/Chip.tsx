import React from 'react';

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  count?: number;
}

export const Chip: React.FC<ChipProps> = ({
  selected = false,
  count,
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] cursor-pointer ${
        selected
          ? 'bg-[#1A73E8] text-white font-semibold shadow-xs'
          : 'bg-[#FFFFFF] text-[#4B525C] hover:text-[#15171A] hover:bg-[#F4F2EC] border border-[#E6E3DC] hover:border-[#D1CDC2]'
      } ${className}`}
      {...props}
    >
      <span>{children}</span>
      {typeof count === 'number' && (
        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
          selected ? 'bg-[#1557B0] text-white' : 'bg-[#F4F2EC] text-[#4B525C]'
        }`}>
          {count}
        </span>
      )}
    </button>
  );
};
