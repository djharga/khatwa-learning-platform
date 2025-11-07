/**
 * Hook آمن للمصادقة
 * يوفر واجهة بسيطة لاستخدام Auth Context
 */

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { UserRole } from '@/contexts/AuthContext';

/**
 * Hook للمصادقة مع حماية المسارات
 */
export function useSecureAuth(allowedRoles?: UserRole[]) {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    // إذا كان المستخدم غير مسجل دخول، توجيهه لصفحة تسجيل الدخول
    if (!auth.isLoading && !auth.isAuthenticated) {
      router.push('/login');
      return;
    }

    // إذا كان المستخدم مسجل دخول ولكن ليس لديه الصلاحية المطلوبة
    if (
      auth.isAuthenticated &&
      auth.user &&
      allowedRoles &&
      allowedRoles.length > 0 &&
      !allowedRoles.includes(auth.user.role)
    ) {
      // توجيه المستخدم لصفحة غير مصرح بها
      router.push('/unauthorized');
      return;
    }
  }, [auth.isAuthenticated, auth.isLoading, auth.user, allowedRoles, router]);

  return {
    ...auth,
    // Helper functions
    isAdmin: auth.user?.role === 'admin',
    isInstructor: auth.user?.role === 'instructor',
    isStudent: auth.user?.role === 'student',
    isCompany: auth.user?.role === 'company',
    hasRole: (role: UserRole) => auth.user?.role === role,
    hasAnyRole: (roles: UserRole[]) => {
      if (!auth.user) return false;
      return roles.includes(auth.user.role);
    },
  };
}

/**
 * Hook بسيط للمصادقة بدون حماية المسارات
 */
export function useAuthSimple() {
  return useAuth();
}

