'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Props for the AuthGuard component
 */
interface AuthGuardProps {
  /** The child components to render if authorized */
  children: React.ReactNode;
  /** Array of roles allowed to access the protected content */
  allowedRoles: ('student' | 'admin' | 'instructor')[];
}

/**
 * Authentication guard component that restricts access based on user roles.
 * Redirects unauthorized users to the login page.
 * Displays a loading state while checking authorization.
 */
const AuthGuard = ({ children, allowedRoles }: AuthGuardProps) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // هنا يمكنك إضافة منطق التحقق من الصلاحيات الخاص بك
    // مثال: التحقق من وجود توكن وصلاحيات المستخدم
    /**
     * Verifies user authentication and role authorization.
     * Checks localStorage for user role and validates against allowed roles.
     */
    const checkAuth = async () => {
      try {
        // قم بتعديل هذا الجزء حسب نظام المصادقة الخاص بك
        const userRole = localStorage.getItem('userRole');
        if (userRole && allowedRoles.includes(userRole as 'student' | 'admin' | 'instructor')) {
          setIsAuthorized(true);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [allowedRoles, router]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">جاري التحقق من الصلاحيات...</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
