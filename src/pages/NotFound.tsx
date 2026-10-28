import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar } from 'lucide-react';
import { usePageSeo } from '../lib/seo';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { BranchMotif } from '../components/brand/BranchMotif';

export const NotFound: React.FC = () => {
  usePageSeo({
    title: "Page Not Found (404)",
    description: "The page you are looking for does not exist on the GDG on Campus Poornima University portal."
  });

  return (
    <div className="py-20 md:py-32">
      <Container size="sm" className="text-center space-y-6">
        
        {/* Branch Motif Accent */}
        <div className="flex justify-center">
          <BranchMotif className="w-48 opacity-80" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557B0]">
            Error 404 • Missing Route
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-[#15171A]">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-[#4B525C] max-w-md mx-auto leading-relaxed">
            The link you followed may be broken or the page may have been moved. Return to the homepage or explore past campus events.
          </p>
        </div>

        {/* Working Links to Home and Events (Section 8.12) */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link to="/">
            <Button variant="primary" size="md" icon={<Home className="w-4 h-4" />}>
              Return Home
            </Button>
          </Link>

          <Link to="/events">
            <Button variant="secondary" size="md" icon={<Calendar className="w-4 h-4" />}>
              Browse Events
            </Button>
          </Link>
        </div>

      </Container>
    </div>
  );
};
