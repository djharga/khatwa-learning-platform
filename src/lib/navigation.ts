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
  requiresSubscription?: boolean; // يتطلب اشتراك نشط
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
    href: '/internal-audit',
    icon: 'audit',
    description: 'كورسات المراجعة الداخلية والمسار المهني',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 2,
  },

  auditorsFellowship: {
    id: 'auditors-fellowship',
    label: 'زمالة CIA',
    href: '/cia',
    icon: 'fellowship',
    description: 'برنامج زمالة متخصص بالمراجعة الداخلية',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 3,
  },

  // الدورات التفصيلية
  aiAuditCourse: {
    id: 'ai-audit-course',
    label: 'المراجعة بالذكاء الاصطناعي',
    href: '/courses/ai-audit',
    icon: 'brain',
    description: 'دورة متخصصة في استخدام الذكاء الاصطناعي في المراجعة',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 4.1,
  },

  basicsCourse: {
    id: 'basics-course',
    label: 'أساسيات المحاسبة',
    href: '/courses/basics',
    icon: 'calculator',
    description: 'دورة للمبتدئين في أساسيات المحاسبة',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 4.2,
  },

  ciaPreparationCourse: {
    id: 'cia-preparation-course',
    label: 'تحضير شهادة CIA',
    href: '/courses/cia-preparation',
    icon: 'award',
    description: 'دورة تحضيرية شاملة لشهادة CIA',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 4.3,
  },

  complianceCourse: {
    id: 'compliance-course',
    label: 'الامتثال والالتزام',
    href: '/courses/compliance',
    icon: 'shield-check',
    description: 'تعلم معايير الامتثال والالتزام',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 4.4,
  },

  digitalAuditCourse: {
    id: 'digital-audit-course',
    label: 'المراجعة الرقمية',
    href: '/courses/digital-audit',
    icon: 'monitor',
    description: 'دورة متخصصة في المراجعة الرقمية والتقنيات الحديثة',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 4.5,
  },

  financialProjectsCourse: {
    id: 'financial-projects-course',
    label: 'المشاريع المالية',
    href: '/courses/financial-projects',
    icon: 'trending-up',
    description: 'إدارة وتقييم المشاريع المالية',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 4.6,
  },

  riskAnalysisCourse: {
    id: 'risk-analysis-course',
    label: 'تحليل المخاطر',
    href: '/courses/risk-analysis',
    icon: 'alert-triangle',
    description: 'تعلم تحليل وإدارة المخاطر المالية',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 4.7,
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

  // الدورات الجديدة
  financeBasics: {
    id: 'finance-basics',
    label: 'أساسيات المالية والمحاسبة',
    href: '/finance-basics',
    icon: 'calculator',
    description: 'تعلم أساسيات المالية والمحاسبة من الصفر',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 6.1,
  },

  procurementManagement: {
    id: 'procurement-management',
    label: 'إدارة المشتريات والتوريدات',
    href: '/procurement-management',
    icon: 'truck',
    description: 'تعلم إدارة المشتريات والتوريدات بكفاءة',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 6.2,
  },

  warehouseManagement: {
    id: 'warehouse-management',
    label: 'إدارة المخازن والمستودعات',
    href: '/warehouse-management',
    icon: 'warehouse',
    description: 'نظام شامل لإدارة المخازن والمخزون',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 6.3,
  },

  financialReporting: {
    id: 'financial-reporting',
    label: 'التقارير المالية والمحاسبية',
    href: '/financial-reporting',
    icon: 'file-text',
    description: 'إعداد التقارير المالية وفقاً للمعايير الدولية',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 6.4,
  },

  inventoryReconciliations: {
    id: 'inventory-reconciliations',
    label: 'التسويات الجردية والرقابة',
    href: '/inventory-reconciliations',
    icon: 'calculator',
    description: 'إجراء التسويات الجردية وإدارة الرقابة الداخلية',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 6.5,
  },

  restaurantManagement: {
    id: 'restaurant-management',
    label: 'إدارة وتشغيل المطاعم',
    href: '/restaurant-management',
    icon: 'chef-hat',
    description: 'إدارة المطاعم والمنشآت الغذائية بكفاءة',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 6.6,
  },

  // الميزات المتقدمة
  questionBank: {
    id: 'question-bank',
    label: 'بنك الأسئلة التفاعلي',
    href: '/question-bank',
    icon: 'book-open',
    description: 'بنك أسئلة تفاعلي مع ذكاء اصطناعي',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 16,
  },

  advancedFeatures: {
    id: 'advanced-features',
    label: 'الميزات المتقدمة',
    href: '/ai-tools',
    icon: 'brain',
    description: 'أحدث التقنيات والذكاء الاصطناعي',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 17,
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

  courseFiles: {
    id: 'course-files',
    label: 'ملفات الدورات',
    href: '/student/course-files',
    icon: 'folder',
    description: 'ملفات الدورات المسجلة',
    roles: ['student'],
    requiresAuth: true,
    priority: 11.7,
  },

  accountingSimulation: {
    id: 'accounting-simulation',
    label: 'محاكاة المحاسبة',
    href: '/student/accounting-simulation',
    icon: 'calculator',
    description: 'أداة محاكاة للمحاسبة',
    roles: ['student'],
    requiresAuth: true,
    priority: 11.8,
  },

  storageCalculator: {
    id: 'storage-calculator',
    label: 'حاسبة التخزين',
    href: '/student/storage-calculator',
    icon: 'hard-drive',
    description: 'حاسبة مساحة التخزين',
    roles: ['student'],
    requiresAuth: true,
    priority: 11.9,
  },

  studentGallery: {
    id: 'student-gallery',
    label: 'معرض الصور',
    href: '/student/gallery',
    icon: 'image',
    description: 'معرض صور الطالب',
    roles: ['student'],
    requiresAuth: true,
    priority: 12.1,
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
    href: '/packages-and-consulting?tab=packages',
    icon: 'credit-card',
    description: 'خطط الاشتراك والمدفوعات',
    roles: ['public', 'student', 'instructor'],
    priority: 14,
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
    href: '/student/consulting',
    icon: 'users',
    description: 'احصل على استشارة شخصية مع خبراء متخصصين',
    roles: ['student', 'instructor'], // فقط للمشتركين
    requiresAuth: true,
    requiresSubscription: true, // يتطلب اشتراك
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

  // صفحات إضافية
  onboardingDemo: {
    id: 'onboarding-demo',
    label: 'عرض توضيحي للبدء',
    href: '/onboarding-demo',
    icon: 'play',
    description: 'دليل تفاعلي للتعرف على المنصة',
    roles: ['public', 'student', 'instructor', 'admin'],
    requiresAuth: false,
    priority: 18,
  },

  about: {
    id: 'about',
    label: 'من نحن',
    href: '/about',
    icon: 'users',
    description: 'تعرف على منصة خطى التعليمية',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 19,
  },

  learningHub: {
    id: 'learning-hub',
    label: 'مركز التعلم',
    href: '/learning-hub',
    icon: 'graduation-cap',
    description: 'مركز شامل للتعلم والتطوير',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 19.5,
  },


  workshops: {
    id: 'workshops',
    label: 'ورش العمل',
    href: '/workshops',
    icon: 'users',
    description: 'ورش عمل تفاعلية مع الخبراء',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 19.8,
  },

  refundPolicy: {
    id: 'refund-policy',
    label: 'سياسة الاسترداد',
    href: '/refund-policy',
    icon: 'file-text',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 100,
  },

  usagePolicy: {
    id: 'usage-policy',
    label: 'سياسة الاستخدام',
    href: '/usage-policy',
    icon: 'file-text',
    roles: ['public', 'student', 'instructor', 'admin'],
    priority: 101,
  },
};

// تنظيم الروابط حسب الأقسام
export const navigationSections: NavigationSection[] = [
  {
    id: 'main',
    title: 'الرئيسية',
    priority: 1,
    roles: ['public', 'student', 'instructor', 'admin'],
    items: [navigationItems.home],
  },
  {
    id: 'courses',
    title: 'الكورسات والمحتوى التعليمي',
    priority: 2,
    roles: ['public', 'student', 'instructor', 'admin'],
    items: [
      navigationItems.courses,
      navigationItems.internalAuditors,
      navigationItems.financialManagement,
      navigationItems.financeBasics,
      navigationItems.procurementManagement,
      navigationItems.warehouseManagement,
      navigationItems.restaurantManagement,
      navigationItems.blog,
      navigationItems.resources,
    ],
  },
  {
    id: 'cia-fellowship',
    title: 'زمالة المراجعين الداخليين',
    priority: 2.1,
    roles: ['public', 'student', 'instructor', 'admin'],
    items: [navigationItems.auditorsFellowship, navigationItems.questionBank],
  },
  {
    id: 'reviews',
    title: 'المراجعات والتقارير',
    priority: 2.2,
    roles: ['public', 'student', 'instructor', 'admin'],
    items: [
      navigationItems.financialReporting,
      navigationItems.inventoryReconciliations,
      navigationItems.community,
    ],
  },
  {
    id: 'consultations-packages',
    title: 'الاستشارات والحزم',
    priority: 2.5,
    roles: ['public', 'student', 'instructor', 'admin'],
    items: [navigationItems.consulting, navigationItems.subscription],
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
    id: 'about',
    title: 'عن المنصة',
    priority: 5.5,
    roles: ['public', 'student', 'instructor', 'admin'],
    items: [
      navigationItems.about,
      navigationItems.community,
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
export const getNavigationForUser = (
  userRole?: string,
  isAuthenticated = false,
  hasSubscription = false
) => {
  const role = isAuthenticated ? userRole || 'student' : 'public';

  return navigationSections
    .filter((section) => !section.roles || section.roles.includes(role as any))
    .map((section) => ({
      ...section,
      items: section.items
        .filter((item) => !item.roles || item.roles.includes(role as any))
        .filter((item) => !item.requiresAuth || isAuthenticated)
        .filter((item) => !item.requiresSubscription || hasSubscription),
    }))
    .filter((section) => section.items.length > 0)
    .sort((a, b) => a.priority - b.priority);
};

// الحصول على روابط الـ Navbar للزوار - مُبسّطة مع قائمة "المزيد"
export const getPublicNavbarItems = () => [
  navigationItems.home,
  navigationItems.internalAuditors,
  navigationItems.auditorsFellowship,
  navigationItems.courses,
  navigationItems.community,
  {
    id: 'more-dropdown',
    label: 'المزيد',
    icon: 'more',
    children: [
      {
        id: 'courses-section',
        label: 'الدورات التفصيلية',
        icon: 'courses',
        children: [
          // دورات المراجعة والمحاسبة
          navigationItems.aiAuditCourse,
          navigationItems.basicsCourse,
          navigationItems.ciaPreparationCourse,
          navigationItems.complianceCourse,
          navigationItems.digitalAuditCourse,
          navigationItems.financialProjectsCourse,
          navigationItems.riskAnalysisCourse,
          // دورات الإدارة المالية
          navigationItems.financialManagement,
          navigationItems.financeBasics,
          navigationItems.financialReporting,
          navigationItems.procurementManagement,
          navigationItems.warehouseManagement,
          navigationItems.inventoryReconciliations,
        ],
      },
      {
        id: 'learning-section',
        label: 'المحتوى التعليمي',
        icon: 'learning',
        children: [
          navigationItems.learningHub,
          navigationItems.workshops,
          navigationItems.questionBank,
          navigationItems.advancedFeatures,
          navigationItems.blog,
          navigationItems.resources,
          navigationItems.onboardingDemo,
        ],
      },
      {
        id: 'services-section',
        label: 'الخدمات',
        icon: 'services',
        children: [
          navigationItems.consulting,
          navigationItems.subscription,
          navigationItems.meetingRoom,
        ],
      },
      {
        id: 'about-section',
        label: 'عن المنصة',
        icon: 'info',
        children: [
          navigationItems.about,
          navigationItems.community,
        ],
      },
      {
        id: 'support-section',
        label: 'الدعم والمساعدة',
        icon: 'support',
        children: [
          navigationItems.faq,
          navigationItems.contact,
          navigationItems.support,
        ],
      },
    ],
  },
];

// الحصول على روابط الـ Sidebar للمستخدمين المسجلين
export const getSidebarItems = (userRole = 'student', hasSubscription = false) => {
  const userNav = getNavigationForUser(userRole, true, hasSubscription);
  return userNav.map((section) => ({
    category: section.id,
    title: section.title,
    items: section.items.map((item) => ({
      name: item.label,
      href: item.href,
      icon: item.icon,
      badge: item.badge,
    })),
  }));
};

// روابط الملاحة السفلية للهواتف المحمولة - مُبسّطة ومُركّزة
export const getBottomNavigationItems = (
  userRole?: string,
  isAuthenticated = false
) => {
  const role = isAuthenticated ? userRole || 'student' : 'public';

  // تبسيط العناصر للتركيز على الأساسيات فقط
  const flows: Record<string, string[]> = {
    public: ['home', 'courses', 'community', 'contact'],
    student: ['home', 'courses', 'student-dashboard', 'certificates'],
    admin: ['home', 'admin-dashboard', 'admin-courses', 'admin-users'],
  };

  const flowIds = flows[role] || flows.public;

  return flowIds
    .map((id) => navigationItems[id])
    .filter((item): item is NavigationItem => Boolean(item))
    .filter(
      (item) =>
        (!item.requiresAuth || isAuthenticated) &&
        (!item.roles || item.roles.includes(role as any))
    );
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
  if (pathname.startsWith('/internal-audit')) {
    breadcrumbs.push({ label: 'الكورسات', href: '/courses' });
    breadcrumbs.push({ label: 'المراجعة الداخلية', href: '/internal-audit' });
  } else if (pathname.startsWith('/auditors-fellowship')) {
    breadcrumbs.push({
      label: 'زمالة CIA',
      href: '/cia',
    });
    breadcrumbs.push({
      label: 'زمالة المراجعين الداخليين',
      href: '/auditors-fellowship',
    });
  } else if (pathname.startsWith('/cia')) {
    breadcrumbs.push({
      label: 'زمالة CIA',
      href: '/cia',
    });
    // إضافة مسارات فرعية لزمالة CIA
    if (pathname.startsWith('/cia/exams')) {
      breadcrumbs.push({ label: 'الاختبارات', href: '/cia/exams' });
    }
  } else if (pathname.startsWith('/courses')) {
    breadcrumbs.push({ label: 'الكورسات', href: '/courses' });
    // مسارات فرعية للكورسات
    if (pathname.startsWith('/courses/financial')) {
      breadcrumbs.push({ label: 'المحاسبة المالية', href: '/courses/financial' });
    } else if (pathname.startsWith('/courses/ai-audit')) {
      breadcrumbs.push({ label: 'المراجعة بالذكاء الاصطناعي', href: '/courses/ai-audit' });
    } else if (pathname.startsWith('/courses/basics')) {
      breadcrumbs.push({ label: 'أساسيات المحاسبة', href: '/courses/basics' });
    } else if (pathname.startsWith('/courses/cia-preparation')) {
      breadcrumbs.push({ label: 'تحضير شهادة CIA', href: '/courses/cia-preparation' });
    } else if (pathname.startsWith('/courses/compliance')) {
      breadcrumbs.push({ label: 'الامتثال والالتزام', href: '/courses/compliance' });
    } else if (pathname.startsWith('/courses/digital-audit')) {
      breadcrumbs.push({ label: 'المراجعة الرقمية', href: '/courses/digital-audit' });
    } else if (pathname.startsWith('/courses/financial-projects')) {
      breadcrumbs.push({ label: 'المشاريع المالية', href: '/courses/financial-projects' });
    } else if (pathname.startsWith('/courses/risk-analysis')) {
      breadcrumbs.push({ label: 'تحليل المخاطر', href: '/courses/risk-analysis' });
    }
  } else if (pathname.startsWith('/browse-courses')) {
    breadcrumbs.push({ label: 'الكورسات', href: '/courses' });
  } else if (pathname.startsWith('/packages-and-consulting')) {
    breadcrumbs.push({ label: 'الباقات والاستشارات', href: '/packages-and-consulting' });
    const tab = pathname.includes('tab=packages') || pathname.includes('tab=consulting')
      ? new URLSearchParams(pathname.split('?')[1] || '').get('tab')
      : null;
    if (tab === 'packages') {
      breadcrumbs.push({ label: 'الباقات', href: '/packages-and-consulting?tab=packages' });
    } else if (tab === 'consulting') {
      breadcrumbs.push({ label: 'الاستشارات', href: '/packages-and-consulting?tab=consulting' });
    }
  } else if (pathname.startsWith('/packages')) {
    breadcrumbs.push({ label: 'الباقات والاستشارات', href: '/packages-and-consulting?tab=packages' });
  } else if (pathname.startsWith('/consulting')) {
    if (pathname === '/consulting' || pathname === '/consulting/') {
      breadcrumbs.push({ label: 'الباقات والاستشارات', href: '/packages-and-consulting' });
      breadcrumbs.push({ label: 'الاستشارات', href: '/packages-and-consulting?tab=consulting' });
    } else {
      breadcrumbs.push({ label: 'الباقات والاستشارات', href: '/packages-and-consulting' });
      breadcrumbs.push({ label: 'الاستشارات', href: '/packages-and-consulting?tab=consulting' });
    }
    if (pathname.startsWith('/consulting/group')) {
      breadcrumbs.push({ label: 'الجلسات الجماعية', href: '/consulting/group' });
    } else if (pathname.startsWith('/consulting/individual')) {
      breadcrumbs.push({ label: 'الجلسات الفردية', href: '/consulting/individual' });
    }
  } else if (pathname.startsWith('/resources')) {
    breadcrumbs.push({ label: 'المكتبة', href: '/resources' });
    if (pathname.startsWith('/resources/books')) {
      breadcrumbs.push({ label: 'الكتب الإلكترونية', href: '/resources/books' });
    } else if (pathname.startsWith('/resources/course-files')) {
      breadcrumbs.push({ label: 'ملفات الكورسات', href: '/resources/course-files' });
    } else if (pathname.startsWith('/resources/tools')) {
      breadcrumbs.push({ label: 'الأدوات', href: '/resources/tools' });
    }
  } else if (pathname.startsWith('/community')) {
    breadcrumbs.push({ label: 'المجتمع التعليمي', href: '/community' });
  } else if (
    pathname.startsWith('/student') ||
    pathname.startsWith('/certificates')
  ) {
    breadcrumbs.push({ label: 'لوحة التحكم', href: '/student' });
    if (pathname.startsWith('/student/exam')) {
      breadcrumbs.push({ label: 'الامتحانات', href: '/student/exam' });
    }
  } else if (pathname.startsWith('/admin/dashboard')) {
    breadcrumbs.push({ label: 'لوحة الإدارة', href: '/admin/dashboard' });
  } else if (pathname.startsWith('/admin/reports')) {
    breadcrumbs.push({ label: 'لوحة الإدارة', href: '/admin/dashboard' });
    breadcrumbs.push({ label: 'تقارير الإدارة', href: '/admin/reports' });
  } else if (pathname.startsWith('/blog')) {
    breadcrumbs.push({ label: 'المدونة', href: '/blog' });
  } else if (pathname.startsWith('/services')) {
    breadcrumbs.push({ label: 'الباقات والاستشارات', href: '/packages-and-consulting' });
  } else if (pathname.startsWith('/files')) {
    breadcrumbs.push({ label: 'ملفاتي', href: '/files' });
  } else if (pathname.startsWith('/financial-management')) {
    breadcrumbs.push({
      label: 'برامج الإدارة المالية',
      href: '/financial-management',
    });
  } else if (pathname.startsWith('/finance-basics')) {
    breadcrumbs.push({
      label: 'أساسيات المالية والمحاسبة',
      href: '/finance-basics',
    });
  } else if (pathname.startsWith('/procurement-management')) {
    breadcrumbs.push({
      label: 'إدارة المشتريات والتوريدات',
      href: '/procurement-management',
    });
  } else if (pathname.startsWith('/warehouse-management')) {
    breadcrumbs.push({
      label: 'إدارة المخازن والمستودعات',
      href: '/warehouse-management',
    });
  } else if (pathname.startsWith('/financial-reporting')) {
    breadcrumbs.push({
      label: 'التقارير المالية والمحاسبية',
      href: '/financial-reporting',
    });
  } else if (pathname.startsWith('/inventory-reconciliations')) {
    breadcrumbs.push({
      label: 'التسويات الجردية والرقابة',
      href: '/inventory-reconciliations',
    });
  } else if (pathname.startsWith('/restaurant-management')) {
    breadcrumbs.push({
      label: 'إدارة وتشغيل المطاعم',
      href: '/restaurant-management',
    });
  } else if (pathname.startsWith('/question-bank')) {
    breadcrumbs.push({ label: 'زمالة CIA', href: '/cia' });
    breadcrumbs.push({ label: 'بنك الأسئلة التفاعلي', href: '/question-bank' });
  } else if (pathname.startsWith('/review')) {
    breadcrumbs.push({ label: 'بنك الأسئلة التفاعلي', href: '/review' });
  } else if (pathname.startsWith('/advanced-features')) {
    breadcrumbs.push({ label: 'الميزات المتقدمة', href: '/advanced-features' });
  } else if (pathname.startsWith('/ai-tools')) {
    breadcrumbs.push({ label: 'الميزات المتقدمة', href: '/ai-tools' });
  } else if (pathname.startsWith('/onboarding-demo')) {
    breadcrumbs.push({ label: 'عرض توضيحي للبدء', href: '/onboarding-demo' });
  } else if (pathname.startsWith('/meeting-room')) {
    breadcrumbs.push({ label: 'غرفة الاجتماعات', href: '/meeting-room' });
  } else if (pathname.startsWith('/learning-hub')) {
    breadcrumbs.push({ label: 'مركز التعلم', href: '/learning-hub' });
  } else if (pathname.startsWith('/workshops')) {
    breadcrumbs.push({ label: 'ورش العمل', href: '/workshops' });
  } else if (pathname.startsWith('/about')) {
    breadcrumbs.push({ label: 'من نحن', href: '/about' });
  } else if (pathname.startsWith('/refund-policy')) {
    breadcrumbs.push({ label: 'سياسة الاسترداد', href: '/refund-policy' });
  } else if (pathname.startsWith('/usage-policy')) {
    breadcrumbs.push({ label: 'سياسة الاستخدام', href: '/usage-policy' });
  } else if (pathname.startsWith('/student/course-files')) {
    breadcrumbs.push({ label: 'لوحة التحكم', href: '/student' });
    breadcrumbs.push({ label: 'ملفات الدورات', href: '/student/course-files' });
  } else if (pathname.startsWith('/student/accounting-simulation')) {
    breadcrumbs.push({ label: 'لوحة التحكم', href: '/student' });
    breadcrumbs.push({ label: 'محاكاة المحاسبة', href: '/student/accounting-simulation' });
  } else if (pathname.startsWith('/student/storage-calculator')) {
    breadcrumbs.push({ label: 'لوحة التحكم', href: '/student' });
    breadcrumbs.push({ label: 'حاسبة التخزين', href: '/student/storage-calculator' });
  } else if (pathname.startsWith('/student/gallery')) {
    breadcrumbs.push({ label: 'لوحة التحكم', href: '/student' });
    breadcrumbs.push({ label: 'معرض الصور', href: '/student/gallery' });
  }

  return breadcrumbs;
};

// روابط ذات أولوية عالية للوصول السريع
export const getQuickAccessLinks = (
  userRole?: string,
  isAuthenticated = false
) => {
  const quickLinks: NavigationItem[] = [];

  if (isAuthenticated) {
    if (userRole === 'student') {
      quickLinks.push(
        navigationItems.studentDashboard,
        navigationItems.files,
        navigationItems.courseFiles,
        navigationItems.certificates,
        navigationItems.studentExam,
        navigationItems.meetingRoom,
        navigationItems.resourceCourseFiles,
        navigationItems.learningHub,
        navigationItems.questionBank,
        navigationItems.accountingSimulation
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
      navigationItems.learningHub,
      navigationItems.questionBank,
      navigationItems.workshops,
      navigationItems.subscription
    );
  }

  return quickLinks;
};
