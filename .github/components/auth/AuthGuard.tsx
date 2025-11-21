'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/contexts/AuthContext';

/**
 * Props for the AuthGuard component
 */
interface AuthGuardProps {
  /** The child components to render if authorized */
  children: React.ReactNode;
  /** Array of roles allowed to access the protected content */
  allowedRoles: UserRole[];
  /** Optional: redirect path for unauthorized users (default: /login) */
  redirectTo?: string;
}

/**
 * Authentication guard component that restricts access based on user roles.
 * Uses AuthContext instead of localStorage for better security.
 * Redirects unauthorized users to the login page.
 * Displays a loading state while checking authorization.
 */
const AuthGuard = ({ children, allowedRoles, redirectTo = '/login' }: AuthGuardProps) => {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    // انتظار انتهاء تحميل حالة المصادقة
    if (isLoading) return;

    // إذا كان المستخدم غير مسجل دخول، توجيهه لصفحة تسجيل الدخول
    if (!isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    // إذا كان المستخدم مسجل دخول ولكن ليس لديه الصلاحية المطلوبة
    if (user && !allowedRoles.includes(user.role)) {
      router.push('/unauthorized');
      return;
    }
  }, [isAuthenticated, isLoading, user, allowedRoles, router, redirectTo]);

  // عرض حالة التحميل
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">جاري التحقق من الصلاحيات...</p>
        </div>
      </div>
    );
  }

  // إذا كان المستخدم غير مسجل دخول أو ليس لديه الصلاحية، لا نعرض المحتوى
  if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
    return null;
  }

  // عرض المحتوى المحمي
  return <>{children}</>;
};

export default AuthGuard;
