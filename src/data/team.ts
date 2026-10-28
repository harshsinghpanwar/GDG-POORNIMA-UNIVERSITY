import { TeamMember } from '../types/community';

/**
 * Verified Chapter Organizers (Section 3.4 & Section 8.6)
 * Source: Official chapter records retrieved from gdg.community.dev.
 * 
 * Strict Rules:
 * - NO invented roles, contact info, or unofficial affiliations.
 * - Institution is Poornima University.
 * - Real authorized student photos uploaded by chapter leadership.
 */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "team-01",
    name: "Raghav Arora",
    role: "GDGoC Organizer",
    roleTitle: "GDGoC Organizer",
    institution: "Poornima University",
    profileUrl: "https://gdg.community.dev/gdg-on-campus-poornima-university-jaipur-india/",
    domain: "lead",
    verified: true,
    photo: "/assets/aistudio/IMG-20261028-WA0007_fa7b7bea.jpg"
  },
  {
    id: "team-02",
    name: "Keshav Verma",
    role: "GDGoC Organizer",
    roleTitle: "GDGoC Organizer",
    institution: "Poornima University",
    profileUrl: "https://gdg.community.dev/gdg-on-campus-poornima-university-jaipur-india/",
    domain: "technical",
    verified: true,
    photo: "/assets/aistudio/IMG-20261028-WA0006_006e8a5e.jpg"
  },
  {
    id: "team-03",
    name: "Devika Kanoongo",
    role: "GDGoC Organizer",
    roleTitle: "GDGoC Organizer",
    institution: "Poornima University",
    profileUrl: "https://gdg.community.dev/gdg-on-campus-poornima-university-jaipur-india/",
    domain: "community",
    verified: true,
    photo: "/assets/aistudio/IMG-20261028-WA0005_c8bbdf80.jpg"
  }
];

export const TEAM_ROSTER_NOTE = "Community rosters change across academic years. Organizers listed here reflect verified public chapter leadership at Poornima University.";
