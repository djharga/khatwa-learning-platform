'use client';

/**
 * Lessons Page - Converted from app.js and index.html
 * 
 * Layout:
 * - RIGHT (RTL): Modules/Units accordion (280px fixed)
 * - CENTER: Empty viewer (flex:1)
 * - LEFT (RTL): Files list (320px fixed)
 * 
 * File location: app/(dashboard)/student/courses/[courseId]/lesson/page.tsx
 */

import { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import styles from './lessons-page.module.css';
import LessonContent from './LessonContent';
import LessonHero from './LessonHero';
import { convertAuditLevelsToModules, getLevelById } from '@/data/internal-audit-levels';
import { getCourseModules, getCourseTitle, type Module as CourseModule } from '@/data/courses/course-modules-converter';

// Data structure from app.js
interface File {
  id: number;
  title: string;
  type: 'video' | 'pdf' | 'audio';
  size: string;
  duration?: string;
  url?: string; // رابط الملف
  videoUrl?: string; // رابط الفيديو
}

interface Lesson {
  id: number;
  title: string;
  order: number;
  files: File[];
  description?: string; // وصف الدرس
  objectives?: string[]; // أهداف التعلم
  videoUrl?: string; // رابط الفيديو الرئيسي
}

interface Module {
  id: number;
  title: string;
  order: number;
  lessons: Lesson[];
}

// ═══════════════════════════════════════════════════
// بيانات المستويات الثلاثة للمراجعة الداخلية
// ═══════════════════════════════════════════════════
// يتم تحميل البيانات من ملف البيانات المركزي

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

export default function LessonsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const courseId = params.courseId as string;
  const courseIdNum = parseInt(courseId);
  
  // الحصول على معرف المستوى من query parameter (إن وجد) - للمراجعة الداخلية فقط
  const levelIdParam = searchParams.get('level');
  const selectedLevelId = levelIdParam ? parseInt(levelIdParam) as 1 | 2 | 3 : null;

  // تحديد نوع الكورس: المراجعة الداخلية (courseId = 14) أم كورس عادي
  const isInternalAudit = courseIdNum === 14;

  // تحميل بيانات Modules حسب نوع الكورس
  const modulesData = useMemo(() => {
    // التحقق من صحة courseId
    if (!courseId || isNaN(courseIdNum) || courseIdNum <= 0) {
      console.warn(`Invalid courseId: ${courseId}`);
      return [];
    }

    if (isInternalAudit) {
      // المراجعة الداخلية: استخدام البيانات الخاصة
      const allModulesData = convertAuditLevelsToModules();
      
      // إذا كان هناك مستوى محدد، فلتر البيانات
      if (selectedLevelId) {
        return allModulesData.filter(module => 
          module.levelId === selectedLevelId || 
          (module.isLevel && module.levelId === selectedLevelId)
        );
      }
      return allModulesData;
    } else {
      // كورس عادي: استخدام بيانات الكورس من courses.json
      const courseModules = getCourseModules(courseIdNum);
      if (!courseModules || courseModules.length === 0) {
        console.warn(`No modules found for courseId: ${courseIdNum}`);
        return [];
      }
      return courseModules;
    }
  }, [courseId, courseIdNum, isInternalAudit, selectedLevelId]);

  // الحصول على عنوان الكورس
  const courseTitle = useMemo(() => {
    // التحقق من صحة courseId
    if (!courseId || isNaN(courseIdNum) || courseIdNum <= 0) {
      return 'دورة تعليمية';
    }

    if (isInternalAudit) {
      if (selectedLevelId) {
        const level = getLevelById(selectedLevelId);
        return level?.title || 'برنامج المراجعين الداخليين';
      }
      return 'برنامج المراجعين الداخليين';
    } else {
      const title = getCourseTitle(courseIdNum);
      if (!title) {
        console.warn(`No title found for courseId: ${courseIdNum}`);
      }
      return title || 'دورة تعليمية';
    }
  }, [courseId, courseIdNum, isInternalAudit, selectedLevelId]);

  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({});
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');

  // إعادة تعيين الحالة عند تغيير courseId أو selectedLevelId
  // هذا يضمن أن كل دورة تعرض بياناتها بشكل منفصل
  useEffect(() => {
    // إعادة تعيين الحالة عند تغيير الدورة
    setSelectedLesson(null);
    setExpandedModules({});
    setShowModal(false);
  }, [courseId, selectedLevelId]);

  // توسيع المستوى المحدد تلقائياً عند التحميل (للمراجعة الداخلية فقط)
  useEffect(() => {
    if (isInternalAudit && selectedLevelId) {
      const levelModule = modulesData.find(m => m.isLevel && m.levelId === selectedLevelId);
      if (levelModule) {
        setExpandedModules(prev => ({ ...prev, [levelModule.id]: true }));
        // توسيع جميع المحاور التابعة للمستوى تلقائياً
        const levelModules = modulesData.filter(m => !m.isLevel && m.levelId === selectedLevelId);
        levelModules.forEach(module => {
          setExpandedModules(prev => ({ ...prev, [module.id]: true }));
        });
      }
    } else if (!isInternalAudit && modulesData.length > 0) {
      // للكورسات العادية: توسيع أول محور تلقائياً
      const firstModule = modulesData[0];
      if (firstModule) {
        setExpandedModules(prev => ({ ...prev, [firstModule.id]: true }));
      }
    }
  }, [selectedLevelId, modulesData, isInternalAudit]);

  // Toggle module expansion
  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  // Select lesson
  const selectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
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

  // Calculate total lessons and modules (استثناء المستويات من العد)
  const totalLessons = modulesData
    .filter(module => !module.isLevel)
    .reduce((sum, module) => sum + module.lessons.length, 0);
  const totalModules = modulesData.filter(module => !module.isLevel).length;

  return (
    <div className={styles.lessonsPageContainer} dir="rtl" key={`course-${courseId}-${selectedLevelId || ''}`}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLogo}>خطي</div>
      </header>

      {/* Hero Section */}
      <LessonHero
        key={`hero-${courseId}-${selectedLevelId || ''}`}
        courseTitle={courseTitle}
        totalLessons={totalLessons}
        totalModules={totalModules}
      />
      
      {/* Main Container */}
      <div className={styles.mainContainer} key={`container-${courseId}-${selectedLevelId || ''}`}>
        {/* Right Column: Modules & Lessons Accordion */}
        <div className={styles.modulesColumn} key={`modules-${courseId}-${selectedLevelId || ''}`}>
          {modulesData.map(module => {
            const isExpanded = expandedModules[module.id];
            const isActive = selectedLesson && 
              module.lessons.some(l => l.id === selectedLesson.id);
            const isLevel = module.isLevel;
            
            // إذا كان المستوى (للمراجعة الداخلية فقط)، نعرضه مع إمكانية فتحه لعرض المحاور التابعة له
            if (isLevel) {
              // البحث عن المحاور التابعة لهذا المستوى
              const levelModules = modulesData.filter(m => !m.isLevel && m.levelId === module.levelId);
              const isLevelExpanded = expandedModules[module.id];
              
              return (
                <div key={module.id} className={styles.moduleItem}>
                  {/* عنوان المستوى */}
                  <div 
                    className={`${styles.moduleHeader} ${styles.levelHeader}`}
                    onClick={() => toggleModule(module.id)}
                  >
                    <div className={styles.levelTitle}>
                      {module.title}
                    </div>
                    <svg 
                      className={`${styles.chevron} ${isLevelExpanded ? styles.expanded : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                  
                  {/* عرض المحاور التابعة للمستوى */}
                  {isLevelExpanded && (
                    <div className={styles.levelModulesContainer}>
                      {levelModules.map(levelModule => {
                        const isModuleExpanded = expandedModules[levelModule.id];
                        const isModuleActive = selectedLesson && 
                          levelModule.lessons.some(l => l.id === selectedLesson.id);
                        
                        return (
                          <div key={levelModule.id} className={styles.moduleItem}>
                            {/* عنوان المحور */}
                            <div 
                              className={`${styles.moduleHeader} ${isModuleActive ? styles.active : ''}`}
                              onClick={() => toggleModule(levelModule.id)}
                            >
                              <div className={styles.moduleTitle}>
                                {levelModule.title}
                              </div>
                              {levelModule.lessons.length > 0 && (
                                <svg 
                                  className={`${styles.chevron} ${isModuleExpanded ? styles.expanded : ''}`} 
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                              )}
                            </div>
                            
                            {/* عرض المحاور الفرعية (Lessons) */}
                            {levelModule.lessons.length > 0 && (
                              <div className={`${styles.lessonsList} ${isModuleExpanded ? styles.expanded : ''}`}>
                                {levelModule.lessons.map(lesson => {
                                  const isLessonActive = selectedLesson && selectedLesson.id === lesson.id;
                                  return (
                                    <div
                                      key={lesson.id}
                                      className={`${styles.lessonItem} ${isLessonActive ? styles.active : ''}`}
                                      onClick={() => selectLesson(lesson)}
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
                  )}
                </div>
              );
            }
            
            // إذا كان محور عادي (للكورسات العادية)، نعرضه مباشرة
            if (!isLevel) {
              return (
                <div key={module.id} className={styles.moduleItem}>
                  <div 
                    className={`${styles.moduleHeader} ${isActive ? styles.active : ''}`}
                    onClick={() => toggleModule(module.id)}
                  >
                    <div className={styles.moduleTitle}>{module.title}</div>
                    {module.lessons.length > 0 && (
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
                  {module.lessons.length > 0 && (
                    <div className={`${styles.lessonsList} ${isExpanded ? styles.expanded : ''}`}>
                      {module.lessons.map(lesson => {
                        const isLessonActive = selectedLesson && selectedLesson.id === lesson.id;
                        return (
                          <div
                            key={lesson.id}
                            className={`${styles.lessonItem} ${isLessonActive ? styles.active : ''}`}
                            onClick={() => selectLesson(lesson)}
                          >
                            {lesson.title}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }
            
            return null;
          })}
        </div>
        
        {/* Middle Column: Lesson Content */}
        <div className={styles.contentColumn} key={`content-${courseId}-${selectedLevelId || ''}`}>
          <LessonContent
            key={`lesson-content-${courseId}-${selectedLesson?.id || 'none'}`}
            lesson={selectedLesson}
            modules={modulesData}
            onNavigateToLesson={(lessonId) => {
              // البحث عن الدرس في البيانات
              for (const courseModule of modulesData) {
                const foundLesson = courseModule.lessons.find((l) => l.id === lessonId);
                if (foundLesson) {
                  setSelectedLesson(foundLesson);
                  // توسيع الوحدة التابعة لها
                  setExpandedModules((prev) => ({ ...prev, [courseModule.id]: true }));
                  break;
                }
              }
            }}
          />
        </div>
        
        {/* Left Column: Files List */}
        <div className={styles.filesColumn} key={`files-${courseId}-${selectedLevelId || ''}`}>
          <div className={styles.filesHeader}>
            <h2>ملفات الدرس</h2>
          </div>
          <div className={styles.filesList} key={`files-list-${courseId}-${selectedLesson?.id || 'none'}`}>
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

