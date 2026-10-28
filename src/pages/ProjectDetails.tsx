import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, FolderGit2 } from 'lucide-react';
import { dataSource } from '../services/dataSource';
import { Project } from '../types/community';
import { usePageSeo } from '../lib/seo';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const ProjectDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      dataSource.getProjectBySlug(slug).then((p) => {
        setProject(p);
        setLoading(false);
      });
    }
  }, [slug]);

  usePageSeo({
    title: project ? project.title : "Project Details",
    description: project?.description || "GDG on Campus Poornima University project showcase"
  });

  if (loading) {
    return (
      <Container size="md" className="py-20 text-center">
        <p className="text-[#4B525C]">Loading project details...</p>
      </Container>
    );
  }

  // Friendly not found state for unknown slug (Section 6 & 8.5)
  if (!project) {
    return (
      <div className="py-16 md:py-24">
        <Container size="md" className="text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-[#F4F2EC] border border-[#E6E3DC] text-[#4B525C] flex items-center justify-center mx-auto">
            <FolderGit2 className="w-7 h-7 text-[#1557B0]" aria-hidden="true" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#15171A]">
              Project Not Found
            </h1>
            <p className="text-sm text-[#4B525C] max-w-md mx-auto leading-relaxed">
              No project was found matching "{slug}". It may have moved or the link may be inaccurate.
            </p>
          </div>
          <div className="pt-2">
            <Link to="/projects">
              <Button variant="primary" size="md">
                Return to Projects Directory
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20">
      <Container size="md">
        
        {/* Back Link */}
        <Link 
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-[#4B525C] hover:text-[#1557B0] transition-colors mb-6 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] rounded px-1"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects Showcase</span>
        </Link>

        {/* Project Card */}
        <article className="bg-[#FFFFFF] border border-[#E6E3DC] rounded-3xl p-6 sm:p-10 space-y-6 shadow-[0_4px_16px_-4px_rgba(21,23,26,0.06)]">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1557B0]">
              {project.status || 'Active'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold font-display text-[#15171A]">
            {project.title}
          </h1>

          <p className="text-base text-[#4B525C] leading-relaxed">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="pt-4 border-t border-[#E6E3DC]">
            <h2 className="text-xs font-mono font-semibold text-[#15171A] uppercase tracking-wider mb-2">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techTags.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded bg-[#F4F2EC] text-xs font-mono text-[#4B525C] border border-[#E6E3DC]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Contributors */}
          {project.contributors && project.contributors.length > 0 && (
            <div className="pt-4 border-t border-[#E6E3DC] text-xs text-[#4B525C]">
              <span className="font-semibold text-[#15171A] block mb-1">Contributors:</span>
              <p>{project.contributors.join(', ')}</p>
            </div>
          )}

          {/* Repository & Demo links */}
          <div className="pt-6 border-t border-[#E6E3DC] flex flex-wrap items-center gap-4">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F4F2EC] hover:bg-[#E6E3DC] text-[#15171A] border border-[#E6E3DC] text-sm font-medium transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1A73E8] hover:bg-[#1557B0] text-white text-sm font-medium transition-colors shadow-xs"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </article>

      </Container>
    </div>
  );
};
