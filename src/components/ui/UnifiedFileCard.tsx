'use client';

import { motion } from 'framer-motion';
import {
  FileText,
  FileSpreadsheet,
  File,
  Download,
  Eye,
  Play,
  Clock,
  User,
  Calendar,
} from 'lucide-react';
import Image from 'next/image';
import { WordIcon, PDFIcon, VideoIcon, AudioIcon } from './icons/FileTypeIcons';
import { MotionWrapper } from './motion/MotionWrapper';
import type { CourseContent } from '@/types/course-management';

/**
 * Unified File Card Component - بطاقة موحدة لجميع أنواع الملفات
 * يدعم: فيديو، صوت، PDF، Word، Excel
 * يدعم أيضاً: CourseContent type من نظام إدارة الدورات
 */

export type FileType = 'video' | 'audio' | 'pdf' | 'word' | 'excel' | 'other';

export interface UnifiedFile {
  id: string;
  name: string;
  type: FileType;
  size: string;
  duration?: number; // للفيديو والصوت (بالثواني)
  thumbnail?: string;
  uploadedBy?: string;
  uploadedAt?: string;
  downloads?: number;
  views?: number;
  description?: string;
  url?: string;
  tags?: string[];
}

// Helper function to convert CourseContent to UnifiedFile
function convertCourseContentToUnifiedFile(content: CourseContent): UnifiedFile {
  // Map CourseContent type to UnifiedFile type
  const typeMap: Record<CourseContent['type'], FileType> = {
    video: 'video',
    audio: 'audio',
    document: 'pdf',
    image: 'other',
    link: 'other',
    assignment: 'pdf',
    quiz: 'other',
  };

  // Format file size from bytes to string
  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} بايت`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} كيلوبايت`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} ميجابايت`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} جيجابايت`;
  };

  return {
    id: content.id,
    name: content.title,
    type: typeMap[content.type] || 'other',
    size: formatFileSize(content.fileSize),
    duration: content.duration,
    thumbnail: content.thumbnailUrl,
    uploadedBy: content.uploadedBy,
    uploadedAt: content.createdAt,
    downloads: content.downloadCount,
    views: content.viewCount,
    description: content.description,
    url: content.fileUrl,
    tags: undefined,
  };
}

interface UnifiedFileCardProps {
  file: UnifiedFile | CourseContent;
  onOpen?: (file: UnifiedFile | CourseContent) => void;
  onDownload?: (file: UnifiedFile | CourseContent) => void;
  index?: number;
}

