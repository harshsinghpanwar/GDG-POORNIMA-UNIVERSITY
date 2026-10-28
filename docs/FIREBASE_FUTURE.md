# Firebase Future Migration Architecture
**GDG on Campus Poornima University - Jaipur, India**
*Architectural Blueprint for Transitioning to Firebase Firestore & Authentication*

---

## 1. Architectural Strategy & Design Pattern

The application is structured around the **Repository Pattern** using an asynchronous data source interface:

```typescript
// src/services/dataSource.ts
export interface IDataSource {
  getEvents(filters?: EventFilterOptions): Promise<CommunityEvent[]>;
  getEventBySlug(slug: string): Promise<CommunityEvent | null>;
  getProjects(filters?: ProjectFilterOptions): Promise<Project[]>;
  getProjectBySlug(slug: string): Promise<Project | null>;
  getTeam(): Promise<TeamMember[]>;
  getResources(filters?: ResourceFilterOptions): Promise<LearningResource[]>;
  getLearningAreas(): Promise<LearningArea[]>;
  getFaqs(category?: string): Promise<FAQItem[]>;
}
```

### Why This Design Makes Migration Effortless:
- **Zero Component Refactoring**: Pages (`Events.tsx`, `Team.tsx`, `Projects.tsx`, etc.) import only `dataSource` and call `await dataSource.getEvents()`.
- **Plug-and-Play Swapping**: When Firebase Firestore is ready, developers create `FirestoreDataSource` implementing `IDataSource`, change the export line in `src/services/dataSource.ts` from `new LocalDataSource()` to `new FirestoreDataSource()`, and the entire UI transitions to cloud data with zero visual or route modifications.

```
┌────────────────────────────────────────────────────────┐
│                   React Components                     │
│    (Home, Events, EventDetails, Projects, Team, etc.)  │
└───────────────────────────┬────────────────────────────┘
                            │
               invokes async IDataSource
                            ▼
┌────────────────────────────────────────────────────────┐
│                IDataSource Interface                   │
└─────────────┬────────────────────────────┬─────────────┘
              │                            │
              ▼                            ▼
┌───────────────────────────┐┌───────────────────────────┐
│     LocalDataSource       ││    FirestoreDataSource    │
│  (Current Static Files)   ││    (Cloud Firestore)      │
│       [ACTIVE NOW]        ││        [READY]            │
└───────────────────────────┘└───────────────────────────┘
```

---

## 2. Firestore Collections & Schema Design

### 2.1 Collection: `events`
Document ID: `slug` (e.g. `compose-camp-2026`)

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | string | Unique event ID |
| `slug` | string | URL route parameter |
| `title` | string | Event title |
| `summary` | string | 1-2 sentence description |
| `description` | string | Full description with agenda & details |
| `startsAt` | timestamp / string | ISO 8601 with `+05:30` IST offset |
| `endsAt` | timestamp / string | ISO 8601 with `+05:30` IST offset |
| `format` | string | `'in-person'` \| `'virtual'` \| `'hybrid'` |
| `venue` | string | Campus hall or virtual link (no PIN code) |
| `categories` | array of strings | `['Workshop', 'Android']` |
| `officialUrl` | string | Link to gdg.community.dev event listing |
| `registrationUrl`| string (optional) | Direct registration link |
| `costNote` | string | E.g. "Free registration, as listed on official page" |

**Composite Indexes Needed**:
- `categories` (array-contains) + `startsAt` (descending)
- `format` (ascending) + `startsAt` (descending)

---

### 2.2 Collection: `projects`
Document ID: `slug` (e.g. `campus-lost-and-found`)

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | string | Unique project ID |
| `slug` | string | URL route parameter |
| `title` | string | Project title |
| `description` | string | Detailed overview of problem and solution |
| `status` | string | `'in-progress'` \| `'active'` \| `'completed'` |
| `techTags` | array of strings | `['React', 'TypeScript', 'Tailwind']` |
| `contributors` | array of strings | Names of student contributors |
| `repoUrl` | string | GitHub repository link |
| `demoUrl` | string (optional) | Live deployed URL |
| `featured` | boolean | Display priority on home page |
| `approvalStatus`| string | `'approved'` \| `'pending'` \| `'rejected'` |

---

### 2.3 Collection: `project_submissions` (Moderation Queue)
Incoming student submissions before organizer approval:

| Field | Type | Description |
| :--- | :--- | :--- |
| `studentName` | string | Student's name |
| `studentEmail` | string | Institutional email (`@poornima.edu.in`) |
| `repoUrl` | string | GitHub URL |
| `pitch` | string | Why this project matters |
| `submittedAt` | timestamp | Server timestamp |
| `reviewed` | boolean | Review toggle for organizers |

