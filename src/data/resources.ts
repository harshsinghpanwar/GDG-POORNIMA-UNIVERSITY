import { LearningResource, LearningTrack, ResourceItem } from '../types/community';

/**
 * Curated Authoritative Educational Resources (Section 8.7)
 * 
 * Strict Rule: Seed ONLY the 13 authoritative URLs specified in Section 8.7,
 * with descriptions written in our own words, grouped by topic and skill level.
 */
export const LEARNING_RESOURCES: LearningResource[] = [
  // Web
  {
    id: "res-01",
    title: "MDN Learn Web Development",
    description: "Comprehensive foundational guides covering HTML markup, modern CSS styling, and core JavaScript fundamentals written for beginners.",
    url: "https://developer.mozilla.org/en-US/docs/Learn_web_development",
    topic: "Web",
    level: "Beginner"
  },
  {
    id: "res-02",
    title: "web.dev Learn",
    description: "Structured learning pathways covering responsive web layouts, progressive web applications, performance, and accessibility best practices.",
    url: "https://web.dev/learn",
    topic: "Web",
    level: "Intermediate"
  },
  {
    id: "res-03",
    title: "freeCodeCamp",
    description: "Interactive coding curriculum featuring hands-on challenges and full-length certifications across responsive design and full-stack development.",
    url: "https://www.freecodecamp.org/",
    topic: "Web",
    level: "Beginner"
  },

  // Android
  {
    id: "res-04",
    title: "Android Developer Courses",
    description: "Official Android development tutorials teaching modern app construction using Kotlin and Jetpack Compose.",
    url: "https://developer.android.com/courses",
    topic: "Android",
    level: "Beginner"
  },
  {
    id: "res-05",
    title: "Flutter Documentation",
    description: "Official documentation and tutorials for building multi-platform mobile applications from a single shared Dart codebase.",
    url: "https://docs.flutter.dev/",
    topic: "Android",
    level: "Beginner"
  },

  // AI/ML
  {
    id: "res-06",
    title: "Machine Learning Crash Course",
    description: "Google's fast-paced, practical introduction to machine learning concepts, neural network architectures, and TensorFlow implementations.",
    url: "https://developers.google.com/machine-learning/crash-course",
    topic: "AI/ML",
    level: "Intermediate"
  },
  {
    id: "res-07",
    title: "Gemini API Documentation",
    description: "Official API guides, SDK code examples, and prompt engineering best practices for building applications powered by multimodal AI models.",
    url: "https://ai.google.dev/gemini-api/docs",
    topic: "AI/ML",
    level: "Intermediate"
  },

  // Cloud
  {
    id: "res-08",
    title: "Google Cloud Skills Boost",
    description: "On-demand cloud training labs and interactive quests covering infrastructure setup, cloud computing, and cloud deployment pipelines.",
    url: "https://www.cloudskillsboost.google/",
    topic: "Cloud",
    level: "Beginner"
  },
  {
    id: "res-09",
    title: "Firebase Documentation",
    description: "Guides and SDK references for building scalable applications with Firestore, Firebase Authentication, and serverless cloud functions.",
    url: "https://firebase.google.com/docs",
    topic: "Cloud",
    level: "Beginner"
  },

  // Open Source
  {
    id: "res-10",
    title: "Open Source Guides",
    description: "A curated collection of guides explaining how to start, contribute to, and grow open-source software projects and collaborative communities.",
    url: "https://opensource.guide/",
    topic: "Open source",
    level: "Beginner"
  },

  // Git and Tooling
  {
    id: "res-11",
    title: "Pro Git Book",
    description: "The complete authoritative reference book by Scott Chacon and Ben Straub detailing Git internals, branch workflows, and remote management.",
    url: "https://git-scm.com/book/en/v2",
    topic: "Git and tooling",
    level: "Intermediate"
  },
  {
    id: "res-12",
    title: "GitHub Skills",
    description: "Interactive browser-based GitHub courses that teach repository management, markdown formatting, pull request reviews, and GitHub Actions.",
    url: "https://skills.github.com/",
    topic: "Git and tooling",
    level: "Beginner"
  },
  {
    id: "res-13",
    title: "About Google Developer Groups",
    description: "Official global community overview explaining the mission, values, and student programs behind Google Developer Groups worldwide.",
    url: "https://developers.google.com/community/gdg",
    topic: "Git and tooling",
    level: "Beginner"
  }
];

