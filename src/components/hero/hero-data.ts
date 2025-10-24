import React from 'react';
import { Users, BookOpen, GraduationCap, Star } from 'lucide-react';

export interface HeroStat {
  readonly number: string;
  readonly label: string;
  readonly icon?: React.ComponentType;
  readonly trend?: string;
}

export interface HeroFeature {
  readonly icon: 'learning' | 'certificates' | 'community';
  readonly title: string;
  readonly description: string;
  readonly color: string;
  readonly delay: number;
}

export const heroHomeStats: ReadonlyArray<HeroStat> = [
  { number: '150+', label: 'دورة تعليمية' },
  { number: '50K+', label: 'طالب نشط' },
  { number: '95%', label: 'معدل النجاح' },
  { number: '24/7', label: 'دعم فني' },
];

export const heroHomeFeatures: ReadonlyArray<HeroFeature> = [
  {
    icon: 'learning',
    title: 'تعلّم متدرج',
    description: 'مسارات تعليمية تفاعلية تبدأ من الأساسيات وتصل إلى الاحتراف.',
    color: 'from-blue-500 to-indigo-500',
    delay: 0.1,
  },
  {
    icon: 'certificates',
    title: 'اعتمادات مهنية',
    description: 'شهادات معتمدة تدعم مسارك المهني وتزيد من فرص التوظيف.',
    color: 'from-green-500 to-emerald-500',
    delay: 0.2,
  },
  {
    icon: 'community',
    title: 'مجتمع داعم',
    description: 'تفاعل مع مجتمع المحترفين والمتعلمين وشارك خبراتك.',
    color: 'from-purple-500 to-pink-500',
    delay: 0.3,
  },
];

export const heroCatalogStats: ReadonlyArray<HeroStat> = [
  { number: '10,000+', label: 'طالب نشط', icon: Users, trend: '+15%' },
  { number: '500+', label: 'ساعة محتوى', icon: BookOpen, trend: '+8%' },
  { number: '50+', label: 'دورة متخصصة', icon: GraduationCap, trend: '+12%' },
  { number: '95%', label: 'معدل الرضا', icon: Star, trend: '+3%' },
];

export const heroCatalogFeatures: ReadonlyArray<HeroFeature> = [
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
