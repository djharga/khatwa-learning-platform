/**
 * Auth Context - إدارة حالة المصادقة
 * يستبدل localStorage بنظام أكثر أماناً يعتمد على httpOnly cookies من Backend
 */

'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api/client';

/**
 * أنواع المستخدمين
 */
export type UserRole = 'student' | 'admin' | 'instructor' | 'company';

/**
 * بيانات المستخدم
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  companyName?: string;
  isPremium?: boolean;
}

/**
 * حالة المصادقة
 */
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Context API
 */
interface AuthContextType extends AuthState {
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  clearError: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  userType: 'student' | 'company';
  companyName?: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth Provider Component
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  /**
   * التحقق من حالة المصادقة من Backend
   */
  const checkAuth = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      // استدعاء Backend للتحقق من المصادقة
      // سيتم تنفيذ هذا من Backend
      const response = await api.get<{ user: User; isAuthenticated: boolean }>('/auth/me');

      if (response.data.isAuthenticated && response.data.user) {
        setState({
          user: response.data.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    } catch (error: any) {
      // إذا كان 401، المستخدم غير مسجل دخول
      if (error.response?.status === 401) {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'حدث خطأ في التحقق من المصادقة',
        });
      }
    }
  }, []);

  /**
   * تسجيل الدخول
   */
  const login = useCallback(async (email: string, password: string, rememberMe = false) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await api.post<{ user: User }>('/auth/login', {
        email,
        password,
        rememberMe,
      });

      if (response.data.user) {
        setState({
          user: response.data.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        // توجيه المستخدم حسب دوره
        const redirectPath = getRedirectPath(response.data.user.role);
        router.push(redirectPath);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'فشل تسجيل الدخول. يرجى التحقق من البيانات';
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw new Error(errorMessage);
    }
  }, [router]);

  /**
   * التسجيل
   */
  const register = useCallback(async (data: RegisterData) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await api.post<{ user: User }>('/auth/register', data);

      if (response.data.user) {
        setState({
          user: response.data.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        // توجيه المستخدم حسب دوره
        const redirectPath = getRedirectPath(response.data.user.role);
        router.push(redirectPath);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'فشل التسجيل. يرجى المحاولة مرة أخرى';
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw new Error(errorMessage);
    }
  }, [router]);

  /**
   * تسجيل الخروج
   */
  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      router.push('/login');
    }
  }, [router]);

  /**
   * تحديث بيانات المستخدم
   */
  const updateUser = useCallback((userData: Partial<User>) => {
    setState((prev) => {
      if (!prev.user) return prev;
      return {
        ...prev,
        user: { ...prev.user, ...userData },
      };
    });
  }, []);

  /**
   * تحديث حالة المصادقة
   */
  const refreshAuth = useCallback(async () => {
    await checkAuth();
  }, [checkAuth]);

  /**
   * مسح الأخطاء
   */
  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  // التحقق من المصادقة عند تحميل المكون
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    refreshAuth,
    updateUser,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook لاستخدام Auth Context
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * تحديد مسار التوجيه حسب دور المستخدم
 */
function getRedirectPath(role: UserRole): string {
  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'student':
    case 'company':
    case 'instructor':
      return '/student';
    default:
      return '/';
  }
}

