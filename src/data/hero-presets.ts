import type { UnifiedHeroSectionProps } from '@/components/ui/UnifiedHeroSection';
import { ROUTES } from '@/lib/routes';

export type HeroPresetKey =
  | 'home'
  | 'courses'
  | 'reports'
  | 'community'
  | 'files'
  | 'support'
  | 'paths'
  | 'dashboard';

type HeroPreset = Pick<
  UnifiedHeroSectionProps,
  | 'variant'
  | 'layout'
  | 'eyebrow'
  | 'subtitle'
  | 'title'
  | 'description'
  | 'primaryAction'
  | 'secondaryAction'
  | 'stats'
  | 'visual'
  | 'particles'
  | 'patternIntensity'
  | 'backgroundMode'
  | 'backgroundImage'
  | 'enableAnimation'
  | 'typingEffect'
  | 'typingSpeed'
  | 'typingDelay'
  | 'typingLoop'
  | 'typingLoopDelay'
>;

export const heroPresets: Record<HeroPresetKey, HeroPreset> = {
  home: {
    variant: 'home',
    layout: 'split',
    eyebrow: 'منصة التعلم المهني العربية',
    subtitle: 'تعلم مهني معتمد بخطوات واضحة',
    title: 'خطى',
    description:
      'منصة تعليمية عربية تقدم برامج متخصصة، شهادات معتمدة، ومجتمع مهني يدعم تقدمك خطوة بخطوة.',
    primaryAction: { label: 'ابدأ التعلم', href: ROUTES.COURSES },
    visual: {
      imageSrc: '/assets/hero-main-banner.jpg',
      imageAlt: 'متدربون يعملون على مشاريع تعاونية',
    },
    backgroundImage: '/assets/hero-background.jpg',
    particles: true,
    patternIntensity: 'soft',
    enableAnimation: false,
    typingEffect: true,
    typingSpeed: 150,
    typingDelay: 500,
    typingLoop: true,
    typingLoopDelay: 3000,
  },
  courses: {
    variant: 'courses',
    layout: 'split',
    eyebrow: 'برامج متدرجة بالمحتوى التطبيقي',
    subtitle: 'مكتبة دورات معتمدة',
    title: 'اختر المسار الأنسب لمهنتك',
    description:
      'ابحث في مكتبة واسعة من الدورات المتخصصة، طبّق ما تتعلمه فوراً، واحصل على شهادات يمكن مشاركتها مع أصحاب العمل.',
    visual: {
      imageSrc: '/assets/course-hero.jpg',
      imageAlt: 'طلاب يتابعون دورة تفاعلية',
    },
    backgroundImage: '/assets/hero-background.jpg',
    particles: true,
    patternIntensity: 'soft',
    enableAnimation: false,
  },
  reports: {
    variant: 'reports',
    layout: 'centered',
    eyebrow: 'لوحة تقارير الطالب',
    subtitle: 'رؤية كاملة لكل أرقامك',
    title: 'حلّل تقدمك وتعرّف على فرص التحسين',
    description:
      'شاهد أداءك الأسبوعي، ساعات الدراسة، ومستوى الالتزام عبر لوحات تفاعلية يمكنك تصديرها أو مشاركتها.',
    primaryAction: { label: 'اذهب إلى تقاريري', href: ROUTES.STUDENT_REPORTS },
    secondaryAction: {
      label: 'صدّر ملف PDF',
      href: `${ROUTES.STUDENT_REPORTS}#export`,
      variant: 'secondary',
    },
    backgroundImage: '/assets/hero-background.jpg',
    particles: false,
    patternIntensity: 'soft',
    backgroundMode: 'light',
    enableAnimation: false,
  },
  community: {
    variant: 'community',
    layout: 'split',
    eyebrow: 'مجتمع المتعلمين والخبراء',
    subtitle: 'مناقشات وتحديات أسبوعية',
    title: 'شارك خبرتك وتعلّم من الآخرين',
    description:
      'انضم إلى محادثات مباشرة، اطلب المساعدة من الخبراء، وشارك تقدمك مع مجتمع عربي مهني نشط.',
    primaryAction: { label: 'ابدأ نقاشاً', href: `${ROUTES.COMMUNITY}#start` },
    secondaryAction: {
      label: 'اكتشف المواضيع',
      href: `${ROUTES.COMMUNITY}#discussion-board`,
      variant: 'ghost',
    },
    backgroundImage: '/assets/hero-background.jpg',
    particles: true,
    patternIntensity: 'soft',
    enableAnimation: false,
  },
  files: {
    variant: 'files',
    layout: 'split',
    eyebrow: 'مركز الملفات الذكي',
    subtitle: 'حفظ ومشاركة آمن',
    title: 'كل ملفاتك في مكان واحد',
    description:
      'إدارة كاملة للملفات، مشاركة آمنة مع الزملاء، ونسخ احتياطي تلقائي لكل محتواك التعليمي.',
    primaryAction: { label: 'افتح ملفاتي', href: ROUTES.FILES },
    secondaryAction: {
      label: 'مساحة التخزين',
      href: `${ROUTES.FILES}#usage`,
      variant: 'ghost',
    },
    backgroundImage: '/assets/hero-background.jpg',
    particles: false,
    patternIntensity: 'soft',
    backgroundMode: 'light',
    enableAnimation: false,
  },
  support: {
    variant: 'support',
    layout: 'split',
    eyebrow: 'مركز المساعدة والدعم الفني',
    subtitle: 'قنوات متعددة واستجابة سريعة',
    title: 'نرافقك في كل مرحلة من رحلتك',
    description:
      'أرسل تذكرة، احجز اتصالاً، أو ابحث مباشرة في قاعدة المعرفة. فريق الدعم متاح على مدار الساعة.',
    primaryAction: { label: 'تواصل مع الدعم', href: ROUTES.SUPPORT },
    secondaryAction: {
      label: 'قاعدة المعرفة',
      href: `${ROUTES.SUPPORT}#faq`,
      variant: 'secondary',
    },
    backgroundImage: '/assets/hero-background.jpg',
    particles: true,
    patternIntensity: 'soft',
    enableAnimation: false,
  },
  paths: {
    variant: 'paths',
    layout: 'split',
    eyebrow: 'مسارات تعلم منظمة',
    subtitle: 'تدرّج واضح من الأساسيات إلى الاحتراف',
    title: 'التزم بخطة تعلم مبنية على أهدافك',
    description:
      'مسارات تعلم جاهزة مع تقدير زمني، ملفات تطبيقية، وتقييمات لكل مرحلة من رحلتك المهنية.',
    backgroundImage: '/assets/hero-background.jpg',
    particles: true,
    patternIntensity: 'soft',
    enableAnimation: false,
  },
  dashboard: {
    variant: 'dashboard',
    layout: 'split',
    eyebrow: 'لوحة الطالب المتقدمة',
    subtitle: 'متابعة للأهداف اليومية والأسبوعية',
    title: 'ابدأ يومك بنظرة سريعة على تقدمك',
    description:
      'شاهد ساعات الدراسة، نسبة الإكمال، والتحديات القادمة مع توصيات ذكية للحفاظ على وتيرة التعلم.',
    primaryAction: { label: 'تابع التعلم الآن', href: ROUTES.STUDENT_DASH },
    secondaryAction: {
      label: 'جداول هذا الأسبوع',
      href: `${ROUTES.STUDENT_DASH}#schedule`,
      variant: 'ghost',
    },
    backgroundImage: '/assets/hero-background.jpg',
    particles: true,
    patternIntensity: 'soft',
    enableAnimation: false,
  },
};

export const heroSectionSpacing = 'mt-20 sm:mt-24 lg:mt-28';


