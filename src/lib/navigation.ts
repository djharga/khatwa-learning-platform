// نظام الروابط الموحد لمنصة خطى التعليمية
// يوفر تنظيم متسق ومركزي لجميع الروابط والصفحات

export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  icon?: string;
  badge?: string;
  description?: string;
  children?: NavigationItem[];
  requiresAuth?: boolean;
  roles?: ('student' | 'instructor' | 'admin' | 'public')[];
  isActive?: (pathname: string) => boolean;
  priority?: number;
}

export interface NavigationDropdownItem {
  id: string;
  label: string;
  icon: string;
  children: NavigationItem[];
}

export type NavigationMenuItem = NavigationItem | NavigationDropdownItem;

export interface NavigationSection {
  id: string;
  title: string;
  items: NavigationItem[];
  priority: number;
  roles?: ('student' | 'instructor' | 'admin' | 'public')[];
}

// تعريف جميع الروابط المتاحة في المنصة
export const navigationItems: Record<string, NavigationItem> = {
  // الصفحات العامة
  home: {
    id: 'home',
    label: 'الرئيسية',
    href: '/',
    icon: 'home',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 1,
  },

  // المحتوى التعليمي
  internalAuditors: {
    id: 'internal-auditors',
    label: 'المراجعون الداخليون',
    href: '/internal-auditors',
    icon: 'audit',
    description: 'كورسات المراجعة الداخلية والمسار المهني',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 2,
  },

  auditorsFellowship: {
    id: 'auditors-fellowship',
    label: 'زمالة المراجعين الداخليين',
    href: '/auditors-fellowship',
    icon: 'fellowship',
    description: 'برنامج زمالة متخصص بالمراجعة الداخلية',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 3,
  },

  courses: {
    id: 'courses',
    label: 'الكورسات',
    href: '/courses',
    icon: 'courses',
    description: 'جميع الكورسات المتاحة',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 4,
  },



  learningPaths: {
    id: 'learning-paths',
    label: 'مسارات التعلم',
    href: '/learning-paths',
    icon: 'paths',
    description: 'مسارات تعليمية منظمة',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 5,
  },

  community: {
    id: 'community',
    label: 'المجتمع التعليمي',
    href: '/community',
    icon: 'community',
    description: 'مساحة للتفاعل مع الزملاء والخبراء',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 5.5,
  },

  financialManagement: {
    id: 'financial-management',
    label: 'برامج الإدارة المالية',
    href: '/financial-management',
    icon: 'calculator',
    description: 'برامج متخصصة في الإدارة المالية والتشغيل',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 6,
  },



  // لوحة تحكم الطالب
  studentDashboard: {
    id: 'student-dashboard',
    label: 'لوحة التحكم',
    href: '/student',
    icon: 'dashboard',
    requiresAuth: true,
    roles: ['student'],
    priority: 10,
  },

  files: {
    id: 'files',
    label: 'ملفاتي',
    href: '/student/file-manager',
    icon: 'folder',
    description: 'مدير الملفات الشخصي الخاص بك',
    roles: ['student'],
    requiresAuth: true,
    priority: 11.5,
  },



  resourceCourseFiles: {
    id: 'resource-course-files',
    label: 'مكتبة ملفات الكورسات',
    href: '/resources/course-files',
    icon: 'resources',
    description: 'مكتبة منظمة لملفات الكورسات داخل مركز الموارد',
    roles: ['student', 'instructor'],
    requiresAuth: true,
    priority: 11.6,
  },

  certificates: {
    id: 'certificates',
    label: 'شهاداتي',
    href: '/certificates',
    icon: 'award',
    description: 'شهاداتك وإنجازاتك المعتمدة',
    requiresAuth: true,
    roles: ['student'],
    priority: 12,
  },

  meetingRoom: {
    id: 'meeting-room',
    label: 'غرفة الاجتماعات',
    href: '/meeting-room',
    icon: 'video',
    description: 'الجلسات المباشرة والتسجيلات',
    requiresAuth: true,
    roles: ['student', 'instructor'],
    priority: 13,
  },

  studentExam: {
    id: 'student-exam',
    label: 'الامتحانات',
    href: '/student/exam',
    icon: 'exams',
    description: 'متابعة الامتحانات والتقييمات الخاصة بك',
    requiresAuth: true,
    roles: ['student'],
    priority: 13.5,
  },

  subscription: {
    id: 'subscription',
    label: 'الاشتراكات',
    href: '/subscription',
    icon: 'credit-card',
    description: 'خطط الاشتراك والمدفوعات',
    roles: ['public', 'student', 'instructor'],
    priority: 14,
  },

  // لوحة تحكم المدرس
  instructorDashboard: {
    id: 'instructor-dashboard',
    label: 'لوحة المدرس',
    href: '/instructor',
    icon: 'instructor',
    requiresAuth: true,
    roles: ['instructor'],
    priority: 20,
  },

  myCourses: {
    id: 'my-courses',
    label: 'دوراتي',
    href: '/instructor/courses',
    icon: 'courses',
    requiresAuth: true,
    roles: ['instructor'],
    priority: 21,
  },

  myStudents: {
    id: 'my-students',
    label: 'طلابي',
    href: '/instructor/students',
    icon: 'users',
    requiresAuth: true,
    roles: ['instructor'],
    priority: 22,
  },

  // لوحة تحكم الأدمن
  adminDashboard: {
    id: 'admin-dashboard',
    label: 'لوحة الإدارة',
    href: '/admin/dashboard',
    icon: 'admin',
    requiresAuth: true,
    roles: ['admin'],
    priority: 30,
  },

  adminCourses: {
    id: 'admin-courses',
    label: 'إدارة الدورات',
    href: '/admin/courses',
    icon: 'courses',
    requiresAuth: true,
    roles: ['admin'],
    priority: 31,
  },

  adminUsers: {
    id: 'admin-users',
    label: 'إدارة المستخدمين',
    href: '/admin/users',
    icon: 'users',
    requiresAuth: true,
    roles: ['admin'],
    priority: 32,
  },

  adminReports: {
    id: 'admin-reports',
    label: 'تقارير الإدارة',
    href: '/admin/reports',
    icon: 'reports',
    requiresAuth: true,
    roles: ['admin'],
    priority: 33,
  },

  // صفحات الدعم
  faq: {
    id: 'faq',
    label: 'الأسئلة الشائعة',
    href: '/faq',
    icon: 'help',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 40,
  },

  contact: {
    id: 'contact',
    label: 'اتصل بنا',
    href: '/contact',
    icon: 'contact',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 41,
  },

  support: {
    id: 'support',
    label: 'الدعم الفني',
    href: '/support',
    icon: 'support',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 42,
  },

  // صفحات إضافية
  profile: {
    id: 'profile',
    label: 'الملف الشخصي',
    href: '/student/profile',
    icon: 'user',
    requiresAuth: true,
    roles: ['student', 'instructor', 'admin'],
    priority: 50,
  },

  settings: {
    id: 'settings',
    label: 'الإعدادات',
    href: '/student/settings',
    icon: 'settings',
    requiresAuth: true,
    roles: ['student', 'instructor', 'admin'],
    priority: 51,
  },

  reports: {
    id: 'reports',
    label: 'التقارير',
    href: '/student/reports',
    icon: 'reports',
    requiresAuth: true,
    roles: ['student', 'instructor', 'admin'],
    priority: 52,
  },

  blog: {
    id: 'blog',
    label: 'المدونة',
    href: '/blog',
    icon: 'book',
    description: 'مقالات ومحتوى تعليمي متخصص',
    roles: ['public', 'student', 'instructor', 'admin'],
    requiresAuth: false,
    priority: 15,
  },

  consulting: {
    id: 'consulting',
    label: 'الاستشارات الفردية',
    href: '/consulting',
    icon: 'users',
    description: 'احصل على استشارة شخصية مع خبراء متخصصين',
    roles: ['public', 'student', 'instructor'],
    requiresAuth: false,
    priority: 16,
  },

  resources: {
    id: 'resources',
    label: 'المكتبة والموارد',
    href: '/resources',
    icon: 'library',
    description: 'مكتبة شاملة من الموارد التعليمية والمراجع المهنية',
    roles: ['public', 'student', 'instructor', 'admin'],
    requiresAuth: false,
    priority: 17,
  },

};

