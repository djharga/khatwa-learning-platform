'use client';

import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import UnifiedFileCard from '@/components/ui/UnifiedFileCard';
import type { CourseContent } from '@/types/course-management';

interface FileListProps {
  files: CourseContent[];
  selectedUnitTitle?: string;
  onFileOpen?: (fileId: string) => void;
  onFileDownload?: (fileId: string) => void;
  isLoading?: boolean;
}

export default function FileList({
  files,
  selectedUnitTitle = 'ملفات الوحدة',
  onFileOpen,
  onFileDownload,
  isLoading = false,
}: FileListProps) {
  if (isLoading) {
    return (
      <div className="w-full lg:w-[320px] h-full bg-white dark:bg-neutral-800 border-inline-start border-[#E5E7EB] dark:border-neutral-700 flex flex-col flex-shrink-0 overflow-hidden">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 p-6 border-b-2 border-[#E5E7EB] dark:border-neutral-700 bg-white dark:bg-neutral-800 backdrop-blur-sm">
          <div className="h-5 bg-[#F3F4F6] dark:bg-neutral-700/50 rounded-md animate-pulse mb-2 max-w-[150px]" />
          <div className="h-4 bg-[#F3F4F6] dark:bg-neutral-700/50 rounded-md w-2/3 animate-pulse max-w-[100px]" />
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-[#F7F8FC] dark:bg-neutral-700/50 rounded-[14px] animate-pulse border border-[#E5E7EB] dark:border-neutral-700" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full lg:w-[320px] bg-white dark:bg-neutral-800 border-inline-start border-[#E5E7EB] dark:border-neutral-700 flex flex-col flex-shrink-0 overflow-hidden shadow-sm h-full" 
      dir="rtl"
    >
      {/* Sticky Header - Academic design */}
      <div className="sticky top-0 z-10 p-6 border-b-2 border-[#E5E7EB] dark:border-neutral-700 bg-white dark:bg-neutral-800 backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-[#111827] dark:text-white mb-1">
          ملفات الوحدة
        </h2>
        <p className="text-sm text-[#6B7280] dark:text-neutral-400 font-normal">
          {selectedUnitTitle}
        </p>
      </div>

      {/* Files List - Academic design with smooth animations */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-[#E5E7EB] dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent hover:scrollbar-thumb-[#D1D5DB] dark:hover:scrollbar-thumb-neutral-600">
        {files.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-16 px-8"
          >
            <div className="w-20 h-20 bg-[#F3F4F6] dark:bg-neutral-700/50 rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-10 h-10 text-[#D1D5DB] dark:text-neutral-600" />
            </div>
            <h3 className="text-lg font-semibold text-[#6B7280] dark:text-neutral-300 mb-2">
              لا توجد ملفات متاحة
            </h3>
            <p className="text-sm text-[#9CA3AF] dark:text-neutral-500 text-center leading-relaxed max-w-[240px]">
              لم يتم إضافة أي ملفات لهذه الوحدة بعد
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {files.map((file, index) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.05,
                  duration: 0.3,
                  ease: [0.21, 1.11, 0.81, 0.99]
                }}
              >
                <UnifiedFileCard
                  file={file}
                  onOpen={onFileOpen ? (file) => {
                    // UnifiedFileCard passes the file object, extract id for CourseContent
                    const fileId = 'id' in file ? file.id : (file as CourseContent).id;
                    onFileOpen(fileId);
                  } : undefined}
                  onDownload={onFileDownload ? (file) => {
                    // UnifiedFileCard passes the file object, extract id for CourseContent
                    const fileId = 'id' in file ? file.id : (file as CourseContent).id;
                    onFileDownload(fileId);
                  } : undefined}
                  index={index}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}