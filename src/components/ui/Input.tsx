import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  error,
  className = '',
  ...props
}, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full px-3.5 py-2.5 rounded-lg bg-[#FFFFFF] border text-[#15171A] placeholder-[#4B525C]/60 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8] disabled:opacity-50 disabled:cursor-not-allowed ${
        error ? 'border-[#D93025] ring-1 ring-[#D93025]' : 'border-[#E6E3DC] hover:border-[#D1CDC2]'
      } ${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';