// تنظيم الروابط حسب الأقسام
export const navigationSections: NavigationSection[] = [
  {
    id: 'main',
    title: 'الرئيسية',
    priority: 1,
    roles: ['public', 'student', 'instructor', 'admin'],
    items: [
      navigationItems.home,
    ],
  },
  {
    id: 'learning',
    title: 'التعلم والمحتوى',
    priority: 2,
    roles: ['public', 'student', 'instructor', 'admin'],
    items: [
      navigationItems.internalAuditors,
      navigationItems.auditorsFellowship,
      navigationItems.courses,
      navigationItems.learningPaths,
      navigationItems.community,
      navigationItems.financialManagement,
      navigationItems.blog,
      navigationItems.resources,
    ],
  },
  {
    id: 'services',
    title: 'الخدمات الإضافية',
    priority: 2.5,
    roles: ['public', 'student', 'instructor', 'admin'],
    items: [
      navigationItems.consulting,
      navigationItems.subscription,
    ],
  },
  {
    id: 'student',
    title: 'لوحة الطالب',
    priority: 3,
    roles: ['student'],
    items: [
      navigationItems.studentDashboard,
      navigationItems.files,
      navigationItems.certificates,
      navigationItems.studentExam,
      navigationItems.meetingRoom,
      navigationItems.resourceCourseFiles,
      navigationItems.subscription,
    ],
  },
  {
    id: 'instructor',
    title: 'لوحة المدرس',
    priority: 4,
    roles: ['instructor'],
    items: [
      navigationItems.instructorDashboard,
      navigationItems.myCourses,
      navigationItems.myStudents,
      navigationItems.meetingRoom,
    ],
  },
  {
    id: 'admin',
    title: 'الإدارة',
    priority: 5,
    roles: ['admin'],
    items: [
      navigationItems.adminDashboard,
      navigationItems.adminCourses,
      navigationItems.adminUsers,
      navigationItems.adminReports,
    ],
  },
  {
    id: 'support',
    title: 'الدعم والمساعدة',
    priority: 6,
    roles: ['public', 'student', 'instructor', 'admin'],
    items: [
      navigationItems.faq,
      navigationItems.contact,
      navigationItems.support,
    ],
  },
  {
    id: 'account',
    title: 'الحساب الشخصي',
    priority: 7,
    roles: ['student', 'instructor', 'admin'],
    items: [
      navigationItems.profile,
      navigationItems.settings,
      navigationItems.reports,
    ],
  },
];

