import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

/**
 * Universal Button Component (Section 5.3)
 * States: default, hover, focus-visible (2px blue ring with offset), active, disabled, loading.
 * Transitions: 150 to 250ms ease-out.
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFAF7] disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-lg cursor-pointer";
  
  const variantStyles = {
    primary: "bg-[#1A73E8] hover:bg-[#1557B0] text-white shadow-xs active:bg-[#0d47a1] active:scale-[0.98]",
    secondary: "bg-[#F4F2EC] hover:bg-[#E6E3DC] text-[#15171A] border border-[#E6E3DC] active:bg-[#D1CDC2] active:scale-[0.98]",
    outline: "bg-transparent hover:bg-[#F4F2EC] text-[#15171A] border border-[#E6E3DC] active:bg-[#E6E3DC] active:scale-[0.98]",
    ghost: "bg-transparent hover:bg-[#F4F2EC] text-[#4B525C] hover:text-[#15171A] active:bg-[#E6E3DC]",
    danger: "bg-[#D93025] hover:bg-[#B31412] text-white active:bg-[#900000] active:scale-[0.98]"
  };

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5 min-h-[36px]",
    md: "text-sm px-4 py-2 gap-2 min-h-[44px]", // >= 44px touch target (Section 11)
    lg: "text-base px-6 py-2.5 gap-2.5 min-h-[48px]"
  };

  const isDisabled = disabled || loading;

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={isDisabled}
      aria-busy={loading ? "true" : undefined}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
};
