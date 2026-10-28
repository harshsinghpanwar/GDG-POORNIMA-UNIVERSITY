import React from 'react';

export interface BranchMotifProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

/**
 * Signature Motif: The Branch Graph (Section 5.4)
 * Represents collaborative engineering (branches merging) with 4 coloured nodes:
 * Blue (#1A73E8), Red (#D93025), Yellow (#F9AB00), Green (#188038).
 */
export const BranchMotif: React.FC<BranchMotifProps> = ({ 
  className = "",
  orientation = 'horizontal' 
}) => {
  if (orientation === 'vertical') {
    return (
      <svg
        viewBox="0 0 40 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
        aria-hidden="true"
        className={`overflow-visible ${className}`}
      >
        {/* Main trunk line */}
        <line x1="12" y1="0" x2="12" y2="160" stroke="#E6E3DC" strokeWidth="2" strokeDasharray="3 3" />
        <line x1="12" y1="20" x2="12" y2="140" stroke="#15171A" strokeWidth="2" />
        
        {/* Branch line */}
        <path
          d="M12 40C12 60 28 55 28 80C28 105 12 100 12 120"
          stroke="#15171A"
          strokeWidth="2"
          fill="none"
        />

        {/* 4 Colored Nodes */}
        <circle cx="12" cy="30" r="4.5" fill="#1A73E8" stroke="#FBFAF7" strokeWidth="2" />
        <circle cx="28" cy="65" r="4" fill="#D93025" stroke="#FBFAF7" strokeWidth="2" />
        <circle cx="28" cy="95" r="4" fill="#F9AB00" stroke="#FBFAF7" strokeWidth="2" />
        <circle cx="12" cy="130" r="4.5" fill="#188038" stroke="#FBFAF7" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 240 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      aria-hidden="true"
      className={`overflow-visible ${className}`}
    >
      {/* Main trunk line */}
      <line x1="0" y1="20" x2="240" y2="20" stroke="#E6E3DC" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="20" y1="20" x2="220" y2="20" stroke="#15171A" strokeWidth="2" strokeLinecap="round" />

      {/* Curved feature branch */}
      <path
        d="M40 20C60 20 70 8 100 8H140C170 8 180 20 200 20"
        stroke="#15171A"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* 4 Coloured Nodes: Blue, Red, Yellow, Green */}
      <circle cx="36" cy="20" r="4.5" fill="#1A73E8" stroke="#FBFAF7" strokeWidth="2" />
      <circle cx="95" cy="8" r="4" fill="#D93025" stroke="#FBFAF7" strokeWidth="2" />
      <circle cx="145" cy="8" r="4" fill="#F9AB00" stroke="#FBFAF7" strokeWidth="2" />
      <circle cx="204" cy="20" r="4.5" fill="#188038" stroke="#FBFAF7" strokeWidth="2" />
    </svg>
  );
};
