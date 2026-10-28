import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rect' | 'circle';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
  style,
  ...props
}) => {
  const variantStyles = {
    text: "h-4 rounded",
    rect: "rounded-xl",
    circle: "rounded-full"
  };

  const inlineStyles: React.CSSProperties = {
    ...style,
    width: width,
    height: height
  };

  return (
    <div
      aria-hidden="true"
      className={`animate-pulse bg-[#E6E3DC] ${variantStyles[variant]} ${className}`}
      style={inlineStyles}
      {...props}
    />
  );
};