// دوال مساعدة للحصول على الروابط حسب الدور والحالة
export const getNavigationForUser = (userRole?: string, isAuthenticated = false) => {
  const role = isAuthenticated ? userRole || 'student' : 'public';

  return navigationSections
    .filter(section => !section.roles || section.roles.includes(role as any))
    .map(section => ({
      ...section,
      items: section.items.filter(item =>
        !item.roles || item.roles.includes(role as any)
      ).filter(item =>
        !item.requiresAuth || isAuthenticated
      ),
    }))
    .filter(section => section.items.length > 0)
    .sort((a, b) => a.priority - b.priority);
};

// الحصول على روابط الـ Navbar للزوار
export const getPublicNavbarItems = () => [
  navigationItems.home,
  {
    id: 'learning-dropdown',
    label: 'المحتوى التعليمي',
    icon: 'learning',
    children: [
      navigationItems.internalAuditors,
      navigationItems.auditorsFellowship,
      navigationItems.courses,
      navigationItems.learningPaths,
      navigationItems.community,
      navigationItems.financialManagement,
      navigationItems.blog,
      navigationItems.resources,
    ],
  },
  {
    id: 'services-dropdown',
    label: 'الخدمات',
    icon: 'services',
    children: [
      navigationItems.consulting,
      navigationItems.subscription,
    ],
  },
  {
    id: 'support-dropdown',
    label: 'الدعم',
    icon: 'support',
    children: [
      navigationItems.faq,
      navigationItems.contact,
    ],
  },
];

// الحصول على روابط الـ Sidebar للمستخدمين المسجلين
export const getSidebarItems = (userRole: string = 'student') => {
  const userNav = getNavigationForUser(userRole, true);
  return userNav.map(section => ({
    category: section.id,
    title: section.title,
    items: section.items.map(item => ({
      name: item.label,
      href: item.href,
      icon: item.icon,
      badge: item.badge,
    })),
  }));
};

// روابط الملاحة السفلية للهواتف المحمولة
export const getBottomNavigationItems = (userRole?: string, isAuthenticated = false) => {
  const role = isAuthenticated ? userRole || 'student' : 'public';

  const flows: Record<string, string[]> = {
    public: ['home', 'courses', 'community', 'subscription', 'support'],
    student: ['home', 'courses', 'community', 'student-exam', 'certificates', 'support'],
    instructor: ['home', 'courses', 'community', 'my-courses', 'meeting-room', 'support'],
    admin: ['home', 'courses', 'community', 'admin-dashboard', 'admin-users', 'support'],
  };

  const flowIds = flows[role] || flows.public;

  return flowIds
    .map(id => navigationItems[id])
    .filter((item): item is NavigationItem => Boolean(item))
    .filter(item => (!item.requiresAuth || isAuthenticated) && (!item.roles || item.roles.includes(role as any)));
};

