/**
 * نظام النقاط والشارات التحفيزية
 * يدير نقاط المستخدم، الشارات، والمستويات
 */

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  category: 'course' | 'exam' | 'certificate' | 'streak' | 'achievement' | 'community';
  unlockedAt?: Date;
}

export interface UserPoints {
  totalPoints: number;
  level: number;
  currentLevelPoints: number;
  nextLevelPoints: number;
  badges: Badge[];
  streak: number;
  lastActivityDate: Date;
}

export interface PointsTransaction {
  id: string;
  userId: string;
  points: number;
  reason: string;
  category: string;
  timestamp: Date;
  relatedId?: string; // courseId, examId, etc.
}

/**
 * حساب نقاط المستوى التالي
 */
const POINTS_PER_LEVEL = 1000;

export function calculateLevel(points: number): number {
  return Math.floor(points / POINTS_PER_LEVEL) + 1;
}

export function getCurrentLevelPoints(points: number): number {
  const level = calculateLevel(points);
  return points - ((level - 1) * POINTS_PER_LEVEL);
}

export function getNextLevelPoints(points: number): number {
  const level = calculateLevel(points);
  return level * POINTS_PER_LEVEL;
}

/**
 * نقاط لكل إنجاز
 */
export const POINTS_REWARDS = {
  // الدورات
  COURSE_COMPLETED: 500,
  COURSE_PERFECT_SCORE: 100,
  COURSE_FIRST_COMPLETE: 200,
  
  // الاختبارات
  EXAM_PASSED: 100,
  EXAM_PERFECT_SCORE: 150,
  EXAM_IMPROVED: 50,
  
  // الشهادات
  CERTIFICATE_EARNED: 300,
  CERTIFICATE_EXCELLENCE: 200,
  CERTIFICATE_GOLD: 150,
  
  // السلاسل والإنجازات
  STREAK_DAILY: 10,
  STREAK_WEEKLY: 100,
  STREAK_MONTHLY: 500,
  STREAK_MILESTONE: 1000,
  
  // المجتمع
  COMMUNITY_QUESTION: 20,
  COMMUNITY_ANSWER: 30,
  COMMUNITY_BEST_ANSWER: 50,
  
  // إنجازات خاصة
  FIRST_COURSE: 200,
  COURSE_MASTER: 500,
  EXAM_MASTER: 500,
  CERTIFICATE_COLLECTOR: 1000,
};

/**
 * الشارات المتاحة
 */
export const AVAILABLE_BADGES: Badge[] = [
  {
    id: 'first-step',
    title: 'أول خطوة',
    description: 'إكمال أول دورة تدريبية',
    icon: '🎯',
    rarity: 'common',
    points: POINTS_REWARDS.FIRST_COURSE,
    category: 'course',
  },
  {
    id: 'course-master',
    title: 'سيد الدورات',
    description: 'إكمال 10 دورات',
    icon: '👑',
    rarity: 'epic',
    points: POINTS_REWARDS.COURSE_MASTER,
    category: 'course',
  },
  {
    id: 'perfect-score',
    title: 'المثالي',
    description: 'الحصول على 100% في اختبار',
    icon: '⭐',
    rarity: 'rare',
    points: POINTS_REWARDS.EXAM_PERFECT_SCORE,
    category: 'exam',
  },
  {
    id: 'exam-master',
    title: 'سيد الاختبارات',
    description: 'اجتياز 20 اختبار بنجاح',
    icon: '🏆',
    rarity: 'epic',
    points: POINTS_REWARDS.EXAM_MASTER,
    category: 'exam',
  },
  {
    id: 'certificate-collector',
    title: 'جامع الشهادات',
    description: 'الحصول على 10 شهادات',
    icon: '🎖️',
    rarity: 'legendary',
    points: POINTS_REWARDS.CERTIFICATE_COLLECTOR,
    category: 'certificate',
  },
  {
    id: 'streak-7',
    title: 'نار متقدة',
    description: '7 أيام متتالية من الدراسة',
    icon: '🔥',
    rarity: 'rare',
    points: POINTS_REWARDS.STREAK_WEEKLY,
    category: 'streak',
  },
  {
    id: 'streak-30',
    title: 'أسطورة الاستمرارية',
    description: '30 يوم متتالي من الدراسة',
    icon: '💎',
    rarity: 'legendary',
    points: POINTS_REWARDS.STREAK_MILESTONE,
    category: 'streak',
  },
  {
    id: 'helper',
    title: 'المساعد',
    description: 'مساعدة 10 طلاب في المجتمع',
    icon: '🤝',
    rarity: 'rare',
    points: 300,
    category: 'community',
  },
];

