'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PlayerShell } from '@/components/learning-player';
import { learningAnalytics } from '@/lib/analytics';
import { getCourseById } from '@/data/courses/all-courses';

// Helper function to parse lesson ID (handles both "1-0" format and direct IDs)
function parseLessonId(lessonId: string): { moduleIndex: number; lessonIndex: number } | null {
  // Check if it's in format "moduleIndex-lessonIndex"
  if (lessonId.includes('-')) {
    const parts = lessonId.split('-');
    if (parts.length === 2) {
      const moduleIndex = parseInt(parts[0], 10);
      const lessonIndex = parseInt(parts[1], 10);
      if (!isNaN(moduleIndex) && !isNaN(lessonIndex) && moduleIndex > 0 && lessonIndex >= 0) {
        // Convert both to 0-based indexing
        return { moduleIndex: moduleIndex - 1, lessonIndex: lessonIndex };
      }
    }
  }
  return null;
}

// Helper to find lesson by ID in modules
function findLessonById(modules: any, lessonId: string) {
  try {
    // Check if modules is valid and iterable
    if (!modules) {
      return null;
    }
    
    // Check if it's an array
    if (!Array.isArray(modules)) {
      // If it's an object with values, try to convert to array
      if (typeof modules === 'object' && modules !== null) {
        const modulesArray = Object.values(modules);
        if (Array.isArray(modulesArray)) {
          modules = modulesArray;
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
    
    // Now safely iterate
    for (const module of modules) {
      if (!module || typeof module !== 'object') {
        continue;
      }
      
      if (!module.lessons || !Array.isArray(module.lessons)) {
        continue;
      }
      
      // Try to find lesson by ID (handle both string and number comparisons)
      const lesson = module.lessons.find((l: any) => {
        if (!l) return false;
        // Compare as strings to handle type mismatches
        return String(l.id) === String(lessonId);
      });
      
      if (lesson) {
        return { module, lesson };
      }
    }
  } catch (error) {
    console.error('Error in findLessonById:', error);
    return null;
  }
  
  return null;
}

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = Array.isArray(params.courseId) ? params.courseId[0] : params.courseId;
  const lessonId = Array.isArray(params.lessonId) ? params.lessonId[0] : params.lessonId;

  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch course data
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch from API first
        try {
          const response = await fetch(`/api/courses/${courseId}`);
          if (response.ok) {
            const data = await response.json();
            // Check if API returned course data directly or wrapped in a 'course' property
            if (data.course && data.course.modules) {
              setCourseData(data.course);
              setLoading(false);
              return;
            } else if (data.modules) {
              // API returned course data directly
              setCourseData(data);
              setLoading(false);
              return;
            }
            // If API returned null or invalid data, fall through to mock data
          }
        } catch (apiError) {
          console.warn('API fetch failed, using fallback data:', apiError);
        }
        
        // Try to get course data from local courses.json file
        try {
          const courseIdNum = parseInt(courseId || '0', 10);
          if (courseIdNum > 0) {
            const localCourse = getCourseById(courseIdNum);
            if (localCourse && localCourse.modules) {
              // Convert course modules to the format expected by PlayerShell
              const formattedModules = localCourse.modules.map((module, moduleIndex) => ({
                id: module.id.toString(),
                title: module.title,
                lessons: module.lessons.map((lesson, lessonIndex) => {
                  const lessonTitle = typeof lesson === 'string' ? lesson : (lesson as { title: string }).title;
                  const lessonId = `${module.id}-${lessonIndex}`;
                  return {
                    id: lessonId,
                    title: lessonTitle,
                    duration: typeof lesson === 'string' ? '15 دقيقة' : ((lesson as { duration?: string }).duration || '15 دقيقة'),
                    type: 'video' as const,
                    completed: false,
                    progress: 0,
                  };
                }),
              }));
              
              setCourseData({
                id: localCourse.id.toString(),
                title: localCourse.title,
                modules: formattedModules,
              });
              setLoading(false);
              return;
            }
          }
        } catch (localError) {
          console.warn('Failed to load from local courses data:', localError);
        }
        
        // Fallback to mock data that matches the structure from coursesData
        const mockData = {
          id: courseId,
          title: 'أساسيات المراجعة الداخلية وفق المعايير الدولية',
          modules: [
            {
              id: '1',
              title: 'المقدمة وأساسيات المراجعة',
              lessons: [
                {
                  id: '1',
                  title: 'مقدمة في المراجعة الداخلية',
                  duration: '15 دقيقة',
                  type: 'video' as const,
                  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                  description: `مرحباً بكم في هذا الدرس التعليمي الشامل حول أساسيات المراجعة الداخلية.

في هذا الدرس سنتناول:
• تعريف المراجعة الداخلية ودورها في المؤسسات
• أهمية المراجعة الداخلية في تحسين الأداء المؤسسي
• المعايير الدولية للمراجعة الداخلية
• دور المراجع الداخلي في اكتشاف المخاطر والحد منها
• أفضل الممارسات في تطبيق المراجعة الداخلية

المراجعة الداخلية هي نشاط مستقل وموضوعي يهدف إلى إضافة قيمة للمنظمة وتحسين عملياتها. يساعد هذا النشاط المنظمة على تحقيق أهدافها من خلال اتباع منهج منظم ومنضبط لتقييم وتحسين فعالية إدارة المخاطر والرقابة والحوكمة.`,
                  transcript: `[00:00] مرحباً بكم في دورة المراجعة الداخلية وفق المعايير الدولية
[00:15] في هذا الدرس الأول سنتعرف على أساسيات المراجعة الداخلية
[00:30] المراجعة الداخلية هي عملية مستقلة وموضوعية
[00:45] تهدف إلى إضافة قيمة للمنظمة وتحسين عملياتها
[01:00] من خلال تقييم وتحسين فعالية إدارة المخاطر والرقابة والحوكمة
[01:30] سنتعلم اليوم كيفية تطبيق هذه المبادئ في بيئة العمل
[02:00] وكيف يمكن للمراجع الداخلي أن يساهم في نجاح المؤسسة`,
                  completed: false,
                  progress: 0,
                  resources: [
                    {
                      id: '1',
                      title: 'دليل المراجعة الداخلية الشامل.pdf',
                      url: 'https://www.iia.org.eg/Media/ar/dleelal-mraje-aldakhlee.pdf',
                      type: 'pdf',
                    },
                    {
                      id: '2',
                      title: 'ملخص الدرس الأول.docx',
                      url: '#',
                      type: 'word',
                    },
                    {
                      id: '3',
                      title: 'المعايير الدولية للمراجعة.pdf',
                      url: '#',
                      type: 'pdf',
                    },
                    {
                      id: '4',
                      title: 'نموذج تقييم المخاطر.xlsx',
                      url: '#',
                      type: 'excel',
                    },
                    {
                      id: '5',
                      title: 'قائمة التحقق من المراجعة.xlsx',
                      url: '#',
                      type: 'spreadsheet',
                    },
                    {
                      id: '6',
                      title: 'دليل الحوكمة المؤسسية.pdf',
                      url: '#',
                      type: 'pdf',
                    },
                    {
                      id: '7',
                      title: 'تقرير المراجعة - نموذج.docx',
                      url: '#',
                      type: 'word',
                    },
                  ],
                },
                {
                  id: '2',
                  title: 'أنواع المخاطر في الشركات',
                  duration: '20 دقيقة',
                  type: 'video' as const,
                  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                  description: `في هذا الدرس سنتعرف على أنواع المخاطر المختلفة التي تواجه المؤسسات.

محاور الدرس:
• المخاطر التشغيلية وكيفية التعامل معها
• المخاطر المالية وأساليب قياسها
• مخاطر السمعة وتأثيرها على المؤسسة
• المخاطر الاستراتيجية وطرق إدارتها
• أدوات تقييم وتحليل المخاطر

سنتعلم كيفية تحديد المخاطر وتقييمها وتطوير استراتيجيات للتعامل معها بفعالية.`,
                  transcript: `[00:00] في هذا الدرس سنتحدث عن أنواع المخاطر في الشركات
[00:20] المخاطر التشغيلية هي المخاطر الناتجة عن فشل العمليات الداخلية
[00:45] المخاطر المالية تتعلق بالخسائر المحتملة في الأصول المالية
[01:10] مخاطر السمعة يمكن أن تؤثر بشكل كبير على قيمة الشركة
[01:35] المخاطر الاستراتيجية تنشأ من قرارات العمل غير الفعالة`,
                  completed: false,
                  progress: 0,
                  resources: [
                    {
                      id: '8',
                      title: 'إطار إدارة المخاطر.pdf',
                      url: '#',
                      type: 'pdf',
                    },
                    {
                      id: '9',
                      title: 'مصفوفة تقييم المخاطر.xlsx',
                      url: '#',
                      type: 'excel',
                    },
                    {
                      id: '10',
                      title: 'دراسة حالة - إدارة المخاطر.docx',
                      url: '#',
                      type: 'word',
                    },
                  ],
                },
                {
                  id: '3',
                  title: 'إطار عمل المراجعة الداخلية',
                  duration: '25 دقيقة',
                  type: 'reading' as const,
                  description: `تعلم إطار عمل المراجعة الداخلية وفق أفضل الممارسات العالمية.

في هذا الدرس ستتعلم:
• مكونات إطار العمل الشامل للمراجعة الداخلية
• كيفية وضع خطة المراجعة السنوية
• تطوير برامج المراجعة الفعالة
• معايير الأداء والجودة في المراجعة
• أدوات وتقنيات المراجعة الحديثة

هذا الإطار يوفر منهجية منظمة لتنفيذ عمليات المراجعة الداخلية بكفاءة وفعالية.`,
                  completed: false,
                  progress: 0,
                  resources: [
                    {
                      id: '11',
                      title: 'إطار عمل COSO.pdf',
                      url: '#',
                      type: 'pdf',
                    },
                    {
                      id: '12',
                      title: 'نماذج أوراق العمل.xlsx',
                      url: '#',
                      type: 'spreadsheet',
                    },
                  ],
                },
              ],
            },
            {
              id: '2',
              title: 'التخطيط والتنفيذ',
              lessons: [
                {
                  id: '4',
                  title: 'تخطيط عملية المراجعة',
                  duration: '30 دقيقة',
                  type: 'video' as const,
                  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                  description: 'تعلم كيفية تخطيط عملية المراجعة بشكل احترافي ومنهجي.',
                  completed: false,
                  locked: true,
                  progress: 0,
                  resources: [
                    {
                      id: '13',
                      title: 'خطة المراجعة السنوية.xlsx',
                      url: '#',
                      type: 'excel',
                    },
                  ],
                },
              ],
            },
          ],
        };
        
        setCourseData(mockData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'حدث خطأ في تحميل البيانات');
        console.error('Error fetching course data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  // Normalize lesson ID - handle both "1-0" format and direct IDs
  const normalizedLessonId = useMemo(() => {
    try {
      if (!courseData || !lessonId) {
        return lessonId;
      }

      // Safely get modules
      let modules = courseData.modules;
      if (!modules) {
        return lessonId;
      }

      // Ensure modules is an array
      if (!Array.isArray(modules)) {
        if (typeof modules === 'object' && modules !== null) {
          modules = Object.values(modules);
        } else {
          return lessonId;
        }
      }

      if (!Array.isArray(modules) || modules.length === 0) {
        return lessonId;
      }

      // Try to parse as "moduleIndex-lessonIndex"
      const parsed = parseLessonId(lessonId);
      if (parsed) {
        const { moduleIndex, lessonIndex } = parsed;
        if (
          moduleIndex >= 0 &&
          moduleIndex < modules.length &&
          modules[moduleIndex] &&
          modules[moduleIndex].lessons &&
          Array.isArray(modules[moduleIndex].lessons) &&
          lessonIndex >= 0 &&
          lessonIndex < modules[moduleIndex].lessons.length &&
          modules[moduleIndex].lessons[lessonIndex]
        ) {
          return modules[moduleIndex].lessons[lessonIndex].id;
        }
      }

      // If not in that format, try to find by direct ID (handle both string and number)
      const found = findLessonById(modules, lessonId);
      if (found && found.lesson) {
        return found.lesson.id;
      }
      
      // Also try to find by converting lessonId to number if it's a numeric string
      if (lessonId && !isNaN(Number(lessonId))) {
        const foundByNumber = findLessonById(modules, String(lessonId));
        if (foundByNumber && foundByNumber.lesson) {
          return foundByNumber.lesson.id;
        }
      }

      // Default to first lesson if not found
      if (
        modules[0] &&
        modules[0].lessons &&
        Array.isArray(modules[0].lessons) &&
        modules[0].lessons.length > 0
      ) {
        const firstLessonId = modules[0].lessons[0].id;
        // Redirect to first lesson if current one not found
        if (firstLessonId !== lessonId) {
          setTimeout(() => {
            router.replace(`/student/courses/${courseId}/lesson/${firstLessonId}`);
          }, 100);
        }
        return firstLessonId;
      }

      return lessonId;
    } catch (error) {
      console.error('Error normalizing lesson ID:', error);
      return lessonId;
    }
  }, [lessonId, courseData, courseId, router]);

  const handleLessonChange = (newLessonId: string) => {
    if (normalizedLessonId) {
      learningAnalytics.lessonChange(normalizedLessonId, newLessonId, courseId || '');
    }
    router.push(`/student/courses/${courseId}/lesson/${newLessonId}`);
  };

  const handleComplete = (completedLessonId: string) => {
    learningAnalytics.lessonComplete(completedLessonId, courseId || '');
    
    // Update local state
    setCourseData((prev: any) => {
      if (!prev) return prev;
      const updated = { ...prev };
      updated.modules = updated.modules.map((module: any) => ({
        ...module,
        lessons: module.lessons.map((lesson: any) =>
          lesson.id === completedLessonId ? { ...lesson, completed: true, progress: 100 } : lesson
        ),
      }));
      return updated;
    });

    // TODO: Mark lesson as completed via API
    // fetch(`/api/lessons/${completedLessonId}/complete`, { method: 'POST' });
  };

  // Ensure modules is a valid array before passing to PlayerShell
  // This hook must be called before any conditional returns
  const safeModules = useMemo(() => {
    try {
      if (!courseData || !courseData.modules) {
        return [];
      }

      const modules = courseData.modules;
      
      // If it's already an array, return it
      if (Array.isArray(modules)) {
        return modules;
      }

      // If it's an object, try to convert to array
      if (typeof modules === 'object' && modules !== null) {
        const modulesArray = Object.values(modules);
        if (Array.isArray(modulesArray)) {
          return modulesArray;
        }
      }

      return [];
    } catch (error) {
      console.error('Error preparing safe modules:', error);
      return [];
    }
  }, [courseData]);

  // Loading state - must come after all hooks
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mb-6"
          >
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-neutral-200 dark:border-neutral-700 border-t-primary-600 dark:border-t-primary-400 mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 bg-primary-600 dark:bg-primary-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.2, ease: 'easeOut' }}
            className="text-neutral-700 dark:text-neutral-300 text-lg font-medium"
          >
            جاري تحميل الدرس...
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.2, ease: 'easeOut' }}
            className="text-neutral-500 dark:text-neutral-400 text-sm mt-2"
          >
            يرجى الانتظار
          </motion.p>
        </div>
      </div>
    );
  }

  // Error state - must come after all hooks
  if (error || !courseData) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 p-4">
        <div className="text-center max-w-md mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mb-6"
          >
            <div className="w-20 h-20 bg-danger-50 dark:bg-danger-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-danger-600 dark:text-danger-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="text-2xl font-bold text-neutral-900 dark:text-white mb-2"
          >
            حدث خطأ
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.2, ease: 'easeOut' }}
            className="text-neutral-600 dark:text-neutral-400 mb-6"
          >
            {error || 'لا يمكن تحميل بيانات الدرس'}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.2, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <button
              onClick={() => window.location.reload()}
              className="px-4 sm:px-6 py-2.5 sm:py-3 min-h-[44px] bg-neutral-700 dark:bg-neutral-600 hover:bg-neutral-600 dark:hover:bg-neutral-500 text-white rounded-lg font-medium text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2"
              aria-label="إعادة المحاولة"
              type="button"
            >
              إعادة المحاولة
            </button>
            <button
              onClick={() => router.push(`/student/courses/${courseId}`)}
              className="px-4 sm:px-6 py-2.5 sm:py-3 min-h-[44px] bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-medium text-sm sm:text-base shadow-md shadow-primary-500/20 hover:shadow-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              aria-label="العودة إلى الكورس"
              type="button"
            >
              العودة إلى الكورس
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <PlayerShell
      courseId={courseId || ''}
      courseTitle={courseData.title || 'دورة بدون عنوان'}
      modules={safeModules}
      currentLessonId={normalizedLessonId || ''}
      onLessonChange={handleLessonChange}
      onComplete={handleComplete}
    />
  );
}

