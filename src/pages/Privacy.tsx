import React from 'react';
import { Eye, Send, ExternalLink, ShieldCheck } from 'lucide-react';
import { COMMUNITY_CONFIG } from '../config/community';
import { usePageSeo } from '../lib/seo';
import { Container } from '../components/ui/Container';
import { BranchMotif } from '../components/brand/BranchMotif';

export const Privacy: React.FC = () => {
  usePageSeo({
    title: "Privacy",
    description: "Privacy notice for GDG on Campus Poornima University portal: no analytics, contact form data handling, external links, and organizer review status."
  });

  return (
    <div className="py-12 md:py-20 space-y-12">
      
      {/* Header */}
      <Container size="md">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wide bg-[#E8F0FE] text-[#1557B0] border border-[#CEE0FD]">
            Privacy & Trust
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-[#15171A] tracking-tight">
            Privacy Notice
          </h1>
          <p className="text-base text-[#4B525C] leading-relaxed">
            A plain-language summary of how data is handled on the GDG on Campus Poornima University community portal.
          </p>
          <BranchMotif className="w-48 opacity-70 pt-2" />
        </div>
      </Container>

      {/* Policy Sections (Section 8.11) */}
      <Container size="md">
        <div className="bg-[#FFFFFF] border border-[#E6E3DC] rounded-3xl p-6 sm:p-10 space-y-8 text-sm text-[#4B525C] leading-relaxed shadow-[0_4px_16px_-4px_rgba(21,23,26,0.06)]">
          
          {/* 1. No Tracking or Analytics by Default */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold font-display text-[#15171A] flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#1557B0]" />
              <span>No Analytics or Tracking by Default</span>
            </h2>
            <p>
              This website does not load third-party analytics trackers, advertising pixels, or telemetry scripts. No tracking cookies are stored on your device when you browse pages on this site.
            </p>
          </div>

          {/* 2. What the Contact Form Collects & Where It Goes */}
          <div className="space-y-3 pt-6 border-t border-[#E6E3DC]">
            <h2 className="text-xl font-bold font-display text-[#15171A] flex items-center gap-2">
              <Send className="w-5 h-5 text-[#188038]" />
              <span>Contact Form Submissions</span>
            </h2>
            <p>
              If you submit an inquiry through our contact form, we collect only:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm">
              <li><strong>Your Name:</strong> To address you properly in correspondence.</li>
              <li><strong>Email Address:</strong> To reply directly to your inquiry.</li>
              <li><strong>Topic / Category:</strong> To route your question to the relevant organizer.</li>
              <li><strong>Message Text:</strong> The details of your inquiry.</li>
            </ul>
            <p className="pt-1">
              <strong>Where the data goes:</strong> When configured with an external HTTPS endpoint (via the <code className="px-1.5 py-0.5 rounded bg-[#F4F2EC] text-xs font-mono text-[#15171A]">VITE_CONTACT_ENDPOINT</code> environment variable, such as Formspree or Netlify Forms), submissions are transmitted securely over HTTPS directly to that service for delivery to the chapter organizers. If the variable is not set, the form remains disabled and no data is transmitted.
            </p>
          </div>

          {/* 3. External Links Leaving the Site */}
          <div className="space-y-3 pt-6 border-t border-[#E6E3DC]">
            <h2 className="text-xl font-bold font-display text-[#15171A] flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-[#F9AB00]" />
              <span>External Links Leaving the Site</span>
            </h2>
            <p>
              This website provides links to external services including the official Google Community platform (<a href="https://gdg.community.dev" target="_blank" rel="noopener noreferrer" className="text-[#1557B0] underline">gdg.community.dev</a>), WhatsApp, Telegram, LinkedIn, Instagram, and curated technical documentation (such as MDN and GitHub).
            </p>
            <p>
              When you click external links, you leave this community portal. The respective privacy policies and terms of service of those external platforms govern any interactions or account information you share there.
            </p>
          </div>

          {/* 4. Independent Chapter Status */}
          <div className="space-y-3 pt-6 border-t border-[#E6E3DC]">
            <h2 className="text-xl font-bold font-display text-[#15171A] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#1557B0]" />
              <span>Independent Chapter Status</span>
            </h2>
            <p>
              {COMMUNITY_CONFIG.disclaimers.independence}
            </p>
            <p>
              {COMMUNITY_CONFIG.disclaimers.nonImpersonation}
            </p>
          </div>

          {/* 5. Organizer Review Notice (Section 8.11) */}
          <div className="p-4 rounded-xl bg-[#FEF7E0] border border-[#FEEFC3] text-xs text-[#5F4100] space-y-1">
            <span className="font-bold block">Review Notice:</span>
            <p>
              This privacy notice is drafted in plain language to accurately describe the codebase behavior. It should be reviewed and approved by the GDG on Campus Poornima University chapter organizers before public deployment.
            </p>
          </div>

          <div className="pt-4 border-t border-[#E6E3DC] text-xs text-[#4B525C]">
            <p>Last updated: October 2026 • GDG on Campus Poornima University, Jaipur, India</p>
          </div>

        </div>
      </Container>

    </div>
  );
};
