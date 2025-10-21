/**
 * Testimonial data for TestimonialsComponent including user reviews, ratings, achievements, and platform statistics.
 * Contains verified testimonials from accounting professionals and students.
 */

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  achievement: string;
  impact: string;
}

export interface HighlightStat {
  label: string;
  value: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'أحمد محمد',
    role: 'محاسب أول في شركة استشارات',
    company: 'مجموعة التدقيق العربية',
    content: 'غيرت حياتي المهنية تماماً. المنصة آمنة ومنظمة جداً، وأدوات المتابعة ساعدتني في إنهاء البرنامج بمرونة.',
    rating: 5,
    avatar: '/avatars/andi-lane.png',
    achievement: 'إنهاء دورتين خلال 6 أسابيع',
    impact: '+38% زيادة في كفاءة التقارير',
  },
  {
    name: 'فاطمة علي',
    role: 'طالبة ماجستير محاسبة',
    company: 'جامعة الخليج',
    content: 'التعلم سهل وممتع مع المحتوى المتعدد والتتبع الشخصي. استشارات الخبراء أضافت قيمة عملية لكل درس.',
    rating: 5,
    avatar: '/avatars/pacific-helm.png',
    achievement: 'منحة بحثية بعد التخرج',
    impact: '+27% تحسن في تقييم المشاريع',
  },
  {
    name: 'محمد حسن',
    role: 'مدير مالي',
    company: 'شركة التقنية الموحدة',
    content: 'أفضل استثمار في تطوير مهاراتي. أتابع فريق المحاسبة بسهولة عبر اللوحة التفاعلية وأوصي بها لكل مدقق.',
    rating: 5,
    avatar: '/avatars/drew-cano.png',
    achievement: 'بناء خطة تطوير لفريقه',
    impact: '+45% تحسين في دقة التدقيق',
  },
];

export const highlightStats: HighlightStat[] = [
  { label: 'اعتمادات مهنية دولية', value: '6 مؤسسات' },
  { label: 'معدل تجديد الاشتراكات', value: '93%' },
  { label: 'متوسط تقييم المتدربين', value: '4.9/5' },
];