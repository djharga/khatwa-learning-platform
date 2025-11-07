/**
 * أنواع البيانات للمراسلة (واتساب/تليجرام)
 */

export type MessagingPlatform = 'whatsapp' | 'telegram';
export type MessageType = 'zoom_link' | 'invitation' | 'notification' | 'reminder';

export interface MessagingConfig {
  platform: MessagingPlatform;
  enabled: boolean;
  apiKey?: string;
  apiSecret?: string;
  phoneNumber?: string; // لواتساب
  botToken?: string; // لتليجرام
  channelId?: string; // لتليجرام
  webhookUrl?: string;
}

export interface MessageRequest {
  platform: MessagingPlatform;
  type: MessageType;
  recipient: MessageRecipient;
  content: MessageContent;
  scheduledAt?: string; // للرسائل المجدولة
}

export interface MessageRecipient {
  userId?: string;
  phone?: string; // لواتساب
  telegramId?: string; // لتليجرام
  email?: string;
  name?: string;
}

export interface MessageContent {
  text?: string;
  link?: string;
  linkTitle?: string;
  linkDescription?: string;
  template?: string; // قالب الرسالة
  variables?: Record<string, string>; // متغيرات القالب
}

export interface SendZoomLinkRequest {
  sessionId: string;
  recipientIds: string[]; // معرفات المستخدمين
  platforms: MessagingPlatform[];
  message?: string; // رسالة مخصصة
}

export interface SendInvitationRequest {
  invitationId: string;
  recipient: MessageRecipient;
  platforms: MessagingPlatform[];
  message?: string;
}

export interface MessageResponse {
  success: boolean;
  messageId?: string;
  platform: MessagingPlatform;
  recipient: MessageRecipient;
  sentAt: string;
  error?: string;
}

export interface MessageStatus {
  messageId: string;
  platform: MessagingPlatform;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  timestamp: string;
  error?: string;
}

