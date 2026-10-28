import { CommunityEvent } from '../types/community';

/**
 * Verified Chapter Events (Section 3.3 & Section 9)
 * Source: Official chapter records retrieved 27 Oct 2026.
 * All 4 events are past as of retrieval. At retrieval time the official page listed no upcoming events.
 * 
 * Strict Rules:
 * - NO attendance or RSVP counts.
 * - NO PIN code in venue text.
 * - Real official event URLs only.
 * - startsAt & endsAt timestamps with +05:30 (IST).
 * - Status is computed at runtime against endsAt; no manual flags.
 */
export const EVENTS: CommunityEvent[] = [
  {
    id: "evt-01",
    slug: "google-solution-challenge-kickoff-workshop-2026",
    title: "Google Solution Challenge Kick-off and Workshop",
    summary: "Comprehensive introduction to the global Google Solution Challenge, team brainstorming, problem statement deconstruction, and hands-on preparation for university participants.",
    description: "Introduction to the Google Solution Challenge, understanding requirements, brainstorming solutions, and forming cross-functional teams. Attendees were requested to bring personal laptops for hands-on ideation.",
    startsAt: "2026-03-18T10:00:00+05:30",
    endsAt: "2026-03-18T11:00:00+05:30",
    format: "in-person",
    venue: "3rd Floor Seminar Hall, Poornima University, Sitapura Industrial Area, Vidhani, Jaipur",
    categories: ["Hackathon", "Workshop"],
    officialUrl: "https://gdg.community.dev/events/details/google-gdg-on-campus-poornima-university-jaipur-india-presents-google-solution-challenge-kick-off-and-workshop/",
    costNote: "Free registration, as listed on the official page",
    dateISO: "2026-03-18T10:00:00+05:30",
    displayDate: "March 18, 2026",
    timeIST: "10:00 to 11:00 IST",
    notes: "Attendees brought personal laptops for project planning and solution scoping."
  },
  {
    id: "evt-02",
    slug: "build-with-ai-lets-hack-it-2026",
    title: "Build with AI Workshop: Let's Hack It!",
    summary: "Hands-on engineering workshop directly connected to the 'Let's Hack It' hackathon, covering rapid prototyping with modern tools, version control, and web deployment.",
    description: "Hands-on workshop tied to the Let's Hack It hackathon; building a prototype with Google technologies, pushing code to GitHub, and deploying a functional website.",
    startsAt: "2026-01-22T12:00:00+05:30",
    endsAt: "2026-01-22T13:15:00+05:30",
    format: "in-person",
    venue: "5th Floor Seminar Hall, Poornima University, Sitapura Industrial Area, Vidhani, Jaipur",
    categories: ["Workshop", "AI", "Hackathon"],
    officialUrl: "https://gdg.community.dev/events/details/google-gdg-on-campus-poornima-university-jaipur-india-presents-build-with-ai-workshop-lets-hack-it/",
    costNote: "Free registration, as listed on the official page",
    dateISO: "2026-01-22T12:00:00+05:30",
    displayDate: "January 22, 2026",
    timeIST: "12:00 to 13:15 IST",
    notes: "Focused on rapid prototyping and version control fundamentals with Git."
  },
  {
    id: "evt-03",
    slug: "gdg-india-hackathon-briefing-2025",
    title: "GDG India Hackathon Briefing Session",
    summary: "National online briefing session outlining problem domains, submission specifications, evaluation metrics, and team registration timelines for the GDG India student hackathon.",
    description: "Online briefing to kick off the GDG India student hackathon; covered theme, problem statements, registration and submission process, team-formation guidelines and timeline.",
    startsAt: "2025-12-24T18:00:00+05:30",
    endsAt: "2025-12-24T19:30:00+05:30",
    format: "virtual (online)",
    venue: "Online Broadcast",
    categories: ["Hackathon", "AI", "Tech Talk"],
    officialUrl: "https://gdg.community.dev/events/details/google-gdg-on-campus-poornima-university-jaipur-india-presents-gdg-india-hackathon-briefing-session/",
    costNote: "Free registration, as listed on the official page",
    dateISO: "2025-12-24T18:00:00+05:30",
    displayDate: "December 24, 2025",
    timeIST: "18:00 to 19:30 IST",
    notes: "Detailed nationwide hackathon guidelines and student team collaboration parameters."
  },
  {
    id: "evt-04",
    slug: "orientation-2025-26",
    title: "Step into a World of Innovation: Orientation 2025-26",
    summary: "Annual welcome orientation welcoming new students, explaining community pathways, technical tracks, collaborative opportunities, and roadmaps for hands-on learning.",
    description: "GDG on Campus orientation introducing the community and what members can do: workshops, hackathons, events, skill building and networking; for beginners and experienced developers.",
    startsAt: "2025-10-06T09:00:00+05:30",
    endsAt: "2025-10-06T11:00:00+05:30",
    format: "in-person",
    venue: "3rd Floor Seminar Hall, Poornima University, Sitapura Industrial Area, Vidhani, Jaipur",
    categories: ["Community", "Tech Talk"],
    officialUrl: "https://gdg.community.dev/events/details/google-gdg-on-campus-poornima-university-jaipur-india-presents-step-into-a-world-of-innovation-orientation-2025-26/",
    costNote: "Free registration, as listed on the official page",
    dateISO: "2025-10-06T09:00:00+05:30",
    displayDate: "October 06, 2025",
    timeIST: "09:00 to 11:00 IST",
    notes: "Introduced learning tracks, peer study circles, and community participation avenues."
  }
];
