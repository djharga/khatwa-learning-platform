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
    description: 'مسار متكامل لتعلم أساسيات المراجعة الداخلية',
    matchPercentage: 85,
    recommendedFor: ['اهتماماتك السابقة', 'المجتمع التعليمي']
  }
];

export const challenges: Challenge[] = [
  {
    id: 1,
    title: 'تحدي المراجعة الداخلية',
    description: 'أجب على 10 أسئلة في مجال المراجعة الداخلية واحصل على شارة التحدي',
    progress: 65,
    participants: 120,
  },
  {
    id: 2,
    title: 'تحدي المحاسبة المتقدمة',
    description: 'حل 5 دراسات حالة في المحاسبة المتقدمة',
    progress: 30,
    participants: 85,
  },
  {
    id: 3,
    title: 'تحدي التحليل المالي',
    description: 'انجز مشروع تحليل مالي كامل خلال أسبوع',
    progress: 15,
    participants: 42,
  },
];

export const communityStats: CommunityStat[] = [
  { icon: 'users', label: 'الأعضاء النشطين', value: '5,200+' },
  { icon: 'message-square', label: 'المناقشات الشهرية', value: '1,850+' },
  { icon: 'award', label: 'التحديات المكتملة', value: '320' },
  { icon: 'trending-up', label: 'نمو المجتمع', value: '+24%' },
];

export const discussionPosts: DiscussionPost[] = [
  {
    id: 1,
    title: 'كيفية تحسين مهارات المراجعة الداخلية',
    author: 'أحمد محمد',
    date: 'منذ ساعتين',
    content: 'أبحث عن نصائح لتحسين مهاراتي في المراجعة الداخلية. ما هي أفضل الطرق للحصول على شهادات متقدمة في هذا المجال؟',
    votes: 24,
    comments: 8,
    tags: ['#المراجعة_الداخلية', '#التطوير_المهني'],
  },
  {
    id: 2,
    title: 'أفضل أدوات التحليل المالي',
    author: 'سارة عبدالله',
    date: 'منذ يوم',
    content: 'ما هي الأدوات التي تنصحون بها للتحليل المالي المتقدم؟ هل هناك أدوات مجانية يمكن الاعتماد عليها؟',
    votes: 18,
    comments: 12,
    tags: ['#التحليل_المالي', '#أدوات'],
  },
  {
    id: 3,
    title: 'تجربتي مع دورة الإدارة المالية',
    author: 'خالد سعيد',
    date: 'منذ 3 أيام',
    content: 'شارك تجربتي مع دورة الإدارة المالية وكيف ساعدتني في الحصول على ترقية في عملي.',
    votes: 42,
    comments: 15,
    tags: ['#تجارب', '#الإدارة_المالية'],
  },
];