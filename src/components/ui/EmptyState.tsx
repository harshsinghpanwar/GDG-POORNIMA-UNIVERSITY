import React from 'react';
import { Inbox } from 'lucide-react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-[#FFFFFF] border border-dashed border-[#E6E3DC] ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-[#F4F2EC] border border-[#E6E3DC] flex items-center justify-center text-[#4B525C] mb-4">
        {icon || <Inbox className="w-7 h-7" aria-hidden="true" />}
      </div>
      <h3 className="text-lg font-bold text-[#15171A] font-display mb-2">{title}</h3>
      <p className="text-sm text-[#4B525C] max-w-md leading-relaxed mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};
