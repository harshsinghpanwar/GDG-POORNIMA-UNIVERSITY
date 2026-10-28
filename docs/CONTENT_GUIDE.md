# Chapter Organizer Content Guide
**GDG on Campus Poornima University - Jaipur, India**
*How to maintain events, projects, team members, FAQs, and learning resources without touching code.*

---

## 1. Introduction
Welcome, Chapter Organizers and Core Team members! This guide explains how to maintain content on the community website. 

All content is organized into simple, type-safe data files located in the `src/data/` folder. You do not need to understand complex frontend code to update the website. Simply edit the appropriate TypeScript data file and submit a pull request.

---

## 2. Managing Events (`src/data/events.ts`)

Events are stored in `src/data/events.ts`. The portal automatically calculates whether an event is **upcoming** or **past** by comparing the event's `endsAt` timestamp against the visitor's current clock.

### Adding a New Upcoming Event
To add a new event, append a new object to the `EVENTS` array:

```typescript
{
  id: "evt-05-android-workshop",
  slug: "compose-camp-android-workshop-2026",
  title: "Compose Camp: Modern Android Development",
  summary: "A hands-on workshop teaching Jetpack Compose fundamentals, declarative UI patterns, and state handling in Kotlin.",
  startsAt: "2026-11-15T10:00:00+05:30", // ISO 8601 with +05:30 IST offset
  endsAt: "2026-11-15T12:30:00+05:30",   // Concludes at 12:30 IST
  format: "in-person",                   // "in-person" | "virtual" | "hybrid"
  venue: "3rd Floor Seminar Hall, Poornima University, Sitapura Industrial Area, Vidhani, Jaipur", // NO PIN CODE!
  categories: ["Android", "Workshop"],
  registrationUrl: "https://gdg.community.dev/events/details/...",
  officialUrl: "https://gdg.community.dev/events/details/...",
  costNote: "Free registration, as listed on the official page"
}
```

### Concluding / Moving an Event to Past
Because event status is computed dynamically at runtime based on `endsAt`:
- **Automatic Transition**: As soon as the current date/time exceeds `endsAt`, the event automatically moves to the "Past Events" tab on `/events`.
- **Registration Action**: The UI automatically hides the "Register" button and displays a "Concluded" badge.
- **Adding Event Recaps & Resources**: You can optionally add `notes` or an `agenda` to share post-event slide decks or GitHub repositories:
  ```typescript
  notes: "Workshop code samples and presentation slides are available in the chapter GitHub organization."
  ```

---

## 3. Managing Student Projects (`src/data/projects.ts`)

The student projects array in `src/data/projects.ts` is currently empty (`export const PROJECTS: Project[] = [];`) because no projects have been formally reviewed and published yet.

### Publishing an Approved Student Project
When a student or team develops an open-source project that meets chapter standards:

```typescript
export const PROJECTS: Project[] = [
  {
    id: "proj-campus-bot",
    slug: "pu-campus-bot",
    title: "Poornima University Campus Bot",
    description: "An open-source Telegram bot providing lecture timetables, bus schedule alerts, and campus announcements for students.",
    status: "active",                    // "active" | "completed" | "in-progress"
    techTags: ["Python", "Telegram API", "Docker"],
    contributors: ["Aman Verma", "Priya Sharma"],
    repoUrl: "https://github.com/pu-students/campus-bot",
    demoUrl: "https://t.me/pucampusbot"
  }
];
```

---

## 4. Managing Organizers (`src/data/team.ts`)

Chapter organizers are defined in `src/data/team.ts`. Currently, the verified student organizers with authorized photos are:
1. **Harsh Panwar** (GDGoC Organizer)
2. **Chirag Sharma** (GDGoC Co-Organizer)
3. **Devika Kanoongo** (GDGoC Organizer)

### Adding or Updating an Organizer
```typescript
{
  id: "team-04",
  name: "New Organizer Name",
  role: "Technical Lead",
  roleTitle: "Technical Lead",
  institution: "Poornima University",
  profileUrl: "https://gdg.community.dev/gdg-on-campus-poornima-university-jaipur-india/",
  domain: "technical",                  // "lead" | "technical" | "community" | "faculty"
  verified: true,
  bio: "Pre-final year Computer Science student passionate about distributed systems and open-source."
}
```

### Photo Guidelines
- **Authorized Photos Only**: Place student headshots in `public/images/` (e.g. `public/images/team-harsh.jpg`).
- **Aspect Ratio**: 1:1 square crop, recommended 400x400px, under 150KB.
- **Initial Fallback**: If no `photo` property is specified, the site displays a modern avatar with the person's initials.

---

## 5. Managing Frequently Asked Questions (`src/data/faqs.ts`)

FAQs are rendered as accessible accordions on `/faq` across 7 verified categories:
1. `joining`
2. `eligibility`
3. `beginner participation`
4. `events`
5. `projects`
6. `volunteering`
7. `learning resources`

### Adding an FAQ
```typescript
{
  id: "faq-08",
  category: "volunteering",
  question: "How can I volunteer to help organize chapter events?",
  answer: "We open volunteer calls prior to flagship workshops and hackathons. Watch for announcements on our official WhatsApp community and Telegram broadcast channel."
}
```

---

## 6. Managing Learning Resources (`src/data/resources.ts`)

Educational resources are listed on `/resources`. Each resource must specify a `topic` and a `level`:
- **Allowed Topics**: `'Web'` | `'Android'` | `'AI/ML'` | `'Cloud'` | `'Open source'` | `'Git and tooling'`
- **Allowed Levels**: `'Beginner'` | `'Intermediate'`

```typescript
{
  id: "res-14",
  title: "TypeScript Handbook",
  description: "Official guide covering type annotations, interfaces, generics, and strict type safety patterns.",
  url: "https://www.typescriptlang.org/docs/handbook/intro.html",
  topic: "Web",
  level: "Intermediate"
}
```

---

## 7. Common Mistakes to Avoid (Crucial Rules)

1. **NEVER Add a Postal PIN Code**: Official campus registration records have conflicting postal PIN codes. Always write the venue simply as: `Poornima University, Sitapura Industrial Area, Vidhani, Jaipur, Rajasthan, India` without a 6-digit postal code.
2. **NEVER Invent Numbers or Metrics**: Do not fabricate attendee counts, RSVPs, or member statistics. If an event had 120 attendees, do not write "Over 500 students attended".
3. **NEVER Use Insecure URLs**: Always use `https://` URLs for links and resources. `http://` or non-standard protocol links are blocked by our URL sanitizer.
4. **Ensure Correct Time Offsets**: All start and end timestamps must include the Indian Standard Time offset `+05:30` (e.g., `2026-11-15T10:00:00+05:30`).
5. **Keep Slugs Clean**: Use lowercase letters, numbers, and hyphens for slugs (e.g., `web-dev-bootcamp-2026`). Never use spaces, uppercase characters, or special punctuation.
