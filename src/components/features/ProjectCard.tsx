import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { StudentProject } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export interface ProjectCardProps {
  project: StudentProject;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card 
      variant="bordered" 
      padding="md" 
      className="flex flex-col justify-between h-full bg-[#FFFFFF] border-[#E6E3DC] hover:border-[#D1CDC2] hover:shadow-[0_4px_16px_-4px_rgba(21,23,26,0.06)] transition-all"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="blue" size="sm">
            {project.domain.toUpperCase()}
          </Badge>
          {project.placeholder && (
            <Badge variant="outline" size="sm">
              Community Prototype
            </Badge>
          )}
        </div>

        <h3 className="text-lg font-bold font-display text-[#15171A] mb-1.5">
          {project.title}
        </h3>
        
        <p className="text-xs font-semibold text-[#1557B0] mb-2">
          {project.tagline}
        </p>

        <p className="text-sm text-[#4B525C] leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded bg-[#F4F2EC] text-[11px] font-mono text-[#4B525C] border border-[#E6E3DC]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-[#E6E3DC] flex items-center justify-between gap-3 text-xs">
        {project.authorOrTeam && (
          <span className="text-[#4B525C] font-medium">
            By: {project.authorOrTeam}
          </span>
        )}

        <div className="flex items-center gap-2 ml-auto">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-[#4B525C] hover:text-[#1557B0] hover:bg-[#F4F2EC] transition-colors"
              aria-label={`View ${project.title} on GitHub (opens in new tab)`}
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-[#4B525C] hover:text-[#1557B0] hover:bg-[#F4F2EC] transition-colors"
              aria-label={`Visit live demo of ${project.title} (opens in new tab)`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};
