/**
 * أنواع البيانات لوحة الإدارة
 */

export interface PageVisibility {
  id: string;
  pagePath: string;
  pageName: string;
  isVisible: boolean;
  visibleToRoles: string[]; // الأدوار المسموح لها بالوصول
  visibleToUsers?: string[]; // مستخدمون محددون
  visibleToCompanies?: string[]; // شركات محددة
  schedule?: {
    startDate?: string;
    endDate?: string;
  };
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}

export interface PageVisibilityUpdate {
  pagePath: string;
  isVisible: boolean;
  visibleToRoles?: string[];
  visibleToUsers?: string[];
  visibleToCompanies?: string[];
  schedule?: {
    startDate?: string;
    endDate?: string;
  };
}

export interface ScreenVisibility {
  id: string;
  screenId: string;
  screenName: string;
  componentPath?: string;
  isVisible: boolean;
  visibleToRoles: string[];
  conditions?: Record<string, any>; // شروط إضافية
  createdAt: string;
  updatedAt: string;
}

export interface AdminActivity {
  id: string;
  adminId: string;
  action: string;
  resourceType: 'course' | 'user' | 'file' | 'module' | 'video' | 'page' | 'other';
  resourceId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

