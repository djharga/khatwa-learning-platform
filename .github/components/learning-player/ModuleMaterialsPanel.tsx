'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Download,
  ExternalLink,
  FileText,
  FileSpreadsheet,
  ArrowRight,
} from 'lucide-react';
import { WordIcon, PDFIcon, VideoIcon, AudioIcon } from '@/components/ui/icons/FileTypeIcons';

interface Resource {
  id: string;
  title: string;
  url: string;
  type: string;
}

interface Lesson {
  id: string;
  title: string;
  resources?: Resource[];
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface ModuleMaterialsPanelProps {
  module: Module | null;
  currentLessonId: string;
  onClose: () => void;
}

export default function ModuleMaterialsPanel({
  module,
  currentLessonId,
  onClose,
}: ModuleMaterialsPanelProps) {
  // جمع جميع المواد من المحور المحدد
  const allResources = useMemo(() => {
    if (!module) return [];
    
    const resources: Array<Resource & { lessonId: string; lessonTitle: string }> = [];
    
    module.lessons.forEach((lesson, lessonIndex) => {
      // إذا كانت الموارد موجودة، استخدمها
      if (lesson.resources && lesson.resources.length > 0) {
        lesson.resources.forEach(resource => {
          resources.push({
            ...resource,
            lessonId: lesson.id,
            lessonTitle: lesson.title,
          });
        });
      } else {
        // إذا لم تكن موجودة، أنشئ موارد وهمية
        const mockResources = [
          {
            id: `${lesson.id}-word-${lessonIndex}`,
            title: `ملخص ${lesson.title}.docx`,
            url: '#',
            type: 'word',
            lessonId: lesson.id,
            lessonTitle: lesson.title,
          },
          {
            id: `${lesson.id}-pdf-${lessonIndex}`,
            title: `محاضرة ${lesson.title}.pdf`,
            url: '#',
            type: 'pdf',
            lessonId: lesson.id,
            lessonTitle: lesson.title,
          },
          {
            id: `${lesson.id}-excel-${lessonIndex}`,
            title: `جداول ${lesson.title}.xlsx`,
            url: '#',
            type: 'excel',
            lessonId: lesson.id,
            lessonTitle: lesson.title,
          },
        ];
        resources.push(...mockResources);
      }
    });
    
    return resources;
  }, [module]);

  const getFileIcon = (type: string) => {
    const lower = type.toLowerCase();
    const iconClass = "w-5 h-5 flex-shrink-0";
    
    if (lower.includes('pdf')) {
      return <PDFIcon className={iconClass} size={20} />;
    }
    if (lower.includes('word') || lower.includes('doc')) {
      return <WordIcon className={iconClass} size={20} />;
    }
    if (lower.includes('excel') || lower.includes('xls') || lower.includes('spreadsheet')) {
      return <FileSpreadsheet className={`${iconClass} text-green-600`} />;
    }
    if (lower.includes('video') || lower.includes('mp4')) {
      return <VideoIcon className={iconClass} size={20} />;
    }
    if (lower.includes('audio') || lower.includes('mp3')) {
      return <AudioIcon className={iconClass} size={20} />;
    }
    return <FileText className={`${iconClass} text-gray-500`} />;
  };

  // Get file type color with reduced saturation (20-30% less)
  const getFileColor = (type: string) => {
    const lower = type.toLowerCase();
    
    if (lower.includes('pdf')) {
      return {
        bg: 'bg-red-50/80 dark:bg-red-900/15',
        border: 'border-red-200/70 dark:border-red-800/50',
        iconBg: 'bg-red-100/80 dark:bg-red-900/30',
        text: 'text-red-700/90 dark:text-red-300/90',
        timeline: 'bg-red-400/80',
      };
    }
    if (lower.includes('word') || lower.includes('doc')) {
      return {
        bg: 'bg-blue-50/80 dark:bg-blue-900/15',
        border: 'border-blue-200/70 dark:border-blue-800/50',
        iconBg: 'bg-blue-100/80 dark:bg-blue-900/30',
        text: 'text-blue-700/90 dark:text-blue-300/90',
        timeline: 'bg-blue-400/80',
      };
    }
    if (lower.includes('excel') || lower.includes('xls') || lower.includes('spreadsheet')) {
      return {
        bg: 'bg-green-50/80 dark:bg-green-900/15',
        border: 'border-green-200/70 dark:border-green-800/50',
        iconBg: 'bg-green-100/80 dark:bg-green-900/30',
        text: 'text-green-700/90 dark:text-green-300/90',
        timeline: 'bg-green-400/80',
      };
    }
    if (lower.includes('video')) {
      return {
        bg: 'bg-purple-50/80 dark:bg-purple-900/15',
        border: 'border-purple-200/70 dark:border-purple-800/50',
        iconBg: 'bg-purple-100/80 dark:bg-purple-900/30',
        text: 'text-purple-700/90 dark:text-purple-300/90',
        timeline: 'bg-purple-400/80',
      };
    }
    if (lower.includes('audio') || lower.includes('mp3')) {
      return {
        bg: 'bg-amber-50/80 dark:bg-amber-900/15',
        border: 'border-amber-200/70 dark:border-amber-800/50',
        iconBg: 'bg-amber-100/80 dark:bg-amber-900/30',
        text: 'text-amber-700/90 dark:text-amber-300/90',
        timeline: 'bg-amber-400/80',
      };
    }
    return {
      bg: 'bg-gray-50/80 dark:bg-gray-900/15',
      border: 'border-gray-200/70 dark:border-gray-800/50',
      iconBg: 'bg-gray-100/80 dark:bg-gray-900/30',
      text: 'text-gray-700/90 dark:text-gray-300/90',
      timeline: 'bg-gray-400/80',
    };
  };

  const handleDownload = (url: string, title: string) => {
    if (url && url !== '#') {
      const link = document.createElement('a');
      link.href = url;
      link.download = title;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleOpen = (url: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  if (!module) {
    return (
      <div className="h-full flex flex-col bg-gradient-to-b from-white via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950/50 backdrop-blur-xl border-l border-gray-200/50 dark:border-gray-700/50 shadow-2xl overflow-hidden" dir="rtl">
        <div className="flex flex-col items-center justify-center h-full p-8">
          <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            اختر محوراً لعرض المواد الخاصة به
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-white via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950/50 backdrop-blur-xl border-l border-gray-200/50 dark:border-gray-700/50 shadow-2xl overflow-hidden" dir="rtl">
      {/* Header */}
      <div className="p-5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-gray-800/50 dark:to-gray-800/50 flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="إغلاق"
          >
            <ArrowRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </motion.button>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-gray-900 dark:text-white truncate">
              {module.title}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {allResources.length} مادة
            </p>
          </div>
        </div>
      </div>

      {/* Materials List - Enhanced: timeline, better cards, unified height, slide right animation */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-600">
        {allResources.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              لا توجد مواد متاحة لهذا المحور
            </p>
          </div>
        ) : (
          <div className="relative p-4">
            {/* Vertical Timeline */}
            <div className="absolute right-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-200 via-purple-200 to-indigo-200 opacity-30" />
            
            <div className="space-y-3 relative">
              {allResources.map((resource, index) => {
                const colors = getFileColor(resource.type);
                const isCurrentLesson = resource.lessonId === currentLessonId;

                return (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute right-[23px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white shadow-sm z-10" style={{ backgroundColor: colors.timeline.replace('/80', '') }} />
                    
                    <div
                      className={`group flex items-center gap-4 p-4 rounded-xl border-2 min-h-[80px] ${
                        isCurrentLesson 
                          ? 'bg-indigo-50/80 dark:bg-indigo-900/20 border-indigo-300/80 dark:border-indigo-700/80 shadow-md' 
                          : `${colors.bg} ${colors.border} hover:shadow-md`
                      } transition-all`}
                    >
                      {/* Icon - Enhanced: larger, clearer */}
                      <div className={`p-3 rounded-xl flex-shrink-0 ${colors.iconBg} shadow-sm group-hover:scale-110 transition-transform`}>
                        {getFileIcon(resource.type)}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 text-right min-w-0 mr-2">
                        <h4 className={`font-bold text-sm mb-1.5 truncate ${colors.text}`} style={{ lineHeight: '1.4' }}>
                          {resource.title}
                        </h4>
                        <div className="flex items-center gap-2 justify-end text-xs text-gray-500 dark:text-gray-400 mb-2">
                          <span className="uppercase font-semibold">{resource.type}</span>
                        </div>
                        {isCurrentLesson && (
                          <span className="inline-block px-2.5 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-lg text-[10px] font-bold">
                            من الدرس الحالي
                          </span>
                        )}
                      </div>
                      
                      {/* Action Buttons - Enhanced: clearer, better contrast */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDownload(resource.url, resource.title)}
                          className={`p-2.5 rounded-lg transition-all ${colors.iconBg} hover:shadow-md`}
                          aria-label="تحميل"
                          disabled={!resource.url || resource.url === '#'}
                        >
                          <Download className={`w-4 h-4 ${colors.text}`} strokeWidth={2.5} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleOpen(resource.url)}
                          className={`p-2.5 rounded-lg transition-all ${colors.iconBg} hover:shadow-md`}
                          aria-label="فتح"
                          disabled={!resource.url || resource.url === '#'}
                        >
                          <ExternalLink className={`w-4 h-4 ${colors.text}`} strokeWidth={2.5} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

