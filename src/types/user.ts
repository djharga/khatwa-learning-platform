/**
 * أنواع البيانات للمستخدمين والصلاحيات
 */

import type { UserRole } from '@/contexts/AuthContext';

export interface TraineeUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'student' | 'company';
  userType: 'individual' | 'company';
  
  // معلومات الشركة (إن وجدت)
  companyName?: string;
  companyLogo?: string;
  companyWebsite?: string;
  
  // الروابط المخصصة
  customUrl?: string; // مثال: company.audit-sa.com
  customDomain?: string;
  
  // الاشتراك
  subscriptionType: 'temporary' | 'lifetime'; // مؤقت أو مدى الحياة
  subscriptionStartDate: string;
  subscriptionEndDate?: string; // غير موجود للاشتراك مدى الحياة
  isLifetimeMember: boolean; // للاستخدام الخاص (مثل موظفي المالية)
  
  // التخزين
  storageQuota: number; // بالبايت (5GB = 5 * 1024 * 1024 * 1024)
  storageUsed: number; // بالبايت
  storageLimit: number; // بالبايت (5GB للمتدرب الواحد)
  
  // الدورات
  coursesEnrolled: string[]; // معرفات الدورات
  coursesCompleted: string[];
  
  // الصلاحيات
  permissions: TraineePermissions;
  
  // الحالة
  status: 'active' | 'inactive' | 'suspended';
  
  // التواريخ
  joinDate: string;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
}

export interface TraineePermissions {
  // الوصول للمحتوى
  canViewCourses: boolean;
  canViewFiles: boolean;
  canViewVideos: boolean;
  canDownloadFiles: boolean;
  
  // التعديل
  canEditFileNames: boolean; // فقط على النسخ الشخصية
  canCreatePersonalCopies: boolean;
  canModifyPersonalFiles: boolean;
  
  // المشاركة
  canAttendLiveSessions: boolean;
  canJoinZoomMeetings: boolean;
  
  // الميزات الخاصة
  canUseCustomBranding: boolean; // للشركات المميزة
  canCustomizeUrl: boolean; // للاشتراك مدى الحياة
}

export interface CompanyBranding {
  userId: string;
  companyName: string;
  companyLogo: string;
  customUrl: string;
  customDomain?: string;
  primaryColor?: string;
  secondaryColor?: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InvitationLink {
  id: string;
  userId?: string; // معرف المستخدم المرسل إليه
  email?: string;
  phone?: string;
  link: string;
  token: string;
  expiresAt: string;
  used: boolean;
  usedAt?: string;
  createdBy: string; // معرف الأدمن
  createdAt: string;
}

