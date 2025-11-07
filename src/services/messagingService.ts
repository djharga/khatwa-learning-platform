/**
 * خدمة المراسلة (واتساب/تليجرام) لإرسال الروابط
 */

import type {
  MessageRequest,
  SendZoomLinkRequest,
  SendInvitationRequest,
  MessageResponse,
  MessagingPlatform,
} from '@/types/messaging';

const API_BASE = '/api/messaging';

export class MessagingService {
  /**
   * إرسال رابط Zoom عبر واتساب/تليجرام
   */
  async sendZoomLink(request: SendZoomLinkRequest): Promise<MessageResponse[]> {
    const response = await fetch(`${API_BASE}/zoom-link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'فشل إرسال رابط Zoom');
    }

    const data = await response.json();
    return data.responses;
  }

  /**
   * إرسال رابط دعوة عبر واتساب/تليجرام
   */
  async sendInvitation(request: SendInvitationRequest): Promise<MessageResponse[]> {
    const response = await fetch(`${API_BASE}/invitation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'فشل إرسال الدعوة');
    }

    const data = await response.json();
    return data.responses;
  }

  /**
   * إرسال رسالة عامة
   */
  async sendMessage(request: MessageRequest): Promise<MessageResponse> {
    const response = await fetch(`${API_BASE}/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'فشل إرسال الرسالة');
    }

    const data = await response.json();
    return data.response;
  }

  /**
   * الحصول على حالة الرسالة
   */
  async getMessageStatus(messageId: string, platform: MessagingPlatform): Promise<{
    status: 'sent' | 'delivered' | 'read' | 'failed';
    timestamp: string;
  }> {
    const response = await fetch(`${API_BASE}/status/${messageId}?platform=${platform}`);
    if (!response.ok) {
      throw new Error('فشل جلب حالة الرسالة');
    }

    const data = await response.json();
    return data.status;
  }
}

export const messagingService = new MessagingService();

