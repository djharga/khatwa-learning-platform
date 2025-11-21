/**
 * Centralized Routes Configuration
 * جميع المسارات في منصة خطى التعليمية
 */

export const ROUTES = {
  // الصفحات العامة
  HOME: '/',
  ABOUT: '/about',
  COURSES: '/courses',
  SUBSCRIBE: '/subscribe',
  UNAUTHORIZED: '/unauthorized',
  INTERNAL_AUDIT: '/internal-audit',
  CIA: '/cia',
  AI_TOOLS: '/ai-tools',
  BLOG: '/blog',
  LEARNING_HUB: '/learning-hub',
  WORKSHOPS: '/workshops',
  
  // المصادقة
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  
  // لوحة الطالب
  STUDENT_DASH: '/student/dashboard',
  STUDENT_COURSES: '/student/courses',
  STUDENT_PROFILE: '/student/profile',
  STUDENT_CERTIFICATES: '/student/certificates',
  STUDENT_EXAM: '/student/exam',
  STUDENT_FILES: '/student/file-manager',
  STUDENT_SETTINGS: '/student/settings',
  STUDENT_REPORTS: '/student/reports',
  STUDENT_CONSULTING: '/student/consulting',
  STUDENT_SUPPORT: '/student/support',
  
  // لوحة الإدارة
  ADMIN_DASH: '/admin/dashboard',
  ADMIN_COURSES: '/admin/courses',
  ADMIN_USERS: '/admin/users',
  ADMIN_REPORTS: '/admin/reports',
  ADMIN_CONTENT: '/admin/content',
  ADMIN_CONTROLS: '/admin/controls',
  ADMIN_PROGRAMS: '/admin/programs',
  
  // صفحات أخرى
  CONTACT: '/contact',
  FAQ: '/faq',
  SUPPORT: '/support',
  CERTIFICATES: '/certificates',
  MEETING_ROOM: '/meeting-room',
  CONSULTING: '/consulting',
  RESOURCES: '/resources',
  FILES: '/files',
  COMMUNITY: '/community',
  REFUND_POLICY: '/refund-policy',
  USAGE_POLICY: '/usage-policy',
} as const;

export type Route = typeof ROUTES[keyof typeof ROUTES];

/**
 * Helper function to check if a route exists
 */
export function isValidRoute(path: string): path is Route {
  return Object.values(ROUTES).includes(path as Route);
}

/**
 * Helper function to get route by key
 */
export function getRoute(key: keyof typeof ROUTES): Route {
  return ROUTES[key];
}

