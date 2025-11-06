/**
 * Analytics Events Tracking
 * Utility for tracking user interactions and learning analytics
 */

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp?: string;
}

/**
 * Track analytics event
 */
export function track(event: string, properties?: Record<string, any>) {
  const analyticsEvent: AnalyticsEvent = {
    event,
    properties,
    timestamp: new Date().toISOString(),
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', analyticsEvent);
  }

  // Send to analytics service (e.g., Google Analytics, Mixpanel, etc.)
  // This is a placeholder - replace with your analytics service
  if (typeof window !== 'undefined') {
    // Example: Google Analytics 4
    // gtag('event', event, properties);

    // Example: Custom analytics endpoint
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(analyticsEvent),
    // }).catch(console.error);
  }
}

/**
 * Course Details Page Events
 */
export const courseAnalytics = {
  ctaClick: (location: string, courseId: string) => {
    track('cta_click', { location, courseId });
  },
  videoPreview: (courseId: string) => {
    track('video_preview', { courseId });
  },
  freeLessonTry: (courseId: string, lessonId: string) => {
    track('free_lesson_try', { courseId, lessonId });
  },
  purchaseStart: (courseId: string, price: number) => {
    track('purchase_start', { courseId, price });
  },
  purchaseComplete: (courseId: string, price: number) => {
    track('purchase_complete', { courseId, price });
  },
  enrollmentStart: (courseId: string) => {
    track('enrollment_start', { courseId });
  },
  enrollmentComplete: (courseId: string) => {
    track('enrollment_complete', { courseId });
  },
};

/**
 * Learning Player Events
 */
export const learningAnalytics = {
  videoPlay: (lessonId: string, courseId: string) => {
    track('video_play', { lessonId, courseId });
  },
  videoPause: (lessonId: string, courseId: string) => {
    track('video_pause', { lessonId, courseId });
  },
  videoProgress: (lessonId: string, progress: number, courseId: string) => {
    // Throttle progress events to every 10%
    if (progress % 10 === 0) {
      track('video_progress', { lessonId, progress, courseId });
    }
  },
  videoComplete: (lessonId: string, courseId: string) => {
    track('video_complete', { lessonId, courseId });
  },
  lessonComplete: (lessonId: string, courseId: string) => {
    track('lesson_complete', { lessonId, courseId });
  },
  lessonChange: (fromLessonId: string, toLessonId: string, courseId: string) => {
    track('lesson_change', { fromLessonId, toLessonId, courseId });
  },
  noteAdded: (lessonId: string, courseId: string) => {
    track('note_added', { lessonId, courseId });
  },
  transcriptSearched: (lessonId: string, query: string, courseId: string) => {
    track('transcript_searched', { lessonId, query, courseId });
  },
  resourceDownloaded: (lessonId: string, resourceId: string, courseId: string) => {
    track('resource_downloaded', { lessonId, resourceId, courseId });
  },
  discussionPost: (lessonId: string, courseId: string) => {
    track('discussion_post', { lessonId, courseId });
  },
};

