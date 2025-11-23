/**
 * خدمة إدارة لوحة التحكم
 * توفر وظائف لجلب البيانات الحقيقية من API
 */

const API_PREFIX = '/api';

export interface AdminStats {
  users: {
    total: number;
    active: number;
    newThisMonth: number;
    newLastMonth: number;
    premium: number;
    growth: string;
    trend: 'up' | 'down' | 'stable';
  };
  programs: {
    total: number;
    active: number;
    completed: number;
    upcoming: number;
    totalParticipants: number;
    newParticipants: number;
    completionRate: number;
  };
  courses: {
    total: number;
    published: number;
    draft: number;
    totalEnrollments: number;
    activeEnrollments: number;
    completionRate: number;
  };
  revenue: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    growth: string;
    trend: 'up' | 'down' | 'stable';
    transactions: number;
    averageTransaction: number;
  };
  content: {
    totalFiles: number;
    totalSize: number;
    videos: number;
    documents: number;
    images: number;
    storageUsed: number;
    storageLimit: number;
  };
  system: {
    uptime: number;
    responseTime: number;
    activeSessions: number;
    serverLoad: number;
    cpuUsage: number;
    memoryUsage: number;
    diskUsage: number;
  };
  engagement: {
    dailyActiveUsers: number;
    weeklyActiveUsers: number;
    monthlyActiveUsers: number;
    averageSessionDuration: number;
    pageViews: number;
    bounceRate: number;
  };
  period: string;
  lastUpdated: string;
}

export interface Activity {
  id: string;
  type: 'user_registration' | 'program_completed' | 'content_uploaded' | 'payment_received' | 'course_enrollment' | 'user_login' | 'system_backup' | 'error_occurred';
  title: string;
  description: string;
  userId?: string;
  userName?: string;
  timestamp: string;
  severity?: 'info' | 'success' | 'warning' | 'error';
  metadata?: Record<string, any>;
}

export class AdminService {
  /**
   * الحصول على إحصائيات النظام
   */
  async getStats(period = 'month'): Promise<AdminStats> {
    try {
      const response = await fetch(`${API_PREFIX}/admin/stats?period=${period}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('فشل جلب الإحصائيات');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  }

  /**
   * الحصول على الأنشطة الأخيرة
   */
  async getActivities(limit = 20, type?: string, severity?: string): Promise<Activity[]> {
    try {
      const params = new URLSearchParams();
      params.append('limit', limit.toString());
      if (type) params.append('type', type);
      if (severity) params.append('severity', severity);

      const response = await fetch(`/api/admin/activities?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('فشل جلب الأنشطة');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw error;
    }
  }

  /**
   * البحث الشامل
   */
  async search(query: string): Promise<any> {
    try {
      const response = await fetch(`/api/admin/search?q=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('فشل البحث');
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching:', error);
      throw error;
    }
  }

  /**
   * الحصول على المهام
   */
  async getTasks(filters?: { status?: string; priority?: string; category?: string }): Promise<any[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.status) params.append('status', filters.status);
      if (filters?.priority) params.append('priority', filters.priority);
      if (filters?.category) params.append('category', filters.category);

      const response = await fetch(`/api/admin/tasks?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('فشل جلب المهام');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  /**
   * إنشاء مهمة جديدة
   */
  async createTask(taskData: any): Promise<any> {
    try {
      const response = await fetch(`${API_PREFIX}/admin/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('فشل إنشاء المهمة');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }
}

export const adminService = new AdminService();

