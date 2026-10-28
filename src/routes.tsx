import React, { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { PageShell } from './components/layout/PageShell';

// Route-level code splitting (Section 12: React.lazy)
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Events = lazy(() => import('./pages/Events').then(m => ({ default: m.Events })));
const EventDetails = lazy(() => import('./pages/EventDetails').then(m => ({ default: m.EventDetails })));
const Projects = lazy(() => import('./pages/Projects').then(m => ({ default: m.Projects })));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails').then(m => ({ default: m.ProjectDetails })));
const Team = lazy(() => import('./pages/Team').then(m => ({ default: m.Team })));
const Resources = lazy(() => import('./pages/Resources').then(m => ({ default: m.Resources })));
const Join = lazy(() => import('./pages/Join').then(m => ({ default: m.Join })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const FAQ = lazy(() => import('./pages/FAQ').then(m => ({ default: m.FAQ })));
const Privacy = lazy(() => import('./pages/Privacy').then(m => ({ default: m.Privacy })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

const RouteLoadingFallback = () => (
  <div className="py-20 text-center text-xs font-mono text-[#4B525C]" role="status" aria-label="Loading page">
    <div className="w-6 h-6 border-2 border-[#1A73E8] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
    <span>Loading content...</span>
  </div>
);

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <PageShell />,
    children: [
      { 
        index: true, 
        element: (
          <Suspense fallback={<RouteLoadingFallback />}>
            <Home />
          </Suspense>
        ) 
      },
      { 
        path: 'about', 
        element: (
          <Suspense fallback={<RouteLoadingFallback />}>
            <About />
          </Suspense>
        ) 
      },
      { 
        path: 'events', 
        element: (
          <Suspense fallback={<RouteLoadingFallback />}>
            <Events />
          </Suspense>
        ) 
      },
      { 
        path: 'events/:slug', 
        element: (
          <Suspense fallback={<RouteLoadingFallback />}>
            <EventDetails />
          </Suspense>
        ) 
      },
      { 
        path: 'projects', 
        element: (
          <Suspense fallback={<RouteLoadingFallback />}>
            <Projects />
          </Suspense>
        ) 
      },
      { 
        path: 'projects/:slug', 
        element: (
          <Suspense fallback={<RouteLoadingFallback />}>
            <ProjectDetails />
          </Suspense>
        ) 
      },
      { 
        path: 'team', 
        element: (
          <Suspense fallback={<RouteLoadingFallback />}>
            <Team />
          </Suspense>
        ) 
      },
      { 
        path: 'resources', 
        element: (
          <Suspense fallback={<RouteLoadingFallback />}>
            <Resources />
          </Suspense>
        ) 
      },
      { 
        path: 'join', 
        element: (
          <Suspense fallback={<RouteLoadingFallback />}>
            <Join />
          </Suspense>
        ) 
      },
      { 
        path: 'contact', 
        element: (
          <Suspense fallback={<RouteLoadingFallback />}>
            <Contact />
          </Suspense>
        ) 
      },
      { 
        path: 'faq', 
        element: (
          <Suspense fallback={<RouteLoadingFallback />}>
            <FAQ />
          </Suspense>
        ) 
      },
      { 
        path: 'privacy', 
        element: (
          <Suspense fallback={<RouteLoadingFallback />}>
            <Privacy />
          </Suspense>
        ) 
      },
      { 
        path: '*', 
        element: (
          <Suspense fallback={<RouteLoadingFallback />}>
            <NotFound />
          </Suspense>
        ) 
      }
    ]
  }
];
