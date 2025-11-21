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
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.4, type: "spring", stiffness: 100 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group relative bg-white dark:bg-neutral-800 rounded-2xl border-2 ${colors.border} ${colors.bg} overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 h-full flex flex-col`}
    >
      {/* Decorative Background Pattern */}
      <div className={`absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${colors.gradient} to-transparent`} />
      
      {/* Thumbnail or Icon Area */}
      <div className="relative aspect-video bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-100 dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-700 overflow-hidden">
        {file.thumbnail ? (
          <>
            <Image
              src={file.thumbnail}
              alt={file.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent group-hover:from-black/50 transition-colors" />
            {file.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-20 h-20 bg-white/95 dark:bg-neutral-800/95 rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-10 h-10 text-primary-600 dark:text-primary-400 ml-1" fill="currentColor" />
                </motion.div>
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
                repeatDelay: 3
              }}
            >
              {getFileIcon()}
            </motion.div>
          </div>
        )}
        
        {/* Duration Badge for Video/Audio */}
        {(file.type === 'video' || file.type === 'audio') && file.duration && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/80 backdrop-blur-sm text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-lg"
          >
            <Clock className="w-3.5 h-3.5" />
            {formatDuration(file.duration)}
          </motion.div>
        )}

        {/* Type Badge */}
        <motion.div 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className={`absolute top-3 right-3 px-3 py-1.5 ${colors.iconBg} ${colors.text} text-xs font-bold rounded-lg shadow-md backdrop-blur-sm border border-white/20`}
        >
          {getFileTypeLabel()}
        </motion.div>
      </div>

      {/* File Info */}
      <div className="p-5 relative z-10 flex-1 flex flex-col">
        <h3 className="font-bold text-neutral-900 dark:text-white mb-3 line-clamp-2 text-base lg:text-lg group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {file.name}
        </h3>

        {file.description && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2 leading-relaxed">
            {file.description}
          </p>
        )}

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {file.size && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 dark:bg-neutral-700/50 rounded-lg text-xs font-medium text-neutral-700 dark:text-neutral-300">
              <FileText className="w-3.5 h-3.5" />
              <span>{file.size}</span>
            </div>
          )}
          {file.downloads !== undefined && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-xs font-medium text-blue-700 dark:text-blue-400">
              <Download className="w-3.5 h-3.5" />
              <span>{file.downloads.toLocaleString()}</span>
            </div>
          )}
          {file.views !== undefined && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-xs font-medium text-purple-700 dark:text-purple-400">
              <Eye className="w-3.5 h-3.5" />
              <span>{file.views.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t-2 border-neutral-200/50 dark:border-neutral-700/50 mt-auto">
          {onOpen && (
            <motion.button
              onClick={() => onOpen(file)}
              className={`flex-1 px-4 py-2.5 bg-gradient-to-r ${colors.gradient} text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group/btn`}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
              {file.type === 'video' ? (
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
            </motion.button>
          )}
          {onDownload && (
            <motion.button
              onClick={() => onDownload(file)}
              className={`px-4 py-2.5 ${colors.iconBg} ${colors.text} rounded-xl hover:shadow-lg transition-all duration-300 border-2 ${colors.border} relative overflow-hidden group/download`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Download className="w-5 h-5 relative z-10" />
            </motion.button>
          )}
        </div>

        {/* Upload Info */}
        {(file.uploadedBy || file.uploadedAt) && (
          <div className="mt-4 pt-4 border-t border-neutral-200/50 dark:border-neutral-700/50">
            <div className="flex items-center justify-between text-xs">
              {file.uploadedBy && (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-neutral-50 dark:bg-neutral-700/30 rounded-lg text-neutral-600 dark:text-neutral-400">
                  <User className="w-3.5 h-3.5" />
                  <span className="font-medium">{file.uploadedBy}</span>
                </div>
              )}
              {file.uploadedAt && (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-neutral-50 dark:bg-neutral-700/30 rounded-lg text-neutral-600 dark:text-neutral-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="font-medium">{file.uploadedAt}</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Tags */}
        {file.tags && file.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {file.tags.slice(0, 3).map((tag, idx) => (
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
    </motion.div>
  );
};

export default UnifiedFileCard;

