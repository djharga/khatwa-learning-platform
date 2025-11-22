'use client';

/**
 * Individual Lesson Page for Course Detail Pages
 * 
 * Route: /courses/[slug]/lesson/[lessonId]
 * 
 * This page displays a single lesson from a course using the course slug and lesson ID.
 */

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCourseModulesBySlug, getCourseTitleBySlug, type Module, type Lesson, type File } from '@/data/courses/course-modules-converter';
import { getCourseBySlug } from '@/data/courses/all-courses';
import styles from '@/app/(dashboard)/student/courses/[courseId]/lesson/lessons-page.module.css';
import LessonContent from '@/app/(dashboard)/student/courses/[courseId]/lesson/LessonContent';
import LessonHero from '@/app/(dashboard)/student/courses/[courseId]/lesson/LessonHero';

// Get file icon based on type
function getFileIcon(type: File['type']): string {
  const icons = {
    video: '🎥',
    pdf: '📄',
    audio: '🎵'
  };
  return icons[type] || '📁';
}

// Get file icon class based on type
function getFileIconClass(type: File['type']): string {
  const classes = {
    video: 'fileIconVideo',
    pdf: 'fileIconPdf',
    audio: 'fileIconAudio'
  };
  return classes[type] || 'fileIconPdf';
}