// Compatibility adapter for existing components
export const RESOURCES_LIST: ResourceItem[] = LEARNING_RESOURCES.map(r => ({
  id: r.id,
  title: r.title,
  category: r.topic.toLowerCase().replace(/[\s/]/g, '-'),
  description: r.description,
  url: r.url,
  isExternal: true,
  tags: [r.topic, r.level],
  level: r.level,
  topic: r.topic
}));

// Optional structured tracks for campus reference
export const LEARNING_TRACKS: LearningTrack[] = [
  {
    id: "track-web-foundations",
    title: "Web Engineering Foundations",
    domain: "Web Development",
    level: "Beginner",
    summary: "From fundamental HTML/CSS/JS to modern component-driven React applications and responsive layout principles.",
    description: "A structured curriculum designed to build confidence in frontend engineering. Covers semantic markup, modern CSS layouts with Tailwind, TypeScript fundamentals, and state management in React.",
    technologies: ["HTML5", "CSS3 / Tailwind", "TypeScript", "React", "Git"],
    estimatedWeeks: 6,
    milestones: [
      { step: 1, title: "Semantic Web & Modern CSS", description: "Semantic tags, accessibility fundamentals, CSS Grid, and responsive flexbox layouts.", duration: "Week 1-2" },
      { step: 2, title: "TypeScript & Modern JavaScript", description: "ES6+ syntax, asynchronous programming, promises, and TypeScript typing.", duration: "Week 3-4" },
      { step: 3, title: "Component Architecture", description: "Building reusable components in React, hooks, routing, and deployment to free static hosting.", duration: "Week 5-6" }
    ]
  },
  {
    id: "track-ai-prototyping",
    title: "Applied AI & Prototyping",
    domain: "Artificial Intelligence",
    level: "Intermediate",
    summary: "Hands-on engineering using state-of-the-art model APIs, intelligent agents, and full-stack integration.",
    description: "Learn how to integrate AI APIs into functional web applications. Covers API authentication, streaming responses, structured JSON outputs, and evaluation.",
    technologies: ["Python", "REST APIs", "TypeScript", "JSON Schema", "Prompt Engineering"],
    estimatedWeeks: 4,
    milestones: [
      { step: 1, title: "API Authentication & Basic Calls", description: "Secure credential handling, HTTP requests, and understanding API response objects.", duration: "Week 1" },
      { step: 2, title: "Streaming & Interactive UIs", description: "Server-sent events, response chunking, and handling async UI states gracefully.", duration: "Week 2" },
      { step: 3, title: "Structured Data Extraction", description: "Enforcing JSON schemas, function calling, and error resilience in production code.", duration: "Week 3-4" }
    ]
  },
  {
    id: "track-git-opensource",
    title: "Git, GitHub & Open Source",
    domain: "Open Source",
    level: "Beginner",
    summary: "Essential developer workflows: version control, branching strategies, code reviews, and community etiquette.",
    description: "Equips students with collaborative engineering practices used in professional product teams and open-source ecosystems.",
    technologies: ["Git CLI", "GitHub", "Markdown", "Branching", "Pull Requests"],
    estimatedWeeks: 3,
    milestones: [
      { step: 1, title: "Git Basics & Local Repositories", description: "Commits, history inspection, diffs, and local branch management.", duration: "Week 1" },
      { step: 2, title: "Remote Collaboration & PRs", description: "Forks, upstream remotes, pull request descriptions, and responding to code reviews.", duration: "Week 2" },
      { step: 3, title: "Open Source Contribution", description: "Finding beginner-friendly issues (good first issue), license understanding, and issue templates.", duration: "Week 3" }
    ]
  }
];
