import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FolderGit2, Search, ExternalLink, X } from 'lucide-react';
import { dataSource } from '../services/dataSource';
import { Project } from '../types/community';
import { PROJECT_SUBMISSION_INFO } from '../data/projects';
import { COMMUNITY_CONFIG } from '../config/community';
import { usePageSeo } from '../lib/seo';
import { Container } from '../components/ui/Container';
import { EmptyState } from '../components/ui/EmptyState';
import { Chip } from '../components/ui/Chip';
import { WhatsAppIcon, TelegramIcon } from '../components/icons/BrandIcons';

export const Projects: React.FC = () => {
  usePageSeo({
    title: "Projects",
    description: "Showcase of software engineering and collaborative technology projects developed by students at Poornima University, Jaipur."
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTag = searchParams.get('tag') || 'all';
  const searchQuery = searchParams.get('q') || '';

  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const projs = await dataSource.getProjects();
      setAllProjects(projs);

      const tagSet = new Set<string>();
      projs.forEach(p => p.techTags.forEach(t => tagSet.add(t)));
      setAllTags(Array.from(tagSet));
      setLoading(false);
    }
    loadData();
  }, []);

  const updateFilter = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, val]) => {
      if (!val || val === 'all' || val === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, val);
      }
    });
    setSearchParams(newParams, { replace: true });
  };

  const handleClear = () => {
    setSearchParams(new URLSearchParams());
  };

  const filteredProjects = allProjects.filter(p => {
    if (selectedTag !== 'all' && !p.techTags.some(t => t.toLowerCase() === selectedTag.toLowerCase())) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchTag = p.techTags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchTag) return false;
    }
    return true;
  });

  return (
    <div className="py-12 md:py-20 space-y-12">
      
      {/* Header */}
      <Container size="lg">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wide bg-[#E8F0FE] text-[#1557B0] border border-[#CEE0FD]">
            Community Showcase
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#15171A] tracking-tight">
            Student Projects Showcase
          </h1>
          <p className="text-base sm:text-lg text-[#4B525C] leading-relaxed">
            Collaborative open-source software, prototypes, and developer tools built by Poornima University students.
          </p>
        </div>
      </Container>

      {/* Filter and Search Bar (Active when projects exist or for search testing) */}
      {allProjects.length > 0 && (
        <Container size="lg">
          <div className="bg-[#FFFFFF] p-4 sm:p-6 rounded-2xl border border-[#E6E3DC] shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4B525C]" aria-hidden="true" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => updateFilter({ q: e.target.value })}
                  placeholder="Search projects by title, description, or technology..."
                  aria-label="Search projects"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#FBFAF7] border border-[#E6E3DC] text-sm text-[#15171A] placeholder-[#4B525C]/60 focus:outline-none focus:ring-2 focus:ring-[#1A73E8]"
                />
              </div>

              {(selectedTag !== 'all' || searchQuery) && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-3 py-2 rounded-lg text-xs text-[#D93025] hover:bg-[#FCE8E6] transition-colors inline-flex items-center gap-1 cursor-pointer font-semibold self-start sm:self-auto"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Clear filters</span>
                </button>
              )}
            </div>

            {/* Tech Tag Filter Chips */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#E6E3DC]">
                <span className="text-xs text-[#4B525C] font-semibold mr-1">Technology:</span>
                <Chip
                  selected={selectedTag === 'all'}
                  onClick={() => updateFilter({ tag: 'all' })}
                >
                  All Tags
                </Chip>
                {allTags.map((tag) => (
                  <Chip
                    key={tag}
                    selected={selectedTag.toLowerCase() === tag.toLowerCase()}
                    onClick={() => updateFilter({ tag })}
                  >
                    {tag}
                  </Chip>
                ))}
              </div>
            )}

            <div aria-live="polite" className="text-xs text-[#4B525C]">
              Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
            </div>
          </div>
        </Container>
      )}

      {/* Main Content Area */}
      <Container size="lg">
        {loading ? (
          <div className="p-12 text-center text-[#4B525C]">
            <p>Loading projects...</p>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <div 
                key={proj.id} 
                className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6E3DC] flex flex-col justify-between hover:shadow-[0_4px_16px_-4px_rgba(21,23,26,0.06)] transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono text-[#1557B0] font-semibold">
                      {proj.status || 'Active'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-[#15171A] group-hover:text-[#1557B0] transition-colors">
                    <Link to={`/projects/${proj.slug}`}>
                      {proj.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-[#4B525C] leading-relaxed line-clamp-3">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.techTags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-[#F4F2EC] text-[11px] font-mono text-[#4B525C]">
                        {t}
                      </span>
                    ))}
                  </div>

                  {proj.contributors.length > 0 && (
                    <div className="text-xs text-[#4B525C] pt-2">
                      <span className="font-semibold text-[#15171A]">Contributors: </span>
                      <span>{proj.contributors.join(', ')}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-[#E6E3DC] flex items-center justify-between gap-2 text-xs">
                  <Link
                    to={`/projects/${proj.slug}`}
                    className="font-semibold text-[#1557B0] hover:underline"
                  >
                    View Details →
                  </Link>
                  <div className="flex items-center gap-3">
                    {proj.repoUrl && (
                      <a href={proj.repoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#1557B0]">
                        GitHub
                      </a>
                    )}
                    {proj.demoUrl && (
                      <a href={proj.demoUrl} target="_blank" rel="noopener noreferrer" className="text-[#1A73E8] hover:underline font-semibold">
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Shipped Data Array is EMPTY: Elegant Empty State (Section 8.5) */
          <div className="space-y-12">
            
            <EmptyState
              icon={<FolderGit2 className="w-8 h-8 text-[#1557B0]" />}
              title="No student projects are published yet"
              description="Official chapter records currently list no public student projects. Projects developed by Poornima University students will appear here as they are reviewed and verified."
            />

            {/* Submission Guidelines Card */}
            <div className="bg-[#FFFFFF] border border-[#E6E3DC] rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xs">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557B0]">
                  Project Guidelines
                </span>
                <h2 className="text-2xl font-bold font-display text-[#15171A]">
                  {PROJECT_SUBMISSION_INFO.title}
                </h2>
                <p className="text-sm text-[#4B525C] leading-relaxed">
                  {PROJECT_SUBMISSION_INFO.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {PROJECT_SUBMISSION_INFO.requirements.map((req, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#FBFAF7] border border-[#E6E3DC] text-xs sm:text-sm text-[#15171A] font-medium flex items-start gap-2.5">
                    <span className="text-[#188038] font-bold">✓</span>
                    <span>{req}</span>
                  </div>
                ))}
              </div>

              {/* Pointing to Community Channels (Section 8.5) */}
              <div className="p-5 rounded-2xl bg-[#F4F2EC] border border-[#E6E3DC] space-y-3">
                <h3 className="text-sm font-bold text-[#15171A]">
                  How to Submit Your Project
                </h3>
                <p className="text-xs sm:text-sm text-[#4B525C] leading-relaxed">
                  {PROJECT_SUBMISSION_INFO.reviewProcess}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={COMMUNITY_CONFIG.channels.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FFFFFF] hover:bg-[#FBFAF7] text-xs font-semibold text-[#188038] border border-[#E6E3DC] transition-colors"
                  >
                    <WhatsAppIcon size={16} />
                    <span>Share on WhatsApp Group</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={COMMUNITY_CONFIG.channels.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FFFFFF] hover:bg-[#FBFAF7] text-xs font-semibold text-[#1A73E8] border border-[#E6E3DC] transition-colors"
                  >
                    <TelegramIcon size={16} />
                    <span>Share on Telegram Channel</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        )}
      </Container>

    </div>
  );
};
