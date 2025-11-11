/**
 * خدمة Zoom لإدارة الجلسات المباشرة
 */

import type {
  ZoomSession,
  CreateZoomSessionRequest,
  UpdateZoomSessionRequest,
  ZoomSessionParticipant,
} from '@/types/zoom';

const API_PREFIX = '/api';
const API_BASE = `${API_PREFIX}/zoom`;

export class ZoomService {
  /**
   * الحصول على جميع جلسات Zoom
   */
  async getSessions(filters?: {
    courseId?: string;
    status?: ZoomSession['status'];
    userId?: string;
  }): Promise<ZoomSession[]> {
    const params = new URLSearchParams();
    if (filters?.courseId) params.append('courseId', filters.courseId);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.userId) params.append('userId', filters.userId);

    const response = await fetch(`${API_BASE}/sessions?${params.toString()}`);
    if (!response.ok) {
      throw new Error('فشل جلب جلسات Zoom');
    }

    const data = await response.json();
    return data.sessions;
  }

  /**
   * الحصول على جلسة Zoom محددة
   */
  async getSession(sessionId: string): Promise<ZoomSession> {
    const response = await fetch(`${API_BASE}/sessions/${sessionId}`);
    if (!response.ok) {
      throw new Error('فشل جلب جلسة Zoom');
    }

    const data = await response.json();
    return data.session;
  }

  /**
   * إنشاء جلسة Zoom جديدة
   */
  async createSession(request: CreateZoomSessionRequest): Promise<ZoomSession> {
    const response = await fetch(`${API_BASE}/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'فشل إنشاء جلسة Zoom');
    }

    const data = await response.json();
    return data.session;
  }

  /**
   * تحديث جلسة Zoom
   */
  async updateSession(
    sessionId: string,
    request: UpdateZoomSessionRequest
  ): Promise<ZoomSession> {
    const response = await fetch(`${API_BASE}/sessions/${sessionId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'فشل تحديث جلسة Zoom');
    }

    const data = await response.json();
    return data.session;
  }

  /**
   * حذف جلسة Zoom
   */
  async deleteSession(sessionId: string): Promise<void> {
    const response = await fetch(`${API_BASE}/sessions/${sessionId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'فشل حذف جلسة Zoom');
    }
  }

  /**
   * تسجيل المستخدم في جلسة Zoom
   */
  async registerForSession(
    sessionId: string,
    userId: string
  ): Promise<ZoomSessionParticipant> {
    const response = await fetch(`${API_BASE}/sessions/${sessionId}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'فشل التسجيل في الجلسة');
    }

    const data = await response.json();
    return data.participant;
  }

  /**
   * الحصول على رابط الانضمام للجلسة
   */
  async getJoinUrl(sessionId: string, userId: string): Promise<string> {
    const response = await fetch(
      `${API_BASE}/sessions/${sessionId}/join-url?userId=${userId}`
    );
    if (!response.ok) {
      throw new Error('فشل الحصول على رابط الانضمام');
    }

    const data = await response.json();
    return data.joinUrl;
  }

  /**
   * الحصول على المشاركين في الجلسة
   */
  async getParticipants(sessionId: string): Promise<ZoomSessionParticipant[]> {
    const response = await fetch(`${API_BASE}/sessions/${sessionId}/participants`);
    if (!response.ok) {
      throw new Error('فشل جلب المشاركين');
    }

    const data = await response.json();
    return data.participants;
  }
}

export const zoomService = new ZoomService();

