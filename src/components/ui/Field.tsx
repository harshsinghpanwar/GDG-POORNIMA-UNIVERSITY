import React from 'react';

export interface FieldProps {
  id: string;
  label: string;
  error?: string;
  helpText?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Field: React.FC<FieldProps> = ({
  id,
  label,
  error,
  helpText,
  required,
  children,
  className = ""
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label htmlFor={id} className="block text-sm font-semibold text-[#15171A]">
        {label}
        {required && <span className="text-[#D93025] ml-1" aria-hidden="true">*</span>}
      </label>
      {children}
      {helpText && !error && (
        <p id={`${id}-help`} className="text-xs text-[#4B525C]">
          {helpText}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs text-[#B31412] font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
