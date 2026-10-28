import { FAQItem } from '../types/community';

/**
 * Frequently Asked Questions (Section 8.10)
 * Categories: joining, eligibility, beginner participation, events, projects, volunteering, learning resources
 * Answers stay strictly within verified facts.
 */
export const FAQS: FAQItem[] = [
  {
    id: "faq-joining",
    category: "joining",
    question: "How do I join GDG on Campus Poornima University?",
    answer: "Joining happens through the official community page at gdg.community.dev. The platform there handles chapter membership and official event notifications. You can also join our student WhatsApp group and Telegram channel to receive informal campus announcements."
  },
  {
    id: "faq-eligibility",
    category: "eligibility",
    question: "Who is eligible to participate in chapter activities?",
    answer: "The official community description states that the community welcomes beginners and experienced developers alike. For any university-specific eligibility questions or attendance criteria, please reach out directly to the chapter organizers."
  },
  {
    id: "faq-beginner",
    category: "beginner participation",
    question: "Can complete beginners join and attend sessions?",
    answer: "Yes, beginners are warmly welcome to participate. The chapter is designed for students learning to code, engaging in technology discussions, and exploring collaborative projects together, whether you are writing your first line of code or building full-scale applications."
  },
  {
    id: "faq-events",
    category: "events",
    question: "How do event registrations and fees work?",
    answer: "Past events are listed on the Events page with summaries and workshop venues. Upcoming event announcements are posted through the official community page and discussion channels. The four past events hosted by the chapter were all labelled with free registration on the official page; future event guidelines and formats may differ."
  },
  {
    id: "faq-projects",
    category: "projects",
    question: "How do student project collaborations work?",
    answer: "Collaborative software projects and peer innovation are fundamental parts of the chapter's description. The Projects page showcases verified student projects as they are submitted, reviewed, and published."
  },
  {
    id: "faq-volunteering",
    category: "volunteering",
    question: "Is there a formal student volunteering program?",
    answer: "No formal volunteering programme is published in the official records. If you are interested in helping out with campus event organization or technical sessions, please ask the organizers directly through the official community channels."
  },
  {
    id: "faq-learning-resources",
    category: "learning resources",
    question: "Where can I find curated learning roadmaps and documentation?",
    answer: "We curate authoritative, legitimate educational guides covering Web, Android, AI/ML, Cloud, Open Source, and Git. You can explore all our recommended developer documentation on our Learning Resources page."
  }
];

export const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'joining', label: 'Joining' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'beginner participation', label: 'Beginner Participation' },
  { id: 'events', label: 'Events' },
  { id: 'projects', label: 'Projects' },
  { id: 'volunteering', label: 'Volunteering' },
  { id: 'learning resources', label: 'Learning Resources' }
];
