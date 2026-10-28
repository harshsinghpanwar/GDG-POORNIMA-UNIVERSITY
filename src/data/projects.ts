import { Project } from '../types/community';

/**
 * Chapter Student Projects Showcase (Section 8.5)
 * 
 * Strict Compliance:
 * Section 3.5: "Projects are NOT published on the official chapter records.
 * Do not fabricate; use empty states or omit. The shipped data array is EMPTY because
 * no projects are verified. The page must handle the empty state elegantly, explaining
 * that projects will appear here and pointing to the community channels."
 * 
 * Include the project data model and a COMMENTED example in the data file (as a comment, never as live data).
 */

/*
Example Project Data Model Instance (For illustration & testing only - NEVER live data):

const EXAMPLE_PROJECT: Project = {
  id: "proj-example-01",
  slug: "campus-resource-hub",
  title: "Campus Resource Hub",
  description: "A collaborative student portal providing peer lecture notes, exam revision schedules, and coding contest trackers built by Poornima University developers.",
  status: "active",
  techTags: ["React", "TypeScript", "Tailwind CSS"],
  contributors: ["Student Contributor"],
  repoUrl: "https://github.com/example/campus-resource-hub",
  demoUrl: "https://example.com/demo",
  placeholder: false
};
*/

export const PROJECTS: Project[] = [];

/**
 * Student project guidelines for Poornima University students
 */
export const PROJECT_SUBMISSION_INFO = {
  title: "Student Projects Showcase",
  description: "Are you a student at Poornima University building open-source software, an AI prototype, or a campus utility? Projects developed by community members will appear here as they are reviewed and verified.",
  requirements: [
    "Open-source repository hosted on GitHub with an approved OSI license",
    "Comprehensive README with clear local setup instructions and architecture notes",
    "Developed by student(s) enrolled at Poornima University",
    "Solves a genuine technical, community, or campus problem"
  ],
  reviewProcess: "To submit a project for consideration, share your repository link with the chapter organizers via our official WhatsApp group or Telegram channel."
};
