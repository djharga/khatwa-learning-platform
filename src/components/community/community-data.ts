"use client";

/**
 * Centralized data for community components including recommended paths, challenges, statistics, and discussion posts
 */

export interface RecommendedPath {
  id: string;
  title: string;
  description: string;
  matchPercentage: number;
  recommendedFor: string[];
}

export interface Challenge {
  id: number;
  title: string;
  description: string;
  progress: number;
  participants: number;
}

export interface CommunityStat {
  icon: string;
  label: string;
  value: string;
}

export interface DiscussionPost {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  votes: number;
  comments: number;
  tags: string[];
}

export const recommendedPaths: RecommendedPath[] = [
  {
    id: '101',
    title: 'مسار المراجعة الداخلية',
    description: 'مسار متكامل لتعلم أساسيات المراجعة الداخلية واحتراف المعايير الدولية',
    matchPercentage: 92,
    recommendedFor: ['اهتماماتك السابقة', 'المجتمع التعليمي']
  },
  {
    id: '102',
    title: 'مسار المحاسب المالي المحترف',
    description: 'تعلم المحاسبة المالية من الأساسيات حتى الاحتراف',
    matchPercentage: 88,
    recommendedFor: ['الأكثر شعبية', 'المبتدئين']
  },
  {
    id: '103',
    title: 'مسار التحليل المالي المتقدم',
    description: 'إتقان أدوات وتقنيات التحليل المالي الحديثة',
    matchPercentage: 85,
    recommendedFor: ['المستوى المتقدم', 'التطوير المهني']
  }
];

export const challenges: Challenge[] = [
  {
    id: 1,
    title: 'تحدي المراجعة الداخلية - نوفمبر 2025',
    description: 'أجب على 10 أسئلة في مجال المراجعة الداخلية واحصل على شارة التحدي الذهبية',
    progress: 65,
    participants: 847,
  },
  {
    id: 2,
    title: 'تحدي المحاسبة المتقدمة',
    description: 'حل 5 دراسات حالة واقعية في المحاسبة المتقدمة وشارك الحلول مع المجتمع',
    progress: 42,
    participants: 623,
  },
  {
    id: 3,
    title: 'تحدي التحليل المالي الشهري',
    description: 'انجز مشروع تحليل مالي كامل لشركة واقعية وقدم تقريرك خلال أسبوعين',
    progress: 28,
    participants: 492,
  },
  {
    id: 4,
    title: 'تحدي الإكسل للمحاسبين',
    description: 'أتقن 15 معادلة متقدمة في Excel خاصة بالتحليل المالي والمحاسبي',
    progress: 73,
    participants: 1205,
  },
  {
    id: 5,
    title: 'تحدي التقارير المالية',
    description: 'إعداد مجموعة كاملة من التقارير المالية لشركة افتراضية',
    progress: 35,
    participants: 568,
  },
];

export const communityStats: CommunityStat[] = [
  { icon: 'users', label: 'الأعضاء النشطين', value: '12,847+' },
  { icon: 'message-square', label: 'المناقشات الشهرية', value: '3,420+' },
  { icon: 'award', label: 'التحديات المكتملة', value: '1,586' },
  { icon: 'trending-up', label: 'نمو المجتمع', value: '+38%' },
];

