/**
 * Progress Tracking Utility
 * Utilities for tracking and syncing lesson progress
 */

interface ProgressData {
  lessonId: string;
  courseId: string;
  progress: number; // 0-100
  watchedDuration: number; // in seconds
  totalDuration: number; // in seconds
  lastWatchedAt: string;
}

/**
 * Save progress to localStorage as backup
 */
export function saveProgressToLocal(progress: ProgressData) {
  try {
    const key = `progress-${progress.courseId}-${progress.lessonId}`;
    localStorage.setItem(key, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress to localStorage:', error);
  }
}

/**
 * Get progress from localStorage
 */
export function getProgressFromLocal(courseId: string, lessonId: string): ProgressData | null {
  try {
    const key = `progress-${courseId}-${lessonId}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to get progress from localStorage:', error);
    return null;
  }
}

/**
 * Sync progress to server
 */
export async function syncProgressToServer(progress: ProgressData): Promise<boolean> {
  try {
    const response = await fetch('/api/progress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(progress),
    });

    if (!response.ok) {
      throw new Error('Failed to sync progress');
    }

    return true;
  } catch (error) {
    console.error('Failed to sync progress to server:', error);
    // Save to localStorage as backup
    saveProgressToLocal(progress);
    return false;
  }
}

/**
 * Mark lesson as completed
 */
export async function markLessonComplete(
  courseId: string,
  lessonId: string
): Promise<boolean> {
  try {
    const response = await fetch('/api/lessons/complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courseId, lessonId }),
    });

    if (!response.ok) {
      throw new Error('Failed to mark lesson as complete');
    }

    return true;
  } catch (error) {
    console.error('Failed to mark lesson as complete:', error);
    return false;
  }
}

/**
 * Track video progress
 * Progress is considered complete at 90% or end of video
 */
export function calculateProgress(
  currentTime: number,
  duration: number
): number {
  if (duration === 0) return 0;
  return Math.min(100, Math.round((currentTime / duration) * 100));
}

/**
 * Check if lesson should be marked as complete
 */
export function shouldMarkComplete(progress: number, currentTime: number, duration: number): boolean {
  // Mark as complete if:
  // 1. Progress is >= 90%, OR
  // 2. We're within 5 seconds of the end
  return progress >= 90 || (duration - currentTime) <= 5;
}

