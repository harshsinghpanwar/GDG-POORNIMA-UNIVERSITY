import React from 'react';
import { ExternalLink } from 'lucide-react';
import { LearningResource } from '../../types/community';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export interface ResourceCardProps {
  resource: LearningResource | {
    id: string;
    title: string;
    description: string;
    url: string;
    topic: string;
    level: string;
  };
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  return (
    <Card
      variant="bordered"
      padding="md"
      className="flex flex-col justify-between h-full bg-[#FFFFFF] border-[#E6E3DC] hover:border-[#D1CDC2] hover:shadow-[0_4px_16px_-4px_rgba(21,23,26,0.06)] transition-all group"
    >
      <div>
        {/* Topic & Skill Level Badges (Section 8.7) */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="blue" size="sm">
            {resource.topic}
          </Badge>

          <Badge variant={resource.level === 'Beginner' ? 'emerald' : 'outline'} size="sm">
            {resource.level}
          </Badge>
        </div>

        <h3 className="text-lg font-bold font-display text-[#15171A] group-hover:text-[#1557B0] transition-colors mb-2">
          {resource.title}
        </h3>

        <p className="text-sm text-[#4B525C] leading-relaxed mb-4">
          {resource.description}
        </p>
      </div>

      <div className="pt-3 border-t border-[#E6E3DC]">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1557B0] hover:text-[#1A73E8] transition-colors"
        >
          <span>Open authoritative documentation</span>
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </Card>
  );
};