/**
 * حساب النقاط بعد إنجاز
 */
export function calculatePointsEarned(
  action: keyof typeof POINTS_REWARDS,
  bonusMultiplier = 1
): number {
  const basePoints = POINTS_REWARDS[action] || 0;
  return Math.floor(basePoints * bonusMultiplier);
}

/**
 * التحقق من شروط الحصول على شارة
 */
export function checkBadgeEligibility(
  badgeId: string,
  userStats: {
    coursesCompleted?: number;
    examsPassed?: number;
    certificatesEarned?: number;
    streak?: number;
    perfectScores?: number;
    communityAnswers?: number;
  }
): boolean {
  const badge = AVAILABLE_BADGES.find(b => b.id === badgeId);
  if (!badge) return false;

  switch (badgeId) {
    case 'first-step':
      return (userStats.coursesCompleted || 0) >= 1;
    case 'course-master':
      return (userStats.coursesCompleted || 0) >= 10;
    case 'perfect-score':
      return (userStats.perfectScores || 0) >= 1;
    case 'exam-master':
      return (userStats.examsPassed || 0) >= 20;
    case 'certificate-collector':
      return (userStats.certificatesEarned || 0) >= 10;
    case 'streak-7':
      return (userStats.streak || 0) >= 7;
    case 'streak-30':
      return (userStats.streak || 0) >= 30;
    case 'helper':
      return (userStats.communityAnswers || 0) >= 10;
    default:
      return false;
  }
}

/**
 * تحديث نقاط المستخدم
 */
export function updateUserPoints(
  currentPoints: UserPoints,
  pointsToAdd: number,
  reason: string,
  category: string
): UserPoints {
  const newTotalPoints = currentPoints.totalPoints + pointsToAdd;
  const newLevel = calculateLevel(newTotalPoints);
  
  // التحقق من شارات جديدة
  const newBadges = AVAILABLE_BADGES.filter(badge => {
    // إذا كانت الشارة موجودة بالفعل، تجاهلها
    if (currentPoints.badges.some(b => b.id === badge.id)) {
      return false;
    }
    
    // التحقق من الأهلية (سيحتاج إحصائيات المستخدم)
    // هذا مثال بسيط - في التطبيق الحقيقي، نحتاج بيانات أكثر
    return false; // سيتم تحديثه بناءً على إحصائيات المستخدم
  });

  return {
    ...currentPoints,
    totalPoints: newTotalPoints,
    level: newLevel,
    currentLevelPoints: getCurrentLevelPoints(newTotalPoints),
    nextLevelPoints: getNextLevelPoints(newTotalPoints),
    badges: [...currentPoints.badges, ...newBadges],
  };
}

/**
 * تحديث سلسلة الدراسة
 */
export function updateStreak(currentStreak: number, lastActivityDate: Date): number {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // إذا كان آخر نشاط أمس، استمر السلسلة
  if (
    lastActivityDate.getDate() === yesterday.getDate() &&
    lastActivityDate.getMonth() === yesterday.getMonth() &&
    lastActivityDate.getFullYear() === yesterday.getFullYear()
  ) {
    return currentStreak + 1;
  }
  
  // إذا كان آخر نشاط اليوم، لا تغير
  if (
    lastActivityDate.getDate() === today.getDate() &&
    lastActivityDate.getMonth() === today.getMonth() &&
    lastActivityDate.getFullYear() === today.getFullYear()
  ) {
    return currentStreak;
  }

  // إذا كان آخر نشاط قبل أمس، ابدأ سلسلة جديدة
  return 1;
}