// دوال مساعدة للتحقق من الروابط النشطة
export const isActiveLink = (href: string, pathname: string) => {
  if (href === '/') {
    return pathname === '/';
  }
  return pathname.startsWith(href);
};

// الحصول على مسار التنقل (Breadcrumbs)
export const getBreadcrumbs = (pathname: string) => {
  const breadcrumbs = [{ label: 'الرئيسية', href: '/' }];

  // إضافة مسارات بناءً على المسار الحالي
  if (pathname.startsWith('/internal-auditors')) {
    breadcrumbs.push({ label: 'المراجعون الداخليون', href: '/internal-auditors' });
  } else if (pathname.startsWith('/auditors-fellowship')) {
    breadcrumbs.push({ label: 'زمالة المراجعين الداخليين', href: '/auditors-fellowship' });
  } else if (pathname.startsWith('/courses')) {
    breadcrumbs.push({ label: 'الكورسات', href: '/courses' });
  } else if (pathname.startsWith('/browse-courses')) {
    breadcrumbs.push({ label: 'الكورسات', href: '/courses' });
  } else if (pathname.startsWith('/learning-paths')) {
    breadcrumbs.push({ label: 'مسارات التعلم', href: '/learning-paths' });
  } else if (pathname.startsWith('/community')) {
    breadcrumbs.push({ label: 'المجتمع التعليمي', href: '/community' });
  } else if (pathname.startsWith('/student') || pathname.startsWith('/certificates')) {
    breadcrumbs.push({ label: 'لوحة التحكم', href: '/student' });
    if (pathname.startsWith('/student/exam')) {
      breadcrumbs.push({ label: 'الامتحانات', href: '/student/exam' });
    }
  } else if (pathname.startsWith('/instructor')) {
    breadcrumbs.push({ label: 'لوحة المدرس', href: '/instructor' });
  } else if (pathname.startsWith('/admin/dashboard')) {
    breadcrumbs.push({ label: 'لوحة الإدارة', href: '/admin/dashboard' });
  } else if (pathname.startsWith('/admin/reports')) {
    breadcrumbs.push({ label: 'لوحة الإدارة', href: '/admin/dashboard' });
    breadcrumbs.push({ label: 'تقارير الإدارة', href: '/admin/reports' });
  } else if (pathname.startsWith('/blog')) {
    breadcrumbs.push({ label: 'المدونة', href: '/blog' });
  } else if (pathname.startsWith('/consulting')) {
    breadcrumbs.push({ label: 'الاستشارات', href: '/consulting' });
  } else if (pathname.startsWith('/resources')) {
    breadcrumbs.push({ label: 'المكتبة', href: '/resources' });
    if (pathname.startsWith('/resources/course-files')) {
      breadcrumbs.push({ label: 'ملفات الكورسات', href: '/resources/course-files' });
    }
  } else if (pathname.startsWith('/files')) {
    breadcrumbs.push({ label: 'ملفاتي', href: '/files' });
  } else if (pathname.startsWith('/financial-management')) {
    breadcrumbs.push({ label: 'برامج الإدارة المالية', href: '/financial-management' });
  }

  return breadcrumbs;
};

// روابط ذات أولوية عالية للوصول السريع
export const getQuickAccessLinks = (userRole?: string, isAuthenticated = false) => {
  const quickLinks: NavigationItem[] = [];

  if (isAuthenticated) {
    if (userRole === 'student') {
      quickLinks.push(
        navigationItems.studentDashboard,
        navigationItems.files,
        navigationItems.certificates,
        navigationItems.studentExam,
        navigationItems.meetingRoom,
        navigationItems.resourceCourseFiles
      );
    } else if (userRole === 'instructor') {
      quickLinks.push(
        navigationItems.instructorDashboard,
        navigationItems.myCourses,
        navigationItems.meetingRoom
      );
    } else if (userRole === 'admin') {
      quickLinks.push(
        navigationItems.adminDashboard,
        navigationItems.adminCourses,
        navigationItems.adminUsers
      );
    }
  } else {
    quickLinks.push(
      navigationItems.internalAuditors,
      navigationItems.auditorsFellowship,
      navigationItems.subscription
    );
  }

  return quickLinks;
};
