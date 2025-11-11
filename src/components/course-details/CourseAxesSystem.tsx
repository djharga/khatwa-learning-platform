'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, FileText, Headphones, FileSpreadsheet, Download, Play, Lock, ArrowLeft } from 'lucide-react';
import { WordIcon, PDFIcon, VideoIcon, AudioIcon } from '@/components/ui/icons/FileTypeIcons';

interface CourseFile {
  id: string;
  name: string;
  type: 'video' | 'podcast' | 'excel' | 'word' | 'pdf';
  size?: string;
  duration?: string;
  description?: string;
  isProtected?: boolean;
  url?: string;
}

interface SubAxis {
  id: string;
  title: string;
  description?: string;
  files: CourseFile[];
}

interface MainAxis {
  id: string;
  title: string;
  description?: string;
  subAxes: SubAxis[];
}

interface CourseAxesSystemProps {
  mainAxes: MainAxis[];
  hasAccess?: boolean;
  courseId?: string;
  onFileClick?: (file: CourseFile) => void;
}

export default function CourseAxesSystem({ 
  mainAxes, 
  hasAccess = false,
  courseId,
  onFileClick 
}: CourseAxesSystemProps) {
  const router = useRouter();
  const [expandedMainAxis, setExpandedMainAxis] = useState<string | null>(null);
  const [expandedSubAxis, setExpandedSubAxis] = useState<string | null>(null);
  const [selectedSubAxis, setSelectedSubAxis] = useState<SubAxis | null>(null);

  const toggleMainAxis = (axisId: string) => {
    if (expandedMainAxis === axisId) {
      setExpandedMainAxis(null);
      setExpandedSubAxis(null);
      setSelectedSubAxis(null);
    } else {
      setExpandedMainAxis(axisId);
      setExpandedSubAxis(null);
      setSelectedSubAxis(null);
    }
  };

  const toggleSubAxis = (subAxisId: string, subAxis: SubAxis) => {
    if (expandedSubAxis === subAxisId) {
      setExpandedSubAxis(null);
      setSelectedSubAxis(null);
    } else {
      setExpandedSubAxis(subAxisId);
      setSelectedSubAxis(subAxis);
    }
  };

  const getFileIcon = (type: CourseFile['type']) => {
    const iconClass = "w-5 h-5 flex-shrink-0";
    switch (type) {
      case 'video':
        return <VideoIcon className={iconClass} size={20} />;
      case 'podcast':
        return <AudioIcon className={iconClass} size={20} />;
      case 'excel':
        return <FileSpreadsheet className={`${iconClass} text-green-600`} />;
      case 'word':
        return <WordIcon className={iconClass} size={20} />;
      case 'pdf':
        return <PDFIcon className={iconClass} size={20} />;
      default:
        return <FileText className={`${iconClass} text-gray-600`} />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* المحاور الرئيسية - على اليمين */}
      <div className="lg:col-span-2 space-y-4">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
          المحاور التعليمية
        </h3>
        
        <div className="space-y-3">
          {mainAxes.map((mainAxis) => {
            const isMainExpanded = expandedMainAxis === mainAxis.id;
            
            return (
              <div
                key={mainAxis.id}
                className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden bg-white dark:bg-neutral-800"
              >
                {/* المحور الرئيسي */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      // النقر على المحور الرئيسي يفتح/يغلق فقط
                      toggleMainAxis(mainAxis.id);
                    }}
                    className="flex-1 flex items-center justify-between p-4 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors text-right cursor-pointer group"
                    title="انقر لفتح/إغلاق المحور"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
                        {isMainExpanded ? (
                          <ChevronDown className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {mainAxis.title}
                        </h4>
                        {mainAxis.description && (
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                            {mainAxis.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                </div>

                {/* المحاور الفرعية */}
                <AnimatePresence>
                  {isMainExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50">
                        {mainAxis.subAxes.map((subAxis) => {
                          const isSubExpanded = expandedSubAxis === subAxis.id;
                          
                          return (
                            <div key={subAxis.id} className="border-b border-neutral-200 dark:border-neutral-700 last:border-b-0">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    // النقر على المحور الفرعي يفتح/يغلق ويعرض الملفات في الجانب
                                    toggleSubAxis(subAxis.id, subAxis);
                                  }}
                                  className="flex-1 flex items-center justify-between p-3 pr-6 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-right cursor-pointer group"
                                  title="انقر لعرض الملفات"
                                >
                                  <div className="flex items-center gap-3 flex-1">
                                    <div className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
                                      {isSubExpanded ? (
                                        <ChevronDown className="w-4 h-4 text-neutral-500 dark:text-neutral-500" />
                                      ) : (
                                        <ChevronRight className="w-4 h-4 text-neutral-500 dark:text-neutral-500" />
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <h5 className="font-medium text-sm text-neutral-800 dark:text-neutral-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                        {subAxis.title}
                                      </h5>
                                      {subAxis.description && (
                                        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                                          {subAxis.description}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-neutral-500 dark:text-neutral-500">
                                      {subAxis.files.length} ملف
                                    </span>
                                  </div>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* الملفات - على اليسار */}
      <div className="lg:col-span-1">
        <div className="sticky top-4">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
            الملفات
          </h3>
          
          {selectedSubAxis ? (
            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-3 text-sm">
                {selectedSubAxis.title}
              </h4>
              
              <div className="space-y-2">
                {selectedSubAxis.files.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors cursor-pointer border border-neutral-100 dark:border-neutral-700"
                    onClick={() => {
                      if (hasAccess || !file.isProtected) {
                        // إذا كان هناك courseId و lessonId في الملف، افتح صفحة الدرس
                        if (courseId && file.id && (hasAccess || !file.isProtected)) {
                          router.push(`/student/courses/${courseId}/lesson/${file.id}`);
                        } else {
                          onFileClick?.(file);
                        }
                      }
                    }}
                  >
                    <div className="flex-shrink-0">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                        {file.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {file.size && (
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">
                            {file.size}
                          </span>
                        )}
                        {file.duration && (
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">
                            • {file.duration}
                          </span>
                        )}
                      </div>
                    </div>
                    {file.isProtected && !hasAccess && (
                      <Lock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    )}
                    {(hasAccess || !file.isProtected) && (
                      <Download className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700 rounded-lg p-8 text-center">
              <FileText className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                اختر محور فرعي لعرض الملفات
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