export default function CourseLessonPage() {
  const params = useParams();
  const router = useRouter();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const lessonId = Array.isArray(params.lessonId) ? params.lessonId[0] : params.lessonId;

  // تحميل بيانات Modules من slug
  const modulesData = useMemo(() => {
    if (!slug) return [];
    const courseModules = getCourseModulesBySlug(slug);
    return courseModules || [];
  }, [slug]);

  // الحصول على عنوان الكورس
  const courseTitle = useMemo(() => {
    if (!slug) return 'دورة تعليمية';
    const title = getCourseTitleBySlug(slug);
    return title || 'دورة تعليمية';
  }, [slug]);

  // البحث عن الدرس المحدد
  const selectedLesson = useMemo(() => {
    if (!lessonId || !modulesData.length) return null;

    for (const courseModule of modulesData) {
      const lesson = courseModule.lessons.find((l) =>
        l.id.toString() === lessonId.toString() ||
        l.title === lessonId
      );
      if (lesson) return lesson;
    }
    return null;
  }, [lessonId, modulesData]);

  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({});
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');

  // توسيع الوحدة التي تحتوي على الدرس المحدد تلقائياً
  useEffect(() => {
    if (selectedLesson && modulesData.length > 0) {
      for (const courseModule of modulesData) {
        const hasLesson = courseModule.lessons.some((l) => l.id === selectedLesson.id);
        if (hasLesson) {
          setExpandedModules(prev => ({ ...prev, [courseModule.id]: true }));
          break;
        }
      }
    } else if (modulesData.length > 0) {
      // إذا لم يكن هناك درس محدد، توسيع أول وحدة
      const firstModule = modulesData[0];
      if (firstModule) {
        setExpandedModules(prev => ({ ...prev, [firstModule.id]: true }));
      }
    }
  }, [selectedLesson, modulesData]);

  // Toggle module expansion
  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  // Navigate to lesson
  const navigateToLesson = (lesson: Lesson) => {
    if (slug) {
      router.push(`/courses/${slug}/lesson/${lesson.id}`);
    }
  };

  // Open file modal
  const handleOpenFile = (file: File) => {
    setModalTitle('فتح الملف');
    setModalText(`سيتم فتح الملف: ${file.title}`);
    setShowModal(true);
  };

  // Download file modal
  const handleDownloadFile = (file: File) => {
    setModalTitle('تحميل الملف');
    setModalText(`سيتم تحميل الملف: ${file.title} (${file.size})`);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Calculate total lessons and modules
  const totalLessons = modulesData.reduce((sum, courseModule) => sum + courseModule.lessons.length, 0);
  const totalModules = modulesData.length;

  // Get course info for redirect
  const course = useMemo(() => {
    if (!slug) return null;
    return getCourseBySlug(slug);
  }, [slug]);

  return (
    <div className={styles.lessonsPageContainer} dir="rtl">
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLogo}>خطي</div>
        {course && (
          <button
            onClick={() => router.push(`/courses/${slug}`)}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            العودة إلى صفحة الدورة
          </button>
        )}
      </header>

      {/* Hero Section */}
      <LessonHero
        courseTitle={courseTitle}
        totalLessons={totalLessons}
        totalModules={totalModules}
      />

      {/* Main Container */}
      <div className={styles.mainContainer}>
        {/* Right Column: Modules & Lessons Accordion */}
        <div className={styles.modulesColumn}>
          {modulesData.map(courseModule => {
            const isExpanded = expandedModules[courseModule.id];
            const isActive = selectedLesson &&
              courseModule.lessons.some(l => l.id === selectedLesson.id);

            return (
              <div key={courseModule.id} className={styles.moduleItem}>
                <div
                  className={`${styles.moduleHeader} ${isActive ? styles.active : ''}`}
                  onClick={() => toggleModule(courseModule.id)}
                >
                  <div className={styles.moduleTitle}>{courseModule.title}</div>
                  {courseModule.lessons.length > 0 && (
                    <svg
                      className={`${styles.chevron} ${isExpanded ? styles.expanded : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  )}
                </div>
                {courseModule.lessons.length > 0 && (
                  <div className={`${styles.lessonsList} ${isExpanded ? styles.expanded : ''}`}>
                    {courseModule.lessons.map(lesson => {
                      const isLessonActive = selectedLesson && selectedLesson.id === lesson.id;
                      return (
                        <div
                          key={lesson.id}
                          className={`${styles.lessonItem} ${isLessonActive ? styles.active : ''}`}
                          onClick={() => navigateToLesson(lesson)}
                        >
                          {lesson.title}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Middle Column: Lesson Content */}
        <div className={styles.contentColumn}>
          <LessonContent
            lesson={selectedLesson}
            modules={modulesData}
            onNavigateToLesson={(targetLessonId) => {
              // البحث عن الدرس في البيانات
              for (const courseModule of modulesData) {
                const foundLesson = courseModule.lessons.find((l) =>
                  l.id.toString() === targetLessonId.toString() ||
                  l.id === targetLessonId
                );
                if (foundLesson && slug) {
                  router.push(`/courses/${slug}/lesson/${foundLesson.id}`);
                  // توسيع الوحدة التابعة لها
                  setExpandedModules((prev) => ({ ...prev, [courseModule.id]: true }));
                  break;
                }
              }
            }}
          />
        </div>

        {/* Left Column: Files List */}
        <div className={styles.filesColumn}>
          <div className={styles.filesHeader}>
            <h2>ملفات الدرس</h2>
          </div>
          <div className={styles.filesList}>
            {!selectedLesson ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyStateIcon}>📂</div>
                <div className={styles.emptyStateText}>لم يتم اختيار درس بعد</div>
              </div>
            ) : !selectedLesson.files || selectedLesson.files.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyStateIcon}>📭</div>
                <div className={styles.emptyStateText}>لا توجد ملفات لهذا الدرس</div>
              </div>
            ) : (
              selectedLesson.files.map(file => {
                const icon = getFileIcon(file.type);
                const iconClass = getFileIconClass(file.type);
                const typeLabel = file.type === 'video' ? 'فيديو' : file.type === 'pdf' ? 'PDF' : 'صوت';
                const metaInfo = file.duration
                  ? `${typeLabel} • ${file.size} • ${file.duration}`
                  : `${typeLabel} • ${file.size}`;

                return (
                  <div key={file.id} className={styles.fileCard}>
                    <div className={`${styles.fileIconContainer} ${styles[iconClass as keyof typeof styles]}`}>
                      {icon}
                    </div>
                    <div className={styles.fileTitle}>{file.title}</div>
                    <div className={styles.fileMeta}>{metaInfo}</div>
                    <div className={styles.fileActions}>
                      <button
                        className={`${styles.btn} ${styles.btnPrimary}`}
                        onClick={() => handleOpenFile(file)}
                      >
                        فتح
                      </button>
                      <button
                        className={`${styles.btn} ${styles.btnSecondary}`}
                        onClick={() => handleDownloadFile(file)}
                      >
                        تحميل
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className={`${styles.modal} ${showModal ? styles.show : styles.hide}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            closeModal();
          }
        }}
      >
        <div className={styles.modalContent}>
          <h3 className={styles.modalTitle}>{modalTitle}</h3>
          <p className={styles.modalText}>{modalText}</p>
          <button className={`${styles.btn} ${styles.btnPrimary} ${styles.modalClose}`} onClick={closeModal}>
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}

