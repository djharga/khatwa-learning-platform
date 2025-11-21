'use client';

/**
 * FileList Component - Displays files for selected unit
 * 
 * Features:
 * - File cards with icons, titles, descriptions
 * - Open and download actions
 * - Empty state when no files
 * - Skeleton loader
 * 
 * File location: app/(dashboard)/student/courses/[courseId]/lesson/FileList.tsx
 */

import { FileText, Download, ExternalLink, Video, Image, File, Music } from 'lucide-react';
import type { CourseContent } from '@/types/course-management';

interface FileListProps {
  files: CourseContent[];
  selectedUnitTitle?: string;
  onFileOpen?: (fileId: string) => void;
  onFileDownload?: (fileId: string) => void;
  isLoading?: boolean;
}

// Get icon based on file type
const getFileIcon = (type: CourseContent['type']) => {
  switch (type) {
    case 'video':
      return Video;
    case 'image':
      return Image;
    case 'audio':
      return Music;
    case 'document':
    case 'assignment':
    case 'quiz':
      return FileText;
    default:
      return File;
  }
};

// Format file size
const formatFileSize = (bytes?: number): string => {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default function FileList({
  files,
  selectedUnitTitle = 'ملفات الوحدة',
  onFileOpen,
  onFileDownload,
  isLoading = false,
}: FileListProps) {
  // Skeleton loader
  if (isLoading) {
    return (
      <div className="w-full min-h-full bg-white dark:bg-neutral-800 border-inline-start border-[#E5E7EB] dark:border-neutral-700 flex flex-col">
        <div className="sticky top-0 z-10 p-6 border-b-2 border-[#E5E7EB] dark:border-neutral-700 bg-white dark:bg-neutral-800">
          <div className="h-5 bg-[#F3F4F6] dark:bg-neutral-700/50 rounded-md animate-pulse mb-2 max-w-[150px]" />
          <div className="h-4 bg-[#F3F4F6] dark:bg-neutral-700/50 rounded-md w-2/3 animate-pulse max-w-[100px]" />
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-[#F7F8FC] dark:bg-neutral-700/50 rounded-xl animate-pulse border border-[#E5E7EB] dark:border-neutral-700" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full min-h-full bg-white dark:bg-neutral-800 border-inline-start border-[#E5E7EB] dark:border-neutral-700 flex flex-col shadow-sm" 
      dir="rtl"
    >
      {/* Sticky Header - Compact */}
      <div className="sticky top-0 z-10 p-4 border-b border-[#E5E7EB] dark:border-neutral-700 bg-white dark:bg-neutral-800 backdrop-blur-sm">
        <h2 className="text-sm font-semibold text-[#111827] dark:text-white mb-0.5">
          ملفات الوحدة
        </h2>
        <p className="text-xs text-[#6B7280] dark:text-neutral-400 font-normal truncate">
          {selectedUnitTitle}
        </p>
      </div>

      {/* Files List */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-[#E5E7EB] dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent">
        {files.length === 0 ? (
          /* Empty State - Compact */
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="w-14 h-14 bg-[#F3F4F6] dark:bg-neutral-700/50 rounded-xl flex items-center justify-center mb-3">
              <FileText className="w-8 h-8 text-[#D1D5DB] dark:text-neutral-600" />
            </div>
            <p className="text-sm text-[#6B7280] dark:text-neutral-400 text-center font-medium mb-1">
              لا توجد ملفات متاحة
            </p>
            <p className="text-xs text-[#9CA3AF] dark:text-neutral-500 text-center">
              لم يتم إضافة أي ملفات لهذه الوحدة بعد
            </p>
          </div>
        ) : (
          <div className="space-y-3" role="list">
            {files.map((file) => {
              const IconComponent = getFileIcon(file.type);
              const fileSize = formatFileSize(file.fileSize);

              return (
                <div
                  key={file.id}
                  className="bg-[#F7F8FC] dark:bg-neutral-700/30 rounded-xl border border-[#E5E7EB] dark:border-neutral-700 p-3 transition-all duration-200 ease-out hover:shadow-sm hover:border-[#5B36E8]/20 dark:hover:border-[#5B36E8]/40"
                  role="listitem"
                >
                  {/* File Header */}
                  <div className="flex items-start gap-3 mb-2.5">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#5B36E8] to-[#7A4CFF] rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-[#111827] dark:text-white mb-1 line-clamp-2">
                        {file.title}
                      </h3>
                      {file.description && (
                        <p className="text-xs text-[#6B7280] dark:text-neutral-400 line-clamp-2 mb-1.5">
                          {file.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 text-[10px] text-[#9CA3AF] dark:text-neutral-500">
                        {fileSize && <span>{fileSize}</span>}
                        {file.duration && (
                          <span>{Math.floor(file.duration / 60)}:{(file.duration % 60).toString().padStart(2, '0')}</span>
                        )}
                        {file.isRequired && (
                          <span className="text-[#5B36E8] dark:text-[#6D4AFF] font-medium">مطلوب</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* File Actions */}
                  <div className="flex items-center gap-2">
                    {file.fileUrl && (
                      <>
                        {onFileOpen && (
                          <button
                            onClick={() => onFileOpen(file.id)}
                            className="flex-1 px-3 py-1.5 bg-white dark:bg-neutral-700 border border-[#E5E7EB] dark:border-neutral-600 rounded-lg text-xs font-medium text-[#6B7280] dark:text-neutral-300 hover:bg-[#F5F6FA] dark:hover:bg-neutral-600 transition-all duration-200 ease-out flex items-center justify-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#5B36E8] focus-visible:outline-offset-2"
                            aria-label={`فتح ${file.title}`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            فتح
                          </button>
                        )}
                        {onFileDownload && (
                          <button
                            onClick={() => onFileDownload(file.id)}
                            className="flex-1 px-3 py-1.5 bg-gradient-to-r from-[#5B36E8] to-[#7A4CFF] hover:from-[#4C2FD8] hover:to-[#6B36E8] text-white rounded-lg text-xs font-medium transition-all duration-200 ease-out shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#5B36E8] focus-visible:outline-offset-2"
                            aria-label={`تحميل ${file.title}`}
                          >
                            <Download className="w-3.5 h-3.5" />
                            تحميل
                          </button>
                        )}
                      </>
                    )}
                    {!file.fileUrl && file.content && onFileOpen && (
                      <button
                        onClick={() => onFileOpen(file.id)}
                        className="w-full px-3 py-1.5 bg-gradient-to-r from-[#5B36E8] to-[#7A4CFF] hover:from-[#4C2FD8] hover:to-[#6B36E8] text-white rounded-lg text-xs font-medium transition-all duration-200 ease-out shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#5B36E8] focus-visible:outline-offset-2"
                        aria-label={`فتح ${file.title}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        فتح المحتوى
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

