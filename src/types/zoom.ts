/**
 * أنواع البيانات لجلسات Zoom
 */

export interface ZoomSession {
  id: string;
  courseId: string;
  moduleId?: string;
  title: string;
  description?: string;
  
  // معلومات الجلسة
  meetingId: string; // Zoom Meeting ID
  meetingPassword?: string;
  joinUrl: string;
  hostUrl?: string;
  
  // الجدولة
  startTime: string;
  endTime: string;
  duration: number; // بالدقائق
  timezone: string;
  
  // الحالة
  status: 'scheduled' | 'live' | 'ended' | 'cancelled';
  isLive: boolean;
  
  // المشاركين
  maxParticipants?: number;
  currentParticipants?: number;
  registeredParticipants: string[]; // معرفات المستخدمين المسجلين
  
  // الإعدادات
  settings: ZoomSessionSettings;
  
  // الروابط
  recordingUrl?: string;
  transcriptUrl?: string;
  
  // المراسلة
  whatsappLinkSent: boolean;
  telegramLinkSent: boolean;
  whatsappSentAt?: string;
  telegramSentAt?: string;
  
  // المتابعة
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface ZoomSessionSettings {
  // إعدادات الجلسة
  autoRecord: boolean;
  muteOnEntry: boolean;
  waitingRoom: boolean;
  allowJoinBeforeHost: boolean;
  
  // التفاعل
  allowChat: boolean;
  allowScreenShare: boolean;
  allowBreakoutRooms: boolean;
  
  // الأمان
  requirePassword: boolean;
  requireAuthentication: boolean;
}

export interface CreateZoomSessionRequest {
  courseId: string;
  moduleId?: string;
  title: string;
  description?: string;
  startTime: string;
  duration: number; // بالدقائق
  settings?: Partial<ZoomSessionSettings>;
  sendWhatsApp?: boolean;
  sendTelegram?: boolean;
}

export interface UpdateZoomSessionRequest {
  title?: string;
  description?: string;
  startTime?: string;
  duration?: number;
  status?: ZoomSession['status'];
  settings?: Partial<ZoomSessionSettings>;
}

export interface ZoomSessionParticipant {
  userId: string;
  name: string;
  email: string;
  joinTime?: string;
  leaveTime?: string;
  duration?: number; // بالدقائق
  status: 'registered' | 'joined' | 'left' | 'no-show';
}

