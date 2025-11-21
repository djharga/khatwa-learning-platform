'use client';

import { motion } from 'framer-motion';
import { Download, ExternalLink, FileText, Play, Music, File } from 'lucide-react';
import type { CourseContent } from '@/types/course-management';

interface FileCardProps {
  file: CourseContent;
  onOpen?: (fileId: string) => void;
  onDownload?: (fileId: string) => void;
}

export default function FileCard({ file, onOpen, onDownload }: FileCardProps) {
  const getFileIcon = () => {
    switch (file.type) {
      case 'video':
        return <Play className="w-5 h-5" strokeWidth={2.5} />;
      case 'audio':
        return <Music className="w-5 h-5" strokeWidth={2.5} />;
      case 'document':
        return <FileText className="w-5 h-5" strokeWidth={2.5} />;
      default:
        return <File className="w-5 h-5" strokeWidth={2.5} />;
    }
  };

  const getFileIconBackground = () => {
    switch (file.type) {
      case 'video':
        return 'bg-[#EDE9FE] dark:bg-[#5B36E8]/20'; // Light purple
      case 'audio':
        return 'bg-[#FCE7F3] dark:bg-pink-900/20'; // Light pink
      case 'document':
        return 'bg-[#DBEAFE] dark:bg-blue-900/20'; // Light blue
      default:
        return 'bg-[#F3F4F6] dark:bg-neutral-700/50'; // Neutral grey
    }
  };

  const getFileIconColor = () => {
    switch (file.type) {
      case 'video':
        return 'text-[#8B5CF6] dark:text-[#A78BFA]'; // Purple
      case 'audio':
        return 'text-[#EC4899] dark:text-[#F472B6]'; // Pink
      case 'document':
        return 'text-[#3B82F6] dark:text-[#60A5FA]'; // Blue
      default:
        return 'text-[#6B7280] dark:text-neutral-400'; // Grey
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} بايت`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} كيلوبايت`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} ميجابايت`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} جيجابايت`;
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}`;
    }
    return `${minutes} دقيقة`;
  };

  const getFileTypeLabel = () => {
    switch (file.type) {
      case 'video':
        return 'فيديو';
      case 'audio':
        return 'صوتي';
      case 'document':
        return 'مستند';
      default:
        return 'ملف';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.21, 1.11, 0.81, 0.99] }}
      className="bg-[#F7F8FC] dark:bg-neutral-800/50 rounded-[14px] border border-[#E5E7EB] dark:border-neutral-700 p-4 transition-all duration-200 cursor-pointer group hover:bg-white dark:hover:bg-neutral-800 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:shadow-[#5B36E8]/10 dark:hover:shadow-[#5B36E8]/20"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      dir="rtl"
    >
      <div className="flex items-start gap-3">
        {/* File Type Icon */}
        <div className={`flex-shrink-0 w-10 h-10 ${getFileIconBackground()} rounded-[10px] flex items-center justify-center ${getFileIconColor()}`}>
          {getFileIcon()}
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          {/* File Title */}
          <h3 className="text-base font-semibold text-[#111827] dark:text-white mb-1 truncate group-hover:text-[#5B36E8] dark:group-hover:text-[#6D4AFF] transition-colors duration-200">
            {file.title}
          </h3>

          {/* File Description */}
          {file.description && (
            <p className="text-sm text-[#6B7280] dark:text-neutral-400 mb-2 line-clamp-2 leading-5">
              {file.description}
            </p>
          )}

          {/* File Metadata */}
          <div className="flex items-center gap-2 text-xs text-[#9CA3AF] dark:text-neutral-500 mb-3">
            {file.type && (
              <>
                <span>{getFileTypeLabel()}</span>
                {file.duration && <span>•</span>}
              </>
            )}
            {file.duration && (
              <span>{formatDuration(file.duration)}</span>
            )}
            {file.fileSize && (
              <>
                <span>•</span>
                <span>{formatFileSize(file.fileSize)}</span>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {onOpen && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen(file.id);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#5B36E8] hover:bg-[#6D4AFF] text-white rounded-[10px] text-sm font-semibold transition-all duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] min-h-[36px]"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink className="w-4 h-4" strokeWidth={2.5} />
                <span>فتح</span>
              </motion.button>
            )}
            {onDownload && file.fileUrl && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onDownload(file.id);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-neutral-800 text-[#5B36E8] dark:text-[#6D4AFF] border-[1.5px] border-[#5B36E8] dark:border-[#6D4AFF] rounded-[10px] text-sm font-semibold transition-all duration-200 hover:bg-[#F7F8FC] dark:hover:bg-neutral-700/50 hover:border-[#6D4AFF] min-h-[36px]"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4" strokeWidth={2.5} />
                <span>تحميل</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}