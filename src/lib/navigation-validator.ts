/**
 * أداة التحقق من صحة نظام الروابط والملاحة
 * تساعد في اكتشاف الروابط المفقودة والأخطاء في التنظيم
 */

import { navigationItems, navigationSections } from './navigation';
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

export interface LinkStatus {
  href: string;
  exists: boolean;
  type: 'page' | 'component' | 'unknown';
  status: 'valid' | 'missing' | 'redirect';
}

// قائمة الصفحات الموجودة فعلياً في المشروع (82+ صفحة محدثة)
const existingPages = [
  // الصفحة الرئيسية
  '/',
  
  // صفحات عامة (Public Pages)
  '/about',
  '/internal-audit',
  '/cia',
  '/auditors-fellowship',
  '/courses',
  '/courses/[slug]',
  '/question-bank',
  '/financial-management',
  '/finance-basics',
  '/procurement-management',
  '/warehouse-management',
  '/financial-reporting',
  '/inventory-reconciliations',
  '/restaurant-management',
  '/packages-and-consulting',
  '/certificates',
  '/meeting-room',
  '/faq',
  '/contact',
  '/support',
  '/blog',
  '/consulting',
  '/resources',
  '/resources/course-files',
  '/files',
  '/community',
  '/workshops',
  '/ai-tools',
  '/search',
  '/notifications',
  '/review',
  
  // صفحات المصادقة (Auth)
  '/login',
  '/register',
  '/forgot-password',
  '/auth',
  
  // لوحة الطالب (Student Dashboard)
  '/student',
  '/student/dashboard',
  '/student/file-manager',
  '/student/certificates',
  '/student/courses',
  '/student/courses/[id]',
  '/student/courses/[id]/lesson/[lessonId]',
  '/student/exam',
  '/student/profile',
  '/student/profile/cms',
  '/student/settings',
  '/student/reports',
  '/student/course-files',
  '/student/accounting-simulation',
  '/student/storage-calculator',
  '/student/gallery',
  '/student/inbox',
  '/student/progress',
  '/student/consulting',
  '/student/support',
  
  
  // لوحة الأدمن (Admin Dashboard)
  '/admin',
  '/admin/dashboard',
  '/admin/courses',
  '/admin/users',
  '/admin/reports',
  '/admin/content',
  '/admin/controls',
  '/admin/programs',
  
  // صفحات إضافية
  '/privacy',
  '/terms',
  '/cookies',
  '/refund-policy',
  '/usage-policy',
];

// التحقق من وجود الصفحات بدون استخدام fs
export const validateFileExists = (href: string): LinkStatus => {
  if (existingPages.includes(href)) {
    return {
      href,
      exists: true,
      type: 'page',
      status: 'valid',
    };
  }

  return {
    href,
    exists: false,
    type: 'unknown',
    status: 'missing',
  };
};

// التحقق من صحة جميع الروابط
export const validateNavigationSystem = (): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];

  // التحقق من الروابط المفقودة
  Object.values(navigationItems).forEach(item => {
    if (item.href) {
      const status = validateFileExists(item.href);

      if (!status.exists) {
        errors.push(`الرابط مفقود: ${item.href} (${item.label})`);
      }
    }

    // التحقق من الأيقونات
    if (!item.icon) {
      warnings.push(`أيقونة مفقودة للرابط: ${item.label}`);
    }

    // التحقق من الأدوار
    if (!item.roles || item.roles.length === 0) {
      warnings.push(`أدوار غير محددة للرابط: ${item.label}`);
    }
  });

  // التحقق من التسلسل الهرمي للأقسام
  navigationSections.forEach(section => {
    if (!section.items || section.items.length === 0) {
      warnings.push(`قسم فارغ: ${section.title}`);
    }

    section.items.forEach(item => {
      if (!navigationItems[item.id]) {
        errors.push(`رابط غير موجود في تعريفات الروابط: ${item.id}`);
      }
    });
  });

  // اقتراحات للتحسين
  const totalLinks = Object.keys(navigationItems).length;
  const missingLinks = errors.filter(e => e.includes('الرابط مفقود')).length;

  if (missingLinks > 0) {
    suggestions.push(`إنشاء ${missingLinks} صفحة مفقودة من أصل ${totalLinks} رابط`);
  }

  if (warnings.some(w => w.includes('أيقونة مفقودة'))) {
    suggestions.push('إضافة أيقونات لجميع الروابط لتحسين تجربة المستخدم');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    suggestions,
  };
};

// إنشاء تقرير مفصل عن حالة الروابط
export const generateNavigationReport = () => {
  const validation = validateNavigationSystem();
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalLinks: Object.keys(navigationItems).length,
      validLinks: Object.keys(navigationItems).length - validation.errors.filter(e => e.includes('الرابط مفقود')).length,
      sections: navigationSections.length,
      errors: validation.errors.length,
      warnings: validation.warnings.length,
    },
    details: {
      errors: validation.errors,
      warnings: validation.warnings,
      suggestions: validation.suggestions,
    },
    sections: navigationSections.map(section => ({
      id: section.id,
      title: section.title,
      itemCount: section.items.length,
      roles: section.roles,
    })),
  };

  return report;
};

// دوال مساعدة للتطوير
export const getMissingPages = () => {
  return Object.values(navigationItems)
    .filter(item => item.href && !validateFileExists(item.href).exists)
    .map(item => ({
      id: item.id,
      label: item.label,
      href: item.href || '',
      suggestedPath: `src/app${item.href}/page.tsx`,
    }));
};

// دوال مساعدة مبسطة للتطوير (بدون استخدام fs)
export const getOrphanedFiles = () => {
  // هذه الدالة يمكن تطويرها لاحقاً بدون استخدام fs
  return [];
};