export const discussionPosts: DiscussionPost[] = [
  {
    id: 1,
    title: 'كيفية الاستعداد لاختبار CIA (المراجع الداخلي المعتمد)',
    author: 'أحمد محمد الشريف',
    date: 'منذ ساعتين',
    content: 'السلام عليكم، أخطط لاختبار شهادة CIA الجزء الأول خلال 3 أشهر. هل من نصائح عملية للمذاكرة والاستعداد؟ وما هي أفضل المصادر التعليمية باللغة العربية؟',
    votes: 47,
    comments: 23,
    tags: ['#المراجعة_الداخلية', '#CIA', '#الشهادات_المهنية'],
  },
  {
    id: 2,
    title: 'أفضل أدوات التحليل المالي للمحاسبين في 2025',
    author: 'سارة عبدالله القحطاني',
    date: 'منذ 5 ساعات',
    content: 'بعد تجربتي لعدة أدوات، أنصح بـ Power BI للتحليل المرئي و Excel Power Query للبيانات الضخمة. ما هي الأدوات المفضلة لديكم؟ خاصة للتقارير الديناميكية؟',
    votes: 62,
    comments: 31,
    tags: ['#التحليل_المالي', '#أدوات', '#PowerBI', '#Excel'],
  },
  {
    id: 3,
    title: 'قصة نجاح: من محاسب مبتدئ إلى مدير مالي في 4 سنوات',
    author: 'خالد سعيد النعيمي',
    date: 'منذ يوم',
    content: 'أحب أن أشارك تجربتي مع منصة خطى. بدأت كمحاسب مبتدئ براتب متواضع، والآن أصبحت مديراً مالياً. الدورات والشهادات التي حصلت عليها كانت المفتاح، خاصة دورة التحليل المالي المتقدم.',
    votes: 156,
    comments: 48,
    tags: ['#قصص_نجاح', '#تطوير_مهني', '#تحفيز'],
  },
  {
    id: 4,
    title: 'مناقشة: الفرق بين IFRS و GAAP في معالجة الإيرادات',
    author: 'د. فاطمة الزهراني',
    date: 'منذ يومين',
    content: 'نقاش مهم للمحاسبين: ما هي الفروقات الجوهرية بين المعيارين في الاعتراف بالإيرادات؟ خاصة مع التطبيق الجديد لمعيار IFRS 15. من لديه خبرة عملية في هذا المجال؟',
    votes: 89,
    comments: 42,
    tags: ['#IFRS', '#GAAP', '#معايير_محاسبية', '#إيرادات'],
  },
  {
    id: 5,
    title: 'كيف تتعامل مع الضغط في فترة إقفال السنة المالية؟',
    author: 'محمد الحربي',
    date: 'منذ يومين',
    content: 'فترة إقفال السنة دائماً مرهقة. ما هي استراتيجياتكم للتعامل مع الضغط وإنهاء المهام في الوقت المحدد؟ شاركونا تجاربكم ونصائحكم.',
    votes: 73,
    comments: 37,
    tags: ['#إقفال_السنة', '#إدارة_الوقت', '#نصائح'],
  },
  {
    id: 6,
    title: 'سؤال: كيف أحسب تكلفة المخزون بطريقة FIFO في Excel؟',
    author: 'نورة الدوسري',
    date: 'منذ 3 أيام',
    content: 'أواجه صعوبة في إعداد معادلة Excel لحساب تكلفة المخزون بطريقة FIFO تلقائياً. هل يمكن لأحد مشاركة ملف نموذجي أو شرح الطريقة؟',
    votes: 54,
    comments: 28,
    tags: ['#المخزون', '#Excel', '#FIFO', '#محاسبة_تكاليف'],
  },
  {
    id: 7,
    title: 'تقييم دورة "التحليل المالي وإعداد الموازنات"',
    author: 'عبدالرحمن السالم',
    date: 'منذ 3 أيام',
    content: 'أنهيت للتو دورة التحليل المالي والموازنات على المنصة. صراحة، المحتوى ممتاز جداً والأمثلة العملية مفيدة. أنصح بها بشدة لكل من يريد احتراف الموازنات التقديرية.',
    votes: 91,
    comments: 19,
    tags: ['#تقييم_دورة', '#التحليل_المالي', '#موازنات'],
  },
  {
    id: 8,
    title: 'نقاش: هل الشهادات المهنية ضرورية حقاً للتقدم الوظيفي؟',
    author: 'ريم المطيري',
    date: 'منذ 4 أيام',
    content: 'هناك جدل دائم حول أهمية الشهادات المهنية مثل CPA و CMA. البعض يرى أن الخبرة العملية أهم. ما رأيكم من واقع تجربتكم؟',
    votes: 124,
    comments: 67,
    tags: ['#شهادات_مهنية', '#تطوير_وظيفي', '#نقاش'],
  },
  {
    id: 9,
    title: 'مشاركة: ملف Excel شامل لإعداد القوائم المالية',
    author: 'إبراهيم الخالدي',
    date: 'منذ 5 أيام',
    content: 'قمت بإعداد ملف Excel متكامل لإعداد القوائم المالية الأربعة مع الربط التلقائي. يمكنني مشاركته مع الأعضاء. هل هناك اهتمام؟',
    votes: 203,
    comments: 85,
    tags: ['#Excel', '#قوائم_مالية', '#موارد_مجانية'],
  },
  {
    id: 10,
    title: 'كيف أبدأ في مجال المراجعة؟ توجيه للمبتدئين',
    author: 'منى الشمري',
    date: 'منذ أسبوع',
    content: 'تخرجت حديثاً وأريد التخصص في المراجعة. ما هي الخطوات الصحيحة للبداية؟ هل أبدأ بشركة مراجعة صغيرة أم كبيرة؟ وما الدورات المهمة؟',
    votes: 68,
    comments: 34,
    tags: ['#مبتدئين', '#المراجعة', '#توجيه_مهني'],
  },
];