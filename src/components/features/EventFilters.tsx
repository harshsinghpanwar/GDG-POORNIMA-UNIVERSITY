import React from 'react';
import { Search } from 'lucide-react';
import { Chip } from '../ui/Chip';

export interface EventFiltersProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedFormat: string;
  onSelectFormat: (format: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const EventFilters: React.FC<EventFiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedFormat,
  onSelectFormat,
  searchQuery,
  onSearchChange
}) => {
  return (
    <div className="space-y-4 mb-8 bg-[#FFFFFF] p-4 sm:p-6 rounded-2xl border border-[#E6E3DC] shadow-[0_1px_3px_0_rgba(21,23,26,0.04)]">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4B525C]" aria-hidden="true" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search past events by topic, technology, or venue..."
            aria-label="Filter events by keyword"
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#FBFAF7] border border-[#E6E3DC] text-sm text-[#15171A] placeholder-[#4B525C]/60 focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8]"
          />
        </div>

        {/* Format Selector */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto" role="group" aria-label="Filter by format">
          <span className="text-xs text-[#4B525C] font-medium mr-1 hidden md:inline">Format:</span>
          {['all', 'in-person', 'virtual (online)'].map((fmt) => (
            <button
              key={fmt}
              type="button"
              onClick={() => onSelectFormat(fmt)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedFormat === fmt
                  ? 'bg-[#1A73E8] text-white font-semibold'
                  : 'bg-[#FBFAF7] text-[#4B525C] hover:text-[#15171A] border border-[#E6E3DC] hover:border-[#D1CDC2]'
              }`}
            >
              {fmt === 'all' ? 'All Formats' : fmt === 'in-person' ? 'In-Person' : 'Virtual'}
            </button>
          ))}
        </div>

      </div>

      {/* Category Chips */}
      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#E6E3DC]" role="radiogroup" aria-label="Filter by category">
        <span className="text-xs text-[#4B525C] font-medium mr-1">Categories:</span>
        <Chip
          selected={selectedCategory === 'all'}
          onClick={() => onSelectCategory('all')}
        >
          All Categories
        </Chip>
        {categories.map((cat) => (
          <Chip
            key={cat}
            selected={selectedCategory === cat}
            onClick={() => onSelectCategory(cat)}
          >
            {cat}
          </Chip>
        ))}
      </div>
    </div>
  );
};