---

### 2.4 Collection: `team`
Document ID: `team-id` (e.g. `team-01`)

| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | string | Organizer full name |
| `role` | string | Chapter role (e.g. "GDGoC Organizer") |
| `institution` | string | Always "Poornima University" |
| `domain` | string | `'lead'` \| `'technical'` \| `'community'` \| `'faculty'` |
| `displayOrder` | number | Sort priority in directory |
| `verified` | boolean | Verification flag |
| `photo` | string (optional) | Image path or Firebase Storage URL |

---

### 2.5 Collections: `faqs` and `resources`
- `faqs`: `question`, `answer`, `category`, `order`
- `resources`: `title`, `description`, `url`, `topic`, `level`, `order`

---

## 3. Firestore Security Rules Blueprint

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOrganizer() {
      return isAuthenticated() && 
        (request.auth.token.role == 'organizer' || request.auth.token.admin == true);
    }

    function isValidSubmission(data) {
      return data.keys().hasAll(['studentName', 'studentEmail', 'repoUrl', 'pitch']) &&
        data.studentEmail.matches('^[A-Za-z0-9._%+-]+@poornima\\.edu\\.in$') &&
        data.repoUrl.matches('^https://github\\.com/.+');
    }

    // 1. Events collection: Public read, organizer write
    match /events/{eventId} {
      allow read: if true;
      allow write: if isOrganizer();
    }

    // 2. Published Projects: Public read only for approved projects
    match /projects/{projectId} {
      allow read: if resource.data.approvalStatus == 'approved' || isOrganizer();
      allow write: if isOrganizer();
    }

    // 3. Project Submissions: Anyone can create a valid submission, only organizers can read/moderate
    match /project_submissions/{subId} {
      allow create: if isValidSubmission(request.resource.data);
      allow read, update, delete: if isOrganizer();
    }

    // 4. Team, FAQs, and Resources: Public read, organizer write
    match /team/{memberId} {
      allow read: if true;
      allow write: if isOrganizer();
    }

    match /faqs/{faqId} {
      allow read: if true;
      allow write: if isOrganizer();
    }

    match /resources/{resourceId} {
      allow read: if true;
      allow write: if isOrganizer();
    }
  }
}
```

---

## 4. Authentication & Role-Based Access Control (RBAC)

Organizers log in using **Firebase Authentication** (Google sign-in restricted to authorized `@poornima.edu.in` accounts).

### Custom Claims Assignment
Firebase Admin SDK script runs via Cloud Function or local administrative CLI to assign the `organizer` role claim:

```javascript
// admin-assign-role.js
const admin = require('firebase-admin');
admin.initializeApp();

async function setOrganizerRole(email) {
  const user = await admin.auth().getUserByEmail(email);
  await admin.auth().setCustomUserClaims(user.uid, { role: 'organizer' });
  console.log(`Assigned organizer role to ${email}`);
}

setOrganizerRole('harsh.panwar@poornima.edu.in');
```

---

## 5. Step-by-Step Implementation Procedure

1. **Install Firebase SDK**:
   ```bash
   npm install firebase
   ```
2. **Add Environment Credentials** (in `.env.local` and Netlify):
   ```env
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```
3. **Initialize Firebase** in `src/lib/firebase.ts`.
4. **Create `src/services/firestoreDataSource.ts`** implementing `IDataSource`.
5. **Switch the provider** in `src/services/dataSource.ts`:
   ```typescript
   import { FirestoreDataSource } from './firestoreDataSource';
   export const dataSource = new FirestoreDataSource();
   ```
6. **Deploy Security Rules** using the Firebase CLI:
   ```bash
   firebase deploy --only firestore:rules
   ```

---

## 6. Cost & Quota Analysis (Firebase Spark Free Tier)

| Metric | Firebase Free Spark Plan Quota | Estimated Chapter Monthly Usage | Headroom |
| :--- | :--- | :--- | :--- |
| **Document Reads** | 50,000 / day | ~500 to 2,500 / day | > 95% free buffer |
| **Document Writes** | 20,000 / day | ~10 to 50 / day | > 99% free buffer |
| **Document Deletes**| 20,000 / day | < 5 / day | > 99% free buffer |
| **Database Storage**| 1 GB stored data | ~5 MB total | > 99% free buffer |
| **Network Egress** | 10 GB / month | ~500 MB / month | > 95% free buffer |

**Conclusion**: The chapter can comfortably operate on the free Firebase Spark plan indefinitely with zero hosting or database expenses.
