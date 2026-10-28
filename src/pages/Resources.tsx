import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { dataSource } from '../services/dataSource';
import { LearningResource } from '../types/community';
import { usePageSeo } from '../lib/seo';
import { Container } from '../components/ui/Container';
import { ResourceCard } from '../components/features/ResourceCard';
import { Chip } from '../components/ui/Chip';

const TOPICS = ['all', 'Web', 'Android', 'AI/ML', 'Cloud', 'Open source', 'Git and tooling'];
const LEVELS = ['all', 'Beginner', 'Intermediate'];

export const Resources: React.FC = () => {
  usePageSeo({
    title: "Learning Resources",
    description: "Curated legitimate developer education links for Poornima University students across Web, Android, AI/ML, Cloud, and Git."
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTopic = searchParams.get('topic') || 'all';
  const selectedLevel = searchParams.get('level') || 'all';
  const searchQuery = searchParams.get('q') || '';

  const [resources, setResources] = useState<LearningResource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await dataSource.getResources();
      setResources(res);
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

  const filteredResources = resources.filter((r) => {
    if (selectedTopic !== 'all' && r.topic.toLowerCase() !== selectedTopic.toLowerCase()) {
      return false;
    }
    if (selectedLevel !== 'all' && r.level.toLowerCase() !== selectedLevel.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = r.title.toLowerCase().includes(q);
      const matchDesc = r.description.toLowerCase().includes(q);
      const matchTopic = r.topic.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchTopic) return false;
    }
    return true;
  });

  return (
    <div className="py-12 md:py-20 space-y-12">
      
      {/* Header */}
      <Container size="lg">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wide bg-[#E8F0FE] text-[#1557B0] border border-[#CEE0FD]">
            Developer Education
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#15171A] tracking-tight">
            Curated Learning Resources
          </h1>
          <p className="text-base sm:text-lg text-[#4B525C] leading-relaxed">
            Legitimate educational documentation, official courses, and reference guides grouped by topic and skill level.
          </p>
        </div>
      </Container>

      {/* Filter and Search Bar (Section 8.7) */}
      <Container size="lg">
        <div className="bg-[#FFFFFF] p-4 sm:p-6 rounded-2xl border border-[#E6E3DC] shadow-2xs space-y-4">
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4B525C]" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => updateFilter({ q: e.target.value })}
                placeholder="Search resources by title, topic, or description..."
                aria-label="Search resources"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#FBFAF7] border border-[#E6E3DC] text-sm text-[#15171A] placeholder-[#4B525C]/60 focus:outline-none focus:ring-2 focus:ring-[#1A73E8]"
              />
            </div>

            {/* Level Filter Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-medium text-[#4B525C]">Skill Level:</span>
              <select
                value={selectedLevel}
                onChange={(e) => updateFilter({ level: e.target.value })}
                aria-label="Filter by skill level"
                className="px-3 py-2 rounded-lg bg-[#FBFAF7] border border-[#E6E3DC] text-xs font-medium text-[#15171A] focus:outline-none focus:ring-2 focus:ring-[#1A73E8] cursor-pointer"
              >
                {LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl === 'all' ? 'All Levels' : lvl}
                  </option>
                ))}
              </select>

              {(selectedTopic !== 'all' || selectedLevel !== 'all' || searchQuery) && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-3 py-2 rounded-lg text-xs text-[#D93025] hover:bg-[#FCE8E6] transition-colors inline-flex items-center gap-1 cursor-pointer font-semibold"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Clear filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Topic Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#E6E3DC]">
            <span className="text-xs text-[#4B525C] font-semibold mr-1">Topic:</span>
            {TOPICS.map((tpc) => (
              <Chip
                key={tpc}
                selected={selectedTopic.toLowerCase() === tpc.toLowerCase()}
                onClick={() => updateFilter({ topic: tpc })}
              >
                {tpc === 'all' ? 'All Topics' : tpc}
              </Chip>
            ))}
          </div>

          {/* Result Count */}
          <div aria-live="polite" className="text-xs text-[#4B525C]">
            Showing {filteredResources.length} of {resources.length} authoritative guides
          </div>

        </div>
      </Container>

      {/* Resources Grid */}
      <Container size="lg">
        {loading ? (
          <div className="p-12 text-center text-[#4B525C]">
            <p>Loading curated resources...</p>
          </div>
        ) : filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((res) => (
              <ResourceCard key={res.id} resource={res} />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#E6E3DC] text-center space-y-3">
            <h2 className="text-base font-bold text-[#15171A]">No resources found</h2>
            <p className="text-xs text-[#4B525C]">
              Try selecting a different topic or resetting your search term.
            </p>
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-[#1A73E8] text-white text-xs font-semibold rounded-lg hover:bg-[#1557B0]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </Container>

    </div>
  );
};
