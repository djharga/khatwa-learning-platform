/**
 * خدمة الجدولة التلقائية للدورات
 */

import type { CourseSchedule, CourseManagement } from '@/types/course-management';

const API_BASE = '/api/admin/courses/schedule';

export class CourseSchedulerService {
  /**
   * التحقق من الدورات المجدولة وفتح/إغلاقها تلقائياً
   */
  async checkScheduledCourses(): Promise<CourseSchedule[]> {
    const response = await fetch(`${API_BASE}/check`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('فشل التحقق من الدورات المجدولة');
    }

    const data = await response.json();
    return data.schedules;
  }

  /**
   * الحصول على جميع الدورات المجدولة
   */
  async getScheduledCourses(): Promise<CourseSchedule[]> {
    const response = await fetch(`${API_BASE}`);

    if (!response.ok) {
      throw new Error('فشل جلب الدورات المجدولة');
    }

    const data = await response.json();
    return data.schedules;
  }

  /**
   * جدولة فتح/إغلاق دورة
   */
  async scheduleCourse(
    courseId: string,
    action: 'open' | 'close',
    scheduledDate: string
  ): Promise<CourseSchedule> {
    const response = await fetch(`${API_BASE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        courseId,
        action,
        scheduledDate,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'فشل جدولة الدورة');
    }

    const data = await response.json();
    return data.schedule;
  }

  /**
   * إلغاء جدولة دورة
   */
  async cancelSchedule(scheduleId: string): Promise<void> {
    const response = await fetch(`${API_BASE}/${scheduleId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'فشل إلغاء الجدولة');
    }
  }

  /**
   * تحديث جدولة دورة
   */
  async updateSchedule(
    scheduleId: string,
    scheduledDate: string
  ): Promise<CourseSchedule> {
    const response = await fetch(`${API_BASE}/${scheduleId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scheduledDate }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'فشل تحديث الجدولة');
    }

    const data = await response.json();
    return data.schedule;
  }
}

export const courseSchedulerService = new CourseSchedulerService();

