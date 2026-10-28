import { LearningArea } from '../types/community';

/**
 * Verified Learning Areas (Section 8.1 C)
 * 
 * Strict Compliance:
 * Label the section as "learning areas". Do not claim each has an active programme.
 * Each card links to the matching category on /resources.
 */
export const LEARNING_AREAS: LearningArea[] = [
  {
    id: "area-web",
    title: "Web development",
    description: "Explore fundamental frontend and modern full-stack web technologies, responsive layout design, and accessible component architectures.",
    icon: "code",
    resourceTopic: "Web",
    technologies: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React"]
  },
  {
    id: "area-android",
    title: "Android development",
    description: "Learn modern mobile application development using Kotlin, Jetpack Compose, and cross-platform mobile app foundations.",
    icon: "smartphone",
    resourceTopic: "Android",
    technologies: ["Kotlin", "Android Studio", "Jetpack Compose", "Flutter"]
  },
  {
    id: "area-ai",
    title: "AI and machine learning",
    description: "Discover core concepts in artificial intelligence, practical machine learning models, and building with generative model APIs.",
    icon: "cpu",
    resourceTopic: "AI/ML",
    technologies: ["Python", "Machine Learning", "Gemini API", "Prompt Design"]
  },
  {
    id: "area-cloud",
    title: "Cloud technologies",
    description: "Understand cloud computing fundamentals, managed database services, and modern deployment architectures for student projects.",
    icon: "cloud",
    resourceTopic: "Cloud",
    technologies: ["Google Cloud", "Firebase", "Firestore", "Hosting"]
  },
  {
    id: "area-opensource",
    title: "Open-source development",
    description: "Master modern version control practices, open-source etiquette, pull request workflows, and collaborative codebase maintenance.",
    icon: "git-branch",
    resourceTopic: "Open source",
    technologies: ["Git", "GitHub", "Branching", "Code Reviews"]
  },
  {
    id: "area-hackathons",
    title: "Hackathons and collaborative projects",
    description: "Form cross-functional teams, brainstorm software solutions to real problems, and prepare for student challenges and hackathons.",
    icon: "users",
    resourceTopic: "Git and tooling",
    technologies: ["Teamwork", "Ideation", "Rapid Prototyping", "Pitching"]
  }
];