const UnifiedFileCard = ({ file, onOpen, onDownload, index = 0 }: UnifiedFileCardProps) => {
  // Normalize file to UnifiedFile format
  const normalizedFile: UnifiedFile = 'name' in file 
    ? file as UnifiedFile 
    : convertCourseContentToUnifiedFile(file as CourseContent);

  // Create callback wrappers for CourseContent compatibility
  const handleOpen = () => {
    if (onOpen) {
      if ('name' in file) {
        onOpen(file as UnifiedFile);
      } else {
        // For CourseContent, pass the original file but also support string ID callback
        onOpen(file as CourseContent);
      }
    }
  };

  const handleDownload = () => {
    if (onDownload) {
      if ('name' in file) {
        onDownload(file as UnifiedFile);
      } else {
        onDownload(file as CourseContent);
      }
    }
  };

  const getFileIcon = () => {
    const iconClass = 'w-8 h-8 transition-transform duration-200 group-hover:scale-110';
    switch (normalizedFile.type) {
      case 'video':
        return <VideoIcon className={iconClass} size={32} />;
      case 'audio':
        return <AudioIcon className={iconClass} size={32} />;
      case 'pdf':
        return <PDFIcon className={iconClass} size={32} />;
      case 'word':
        return <WordIcon className={iconClass} size={32} />;
      case 'excel':
        return <FileSpreadsheet className={iconClass} />;
      default:
        return <File className={iconClass} />;
    }
  };

  const getFileColor = () => {
    switch (normalizedFile.type) {
      case 'video':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800',
          text: 'text-red-600 dark:text-red-400',
          iconBg: 'bg-red-100 dark:bg-red-900/40',
          gradient: 'from-red-500 to-red-600',
        };
      case 'audio':
        return {
          bg: 'bg-purple-50 dark:bg-purple-900/20',
          border: 'border-purple-200 dark:border-purple-800',
          text: 'text-purple-600 dark:text-purple-400',
          iconBg: 'bg-purple-100 dark:bg-purple-900/40',
          gradient: 'from-purple-500 to-purple-600',
        };
      case 'pdf':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800',
          text: 'text-red-600 dark:text-red-400',
          iconBg: 'bg-red-100 dark:bg-red-900/40',
          gradient: 'from-red-500 to-red-600',
        };
      case 'word':
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          border: 'border-blue-200 dark:border-blue-800',
          text: 'text-blue-600 dark:text-blue-400',
          iconBg: 'bg-blue-100 dark:bg-blue-900/40',
          gradient: 'from-blue-500 to-blue-600',
        };
      case 'excel':
        return {
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-200 dark:border-green-800',
          text: 'text-green-600 dark:text-green-400',
          iconBg: 'bg-green-100 dark:bg-green-900/40',
          gradient: 'from-green-500 to-green-600',
        };
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-900/20',
          border: 'border-gray-200 dark:border-gray-800',
          text: 'text-gray-600 dark:text-gray-400',
          iconBg: 'bg-gray-100 dark:bg-gray-900/40',
          gradient: 'from-gray-500 to-gray-600',
        };
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getFileTypeLabel = () => {
    switch (file.type) {
      case 'video':
        return 'فيديو';
      case 'audio':
        return 'صوت';
      case 'pdf':
        return 'PDF';
      case 'word':
        return 'Word';
      case 'excel':
        return 'Excel';
      default:
        return 'ملف';
    }
  };

  const colors = getFileColor();

  return (
    <MotionWrapper
      animation="scale"
      delay={index * 0.05}
      duration={0.4}
      className={`group relative bg-white dark:bg-neutral-800 rounded-2xl border-2 ${colors.border} ${colors.bg} overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 h-full flex flex-col`}
    >
      {/* Decorative Background Pattern */}
      <div className={`absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${colors.gradient} to-transparent`} />
      
      {/* Thumbnail or Icon Area */}
      <div className="relative aspect-video bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-100 dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-700 overflow-hidden">
        {normalizedFile.thumbnail ? (
          <>
            <Image
              src={normalizedFile.thumbnail}
              alt={normalizedFile.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent group-hover:from-black/50 transition-colors" />
            {normalizedFile.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/95 dark:bg-neutral-800/95 rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 group-hover:rotate-3 active:scale-95 transition-all duration-300">
                  <Play className="w-10 h-10 text-primary-600 dark:text-primary-400 ml-1" fill="currentColor" />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className={`absolute inset-0 flex items-center justify-center ${colors.iconBg} group-hover:scale-110 transition-transform duration-500`}>
            <motion.div 
              className={colors.text}
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: 'easeInOut',
              }}
            >
              {getFileIcon()}
            </motion.div>
          </div>
        )}
        
        {/* Duration Badge for Video/Audio */}
        {(normalizedFile.type === 'video' || normalizedFile.type === 'audio') && normalizedFile.duration && (
          <MotionWrapper
            animation="scale"
            delay={0.1}
            className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/80 backdrop-blur-sm text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-lg"
          >
            <Clock className="w-3.5 h-3.5" />
            {formatDuration(normalizedFile.duration)}
          </MotionWrapper>
        )}

        {/* Type Badge */}
        <MotionWrapper
          animation="fade"
          delay={0.15}
          className={`absolute top-3 right-3 px-3 py-1.5 ${colors.iconBg} ${colors.text} text-xs font-bold rounded-lg shadow-md backdrop-blur-sm border border-white/20`}
        >
          {getFileTypeLabel()}
        </MotionWrapper>
      </div>

      {/* File Info */}
      <div className="p-5 relative z-10 flex-1 flex flex-col">
        <h3 className="font-bold text-neutral-900 dark:text-white mb-3 line-clamp-2 text-base lg:text-lg group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {normalizedFile.name}
        </h3>

        {normalizedFile.description && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2 leading-relaxed">
            {normalizedFile.description}
          </p>
        )}

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {normalizedFile.size && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 dark:bg-neutral-700/50 rounded-lg text-xs font-medium text-neutral-700 dark:text-neutral-300">
              <FileText className="w-3.5 h-3.5" />
              <span>{normalizedFile.size}</span>
            </div>
          )}
          {normalizedFile.downloads !== undefined && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-xs font-medium text-blue-700 dark:text-blue-400">
              <Download className="w-3.5 h-3.5" />
              <span>{normalizedFile.downloads.toLocaleString()}</span>
            </div>
          )}
          {normalizedFile.views !== undefined && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-xs font-medium text-purple-700 dark:text-purple-400">
              <Eye className="w-3.5 h-3.5" />
              <span>{normalizedFile.views.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t-2 border-neutral-200/50 dark:border-neutral-700/50 mt-auto">
          {onOpen && (
            <button
              onClick={handleOpen}
              className={`flex-1 px-4 py-2.5 bg-gradient-to-r ${colors.gradient} text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group/btn`}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
              {normalizedFile.type === 'video' ? (
                <>
                  <Play className="w-4 h-4 relative z-10" fill="currentColor" />
                  <span className="relative z-10">مشاهدة</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">فتح</span>
                </>
              )}
            </button>
          )}
          {onDownload && (
            <button
              onClick={handleDownload}
              className={`px-4 py-2.5 ${colors.iconBg} ${colors.text} rounded-xl hover:shadow-lg hover:scale-110 hover:rotate-3 active:scale-90 transition-all duration-300 border-2 ${colors.border} relative overflow-hidden group/download`}
            >
              <Download className="w-5 h-5 relative z-10" />
            </button>
          )}
        </div>

        {/* Upload Info */}
        {(normalizedFile.uploadedBy || normalizedFile.uploadedAt) && (
          <div className="mt-4 pt-4 border-t border-neutral-200/50 dark:border-neutral-700/50">
            <div className="flex items-center justify-between text-xs">
              {normalizedFile.uploadedBy && (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-neutral-50 dark:bg-neutral-700/30 rounded-lg text-neutral-600 dark:text-neutral-400">
                  <User className="w-3.5 h-3.5" />
                  <span className="font-medium">{normalizedFile.uploadedBy}</span>
                </div>
              )}
              {normalizedFile.uploadedAt && (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-neutral-50 dark:bg-neutral-700/30 rounded-lg text-neutral-600 dark:text-neutral-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="font-medium">{normalizedFile.uploadedAt}</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Tags */}
        {normalizedFile.tags && normalizedFile.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {normalizedFile.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700/50 text-neutral-600 dark:text-neutral-400 text-[10px] font-medium rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </MotionWrapper>
  );
};

export default UnifiedFileCard;

