import React from 'react';

export interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

/**
 * Signature Brand Identity Logo: The "Branch Graph" (Section 5.4)
 * GDG on Campus Poornima University - Jaipur, India
 * 
 * Strict Compliance:
 * - An original git-style branch line with four coloured nodes (blue, red, yellow, green).
 * - Represents collaboration (branches merging).
 * - Looks nothing like official GDG angle brackets or any corporate trademark.
 * - Wordmark includes "GDG on Campus" with "Poornima University" beneath.
 */
export const Logo: React.FC<LogoProps> = ({
  size = 36,
  showText = true,
  className = ""
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Original Git Branch Graph Mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="GDG on Campus Poornima University Branch Mark"
        className="shrink-0 transition-transform duration-200 hover:scale-105"
      >
        <title>GDG on Campus Poornima University Branch Mark</title>

        {/* Main Trunk Line */}
        <line
          x1="10"
          y1="5"
          x2="10"
          y2="31"
          stroke="#15171A"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Feature Branch splitting from trunk and merging back */}
        <path
          d="M10 11C10 15.5 26 13.5 26 18C26 22.5 10 20.5 10 25"
          stroke="#15171A"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* 4 Coloured Collaboration Nodes */}
        {/* Node 1: Blue (Base Trunk Commit) */}
        <circle cx="10" cy="9" r="4" fill="#1A73E8" stroke="#FBFAF7" strokeWidth="1.5" />

        {/* Node 2: Red (Branch Out Commit) */}
        <circle cx="23" cy="14.5" r="3.75" fill="#D93025" stroke="#FBFAF7" strokeWidth="1.5" />

        {/* Node 3: Yellow (Peer Review & Merge Prep Commit) */}
        <circle cx="23" cy="21.5" r="3.75" fill="#F9AB00" stroke="#FBFAF7" strokeWidth="1.5" />

        {/* Node 4: Green (Merge Back to Trunk Release Commit) */}
        <circle cx="10" cy="27" r="4" fill="#188038" stroke="#FBFAF7" strokeWidth="1.5" />
      </svg>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-bold tracking-tight font-display text-[#15171A] text-base sm:text-lg leading-tight">
            GDG on Campus
          </span>
          <span className="text-xs text-[#4B525C] font-semibold tracking-normal leading-tight font-sans">
            Poornima University
          </span>
        </div>
      )}
    </div>
  );
};
