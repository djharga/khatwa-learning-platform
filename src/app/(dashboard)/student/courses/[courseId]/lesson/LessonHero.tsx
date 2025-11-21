'use client';

import { BookOpen, Award, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './lessons-page.module.css';

interface LessonHeroProps {
  courseTitle?: string;
  totalLessons?: number;
  totalModules?: number;
}

export default function LessonHero({
  courseTitle = 'برنامج المراجعين الداخليين',
  totalLessons = 0,
  totalModules = 0,
}: LessonHeroProps) {
  const router = useRouter();

  const handleBreadcrumbClick = () => {
    router.push('/courses');
  };

  return (
    <div className={styles.heroSection}>
      {/* Background Gradient */}
      <div className={styles.heroBackground}>
        <div className={styles.heroGradient} />
        <div className={styles.heroPattern} />
      </div>

      {/* Content */}
      <div className={styles.heroContent}>
        {/* Breadcrumb */}
        <div className={styles.heroBreadcrumb}>
          <button 
            className={styles.breadcrumbItem}
            onClick={handleBreadcrumbClick}
            aria-label="العودة إلى صفحة الدورات"
          >
            <ChevronLeft size={16} />
            <span>الدورات</span>
          </button>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbItem}>{courseTitle}</span>
        </div>

        {/* Title Section */}
        <div className={styles.heroTitleSection}>
          <div className={styles.heroBadge}>
            <BookOpen size={16} />
            <span>منصة التعلم</span>
          </div>
          <h1 className={styles.heroTitle}>{courseTitle}</h1>
          <p className={styles.heroDescription}>
            ابدأ رحلتك التعليمية واحصل على شهادة معتمدة في نهاية الدورة
          </p>
        </div>

        {/* Stats Section */}
        <div className={styles.heroStats}>
          <div className={styles.heroStat}>
            <div className={styles.heroStatIcon}>
              <BookOpen size={22} />
            </div>
            <div className={styles.heroStatContent}>
              <div className={styles.heroStatValue}>{totalLessons}</div>
              <div className={styles.heroStatLabel}>درس</div>
            </div>
          </div>

          <div className={styles.heroStat}>
            <div className={styles.heroStatIcon}>
              <Award size={22} />
            </div>
            <div className={styles.heroStatContent}>
              <div className={styles.heroStatValue}>{totalModules}</div>
              <div className={styles.heroStatLabel}>وحدة</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

