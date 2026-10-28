import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItemProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  title,
  children,
  defaultOpen = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-[#E6E3DC] rounded-xl bg-[#FFFFFF] overflow-hidden transition-colors hover:border-[#D1CDC2]">
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={`accordion-content-${id}`}
          id={`accordion-btn-${id}`}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-5 text-left text-base font-semibold text-[#15171A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] cursor-pointer"
        >
          <span className="pr-4">{title}</span>
          <ChevronDown 
            className={`w-5 h-5 text-[#4B525C] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#1557B0]' : ''}`}
            aria-hidden="true" 
          />
        </button>
      </h3>
      <div
        id={`accordion-content-${id}`}
        role="region"
        aria-labelledby={`accordion-btn-${id}`}
        hidden={!isOpen}
        className={`px-5 pb-5 text-sm sm:text-base text-[#4B525C] leading-relaxed border-t border-[#E6E3DC] pt-4 bg-[#FFFFFF] ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export const Accordion: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "space-y-3"
}) => {
  return <div className={className}>{children}</div>;
};
