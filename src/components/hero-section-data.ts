/**
 * Static data for HeroSection component including feature highlights and platform statistics.
 * Centralizes content for easier maintenance and localization.
 */

interface HeroFeature {
  icon: 'learning' | 'certificates' | 'community';
  title: string;
  description: string;
  color: string;
  delay: number;
}

interface HeroStat {
  number: string;
  label: string;
  icon: string;
  trend: string;
}

export const heroFeatures: HeroFeature[] = [
  {
    icon: 'learning',
    title: 'تعلم متقدم',
    description: 'محتوى تعليمي عالي الجودة مع تقنيات الذكاء الاصطناعي',
    color: 'from-blue-500 to-cyan-500',
    delay: 0.1,
  },
  {
    icon: 'certificates',
    title: 'شهادات معتمدة',
    description: 'احصل على شهادات مهنية معترف بها دولياً',
    color: 'from-green-500 to-emerald-500',
    delay: 0.2,
  },
  {
    icon: 'community',
    title: 'مجتمع نشط',
    description: 'تفاعل مع خبراء ومتعلمين آخرين من حول العالم',
    color: 'from-purple-500 to-pink-500',
    delay: 0.3,
  },
];

export const heroStats: HeroStat[] = [
  { number: '10,000+', label: 'طالب نشط', icon: '👥', trend: '+15%' },
  { number: '500+', label: 'ساعة محتوى', icon: '📚', trend: '+8%' },
  { number: '50+', label: 'دورة متخصصة', icon: '🎓', trend: '+12%' },
  { number: '95%', label: 'معدل الرضا', icon: '⭐', trend: '+3%' },
];