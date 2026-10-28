import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, HelpCircle, X } from 'lucide-react';
import { dataSource } from '../services/dataSource';
import { FAQItem } from '../types/community';
import { FAQ_CATEGORIES } from '../data/faqs';
import { COMMUNITY_CONFIG } from '../config/community';
import { usePageSeo } from '../lib/seo';
import { Container } from '../components/ui/Container';
import { Accordion, AccordionItem } from '../components/ui/Accordion';
import { Chip } from '../components/ui/Chip';
import { BranchMotif } from '../components/brand/BranchMotif';

export const FAQ: React.FC = () => {
  usePageSeo({
    title: "FAQ",
    description: "Frequently Asked Questions about GDG on Campus Poornima University, membership, beginner participation, events, projects, and volunteering."
  });

  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFaqs() {
      setLoading(true);
      const items = await dataSource.getFaqs();
      setFaqs(items);
      setLoading(false);
    }
    loadFaqs();
  }, []);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesQuery = !searchQuery.trim() || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="py-12 md:py-20 space-y-12">
      
      {/* Header */}
      <Container size="lg">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wide bg-[#E8F0FE] text-[#1557B0] border border-[#CEE0FD]">
            Common Inquiries
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#15171A] tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-[#4B525C] leading-relaxed">
            Everything you need to know about participating in GDG on Campus Poornima University workshops and community activities.
          </p>
          <BranchMotif className="w-48 opacity-70 pt-2" />
        </div>
      </Container>

      {/* Search & Category Filter Bar (Section 8.10) */}
      <Container size="lg">
        <div className="space-y-4 bg-[#FFFFFF] p-4 sm:p-6 rounded-2xl border border-[#E6E3DC] shadow-2xs">
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4B525C]" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g., eligibility, events, resources)..."
                aria-label="Search FAQs"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#FBFAF7] border border-[#E6E3DC] text-sm text-[#15171A] placeholder-[#4B525C]/60 focus:outline-none focus:ring-2 focus:ring-[#1A73E8]"
              />
            </div>

            {(selectedCategory !== 'all' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-3 py-2 rounded-lg text-xs text-[#D93025] hover:bg-[#FCE8E6] transition-colors inline-flex items-center gap-1 cursor-pointer font-semibold"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset filters</span>
              </button>
            )}
          </div>

          {/* Categories: joining, eligibility, beginner participation, events, projects, volunteering, learning resources (Section 8.10) */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#E6E3DC]">
            <span className="text-xs text-[#4B525C] font-semibold mr-1">Category:</span>
            {FAQ_CATEGORIES.map((cat) => (
              <Chip
                key={cat.id}
                selected={selectedCategory === cat.id}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </Chip>
            ))}
          </div>

          <div aria-live="polite" className="text-xs text-[#4B525C]">
            Showing {filteredFaqs.length} {filteredFaqs.length === 1 ? 'question' : 'questions'}
          </div>

        </div>
      </Container>

      {/* Accessible Accordion (Section 8.10) */}
      <Container size="lg">
        {loading ? (
          <div className="p-12 text-center text-[#4B525C]">
            <p>Loading questions...</p>
          </div>
        ) : filteredFaqs.length > 0 ? (
          <Accordion className="space-y-3 max-w-3xl">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem
                key={faq.id}
                id={faq.id}
                title={faq.question}
                defaultOpen={index === 0}
              >
                <div className="space-y-3">
                  <p>{faq.answer}</p>
                  {faq.category === 'learning resources' && (
                    <div className="pt-2">
                      <Link
                        to="/resources"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#1557B0] hover:underline"
                      >
                        <span>Browse our curated learning resources →</span>
                      </Link>
                    </div>
                  )}
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#E6E3DC] text-center max-w-xl mx-auto space-y-3">
            <HelpCircle className="w-8 h-8 text-[#4B525C] mx-auto" />
            <h2 className="text-base font-bold text-[#15171A]">No questions matched your search</h2>
            <p className="text-xs text-[#4B525C]">
              Try searching with different terms or reset your category filters.
            </p>
          </div>
        )}
      </Container>

      {/* Direct Contact Prompt */}
      <Container size="lg">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E6E3DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-3xl shadow-xs">
          <div>
            <h2 className="text-base font-bold text-[#15171A]">Have a specific question not covered here?</h2>
            <p className="text-xs text-[#4B525C] mt-0.5">
              Ask the organizers directly in our student WhatsApp group or connect via Telegram.
            </p>
          </div>
          <a
            href={COMMUNITY_CONFIG.channels.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-[#1A73E8] hover:bg-[#1557B0] text-white text-xs font-semibold transition-colors shrink-0"
          >
            Ask in WhatsApp Group
          </a>
        </div>
      </Container>

    </div>
  );
};
