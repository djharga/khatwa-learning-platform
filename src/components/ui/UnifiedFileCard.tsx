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

/**
 * Unified File Card Component - بطاقة موحدة لجميع أنواع الملفات
 * يدعم: فيديو، صوت، PDF، Word، Excel
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

interface UnifiedFileCardProps {
  file: UnifiedFile;
  onOpen?: (file: UnifiedFile) => void;
  onDownload?: (file: UnifiedFile) => void;
  index?: number;
}

const UnifiedFileCard = ({ file, onOpen, onDownload, index = 0 }: UnifiedFileCardProps) => {
  const getFileIcon = () => {
    const iconClass = 'w-8 h-8';
    switch (file.type) {
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
    switch (file.type) {
      case 'video':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800',
          text: 'text-red-600 dark:text-red-400',
          iconBg: 'bg-red-100 dark:bg-red-900/40',
        };
      case 'audio':
        return {
          bg: 'bg-purple-50 dark:bg-purple-900/20',
          border: 'border-purple-200 dark:border-purple-800',
          text: 'text-purple-600 dark:text-purple-400',
          iconBg: 'bg-purple-100 dark:bg-purple-900/40',
        };
      case 'pdf':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800',
          text: 'text-red-600 dark:text-red-400',
          iconBg: 'bg-red-100 dark:bg-red-900/40',
        };
      case 'word':
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          border: 'border-blue-200 dark:border-blue-800',
          text: 'text-blue-600 dark:text-blue-400',
          iconBg: 'bg-blue-100 dark:bg-blue-900/40',
        };
      case 'excel':
        return {
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-200 dark:border-green-800',
          text: 'text-green-600 dark:text-green-400',
          iconBg: 'bg-green-100 dark:bg-green-900/40',
        };
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-900/20',
          border: 'border-gray-200 dark:border-gray-800',
          text: 'text-gray-600 dark:text-gray-400',
          iconBg: 'bg-gray-100 dark:bg-gray-900/40',
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -4 }}
      className={`group relative bg-white dark:bg-neutral-800 rounded-xl border-2 ${colors.border} ${colors.bg} overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300`}
    >
      {/* Thumbnail or Icon Area */}
      <div className="relative aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800">
        {file.thumbnail ? (
          <>
            <Image
              src={file.thumbnail}
              alt={file.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            {file.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <Play className="w-8 h-8 text-primary-600 ml-1" fill="currentColor" />
                </motion.div>
              </div>
            )}
          </>
        ) : (
          <div className={`absolute inset-0 flex items-center justify-center ${colors.iconBg}`}>
            <div className={colors.text}>{getFileIcon()}</div>
          </div>
        )}
        
        {/* Duration Badge for Video/Audio */}
        {(file.type === 'video' || file.type === 'audio') && file.duration && (
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDuration(file.duration)}
          </div>
        )}

        {/* Type Badge */}
        <div className={`absolute top-2 right-2 px-2 py-1 ${colors.iconBg} ${colors.text} text-xs font-semibold rounded`}>
          {getFileTypeLabel()}
        </div>
      </div>

      {/* File Info */}
      <div className="p-4">
        <h3 className="font-bold text-neutral-900 dark:text-white mb-2 line-clamp-2 text-sm lg:text-base">
          {file.name}
        </h3>

        {file.description && (
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
            {file.description}
          </p>
        )}

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-500 mb-3">
          {file.size && (
            <div className="flex items-center gap-1">
              <FileText className="w-3 h-3" />
              <span>{file.size}</span>
            </div>
          )}
          {file.downloads !== undefined && (
            <div className="flex items-center gap-1">
              <Download className="w-3 h-3" />
              <span>{file.downloads}</span>
            </div>
          )}
          {file.views !== undefined && (
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{file.views}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-700">
          {onOpen && (
            <motion.button
              onClick={() => onOpen(file)}
              className={`flex-1 px-3 py-2 ${colors.text} ${colors.iconBg} rounded-lg font-medium text-sm hover:opacity-80 transition-opacity flex items-center justify-center gap-2`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {file.type === 'video' ? (
                <>
                  <Play className="w-4 h-4" />
                  <span>مشاهدة</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  <span>فتح</span>
                </>
              )}
            </motion.button>
          )}
          {onDownload && (
            <motion.button
              onClick={() => onDownload(file)}
              className={`px-3 py-2 ${colors.text} ${colors.iconBg} rounded-lg hover:opacity-80 transition-opacity`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Download className="w-4 h-4" />
            </motion.button>
          )}
        </div>

        {/* Upload Info */}
        {(file.uploadedBy || file.uploadedAt) && (
          <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center justify-between text-xs text-neutral-500">
              {file.uploadedBy && (
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{file.uploadedBy}</span>
                </div>
              )}
              {file.uploadedAt && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{file.uploadedAt}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UnifiedFileCard;

