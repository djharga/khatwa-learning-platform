'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Target, BookOpen, CheckCircle2 } from 'lucide-react';
import { ResponsiveVideoPlayer } from '@/components/ui/ResponsiveVideoPlayer';
import LessonNotes from './LessonNotes';
import styles from './lessons-page.module.css';

interface Lesson {
  id: number;
  title: string;
  order: number;
  description?: string;
  objectives?: string[];
  videoUrl?: string;
}

interface Module {
  id: number;
  title: string;
  order: number;
  lessons: Lesson[];
}

interface LessonContentProps {
  lesson: Lesson | null;
  modules: Module[];
  onNavigateToLesson: (lessonId: number) => void;
}

export default function LessonContent({
  lesson,
  modules,
  onNavigateToLesson,
}: LessonContentProps) {
  const [progress, setProgress] = useState(0);

  // تحميل التقدم من localStorage
  useEffect(() => {
    if (lesson) {
      const storedProgress = localStorage.getItem(`lesson-progress-${lesson.id}`);
      if (storedProgress) {
        setProgress(parseFloat(storedProgress));
      } else {
        setProgress(0);
      }
    }
  }, [lesson]);

  // حفظ التقدم
  const handleProgressUpdate = (newProgress: number) => {
    if (lesson) {
      setProgress(newProgress);
      localStorage.setItem(`lesson-progress-${lesson.id}`, newProgress.toString());
    }
  };

  // الحصول على الدرس السابق والتالي
  const getAllLessons = () => {
    const allLessons: Array<{ lesson: Lesson; moduleId: number }> = [];
    modules.forEach((module) => {
      module.lessons.forEach((lesson) => {
        allLessons.push({ lesson, moduleId: module.id });
      });
    });
    return allLessons.sort((a, b) => {
      if (a.moduleId !== b.moduleId) {
        return a.moduleId - b.moduleId;
      }
      return a.lesson.order - b.lesson.order;
    });
  };

  const allLessons = getAllLessons();
  const currentIndex = lesson ? allLessons.findIndex((item) => item.lesson.id === lesson.id) : -1;
  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1].lesson : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1].lesson : null;

  const handlePrevious = () => {
    if (previousLesson) {
      onNavigateToLesson(previousLesson.id);
    }
  };

  const handleNext = () => {
    if (nextLesson) {
      onNavigateToLesson(nextLesson.id);
    }
  };

  // حالة فارغة
  if (!lesson) {
    return (
      <div className={styles.emptyContent}>
        <div className={styles.emptyContentIcon}>📚</div>
        <div className={styles.emptyContentTitle}>اختر درساً للبدء</div>
        <div className={styles.emptyContentText}>
          اختر درساً من القائمة الجانبية لعرض المحتوى
        </div>
      </div>
    );
  }

  // الحصول على رابط الفيديو
  const videoUrl = lesson.videoUrl || '';

  return (
    <div className={styles.lessonContent}>
      {/* Video Player Section */}
      {videoUrl && (
        <div className={styles.videoSection}>
          <div className={styles.videoWrapper}>
            <ResponsiveVideoPlayer
              url={videoUrl}
              title={lesson.title}
              lessonId={lesson.id.toString()}
              courseId="current-course"
              onProgress={handleProgressUpdate}
            />
          </div>
        </div>
      )}

      {/* Lesson Info Section */}
      <div className={styles.lessonInfoSection}>
        <div className={styles.lessonTitleCard}>
          <h1 className={styles.lessonTitle}>{lesson.title}</h1>
          {lesson.description && (
            <p className={styles.lessonDescription}>{lesson.description}</p>
          )}
        </div>

        {lesson.objectives && lesson.objectives.length > 0 && (
          <div className={styles.objectivesCard}>
            <div className={styles.objectivesHeader}>
              <Target className={styles.objectivesIcon} size={20} />
              <h2 className={styles.objectivesTitle}>أهداف التعلم</h2>
            </div>
            <ul className={styles.objectivesList}>
              {lesson.objectives.map((objective, index) => (
                <li key={index} className={styles.objectiveItem}>
                  <CheckCircle2 className={styles.objectiveCheckIcon} size={16} />
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Progress Indicator */}
      {videoUrl && (
        <div className={styles.progressSection}>
          <div className={styles.progressHeader}>
            <BookOpen className={styles.progressIcon} size={18} />
            <span className={styles.progressLabel}>التقدم</span>
            <span className={styles.progressPercentage}>{Math.round(progress)}%</span>
          </div>
          <div className={styles.progressBarContainer}>
            <div
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Notes Section */}
      <LessonNotes lessonId={lesson.id} />

      {/* Navigation Buttons */}
      <div className={styles.navigationSection}>
        <button
          className={`${styles.navButton} ${styles.navButtonPrevious} ${!previousLesson ? styles.navButtonDisabled : ''}`}
          onClick={handlePrevious}
          disabled={!previousLesson}
          aria-label="الدرس السابق"
        >
          <ChevronRight size={20} />
          <span>الدرس السابق</span>
          {previousLesson && (
            <span className={styles.navButtonLessonTitle}>{previousLesson.title}</span>
          )}
        </button>
        <button
          className={`${styles.navButton} ${styles.navButtonNext} ${!nextLesson ? styles.navButtonDisabled : ''}`}
          onClick={handleNext}
          disabled={!nextLesson}
          aria-label="الدرس التالي"
        >
          <span>الدرس التالي</span>
          {nextLesson && (
            <span className={styles.navButtonLessonTitle}>{nextLesson.title}</span>
          )}
          <ChevronLeft size={20} />
        </button>
      </div>
    </div>
  );
}

