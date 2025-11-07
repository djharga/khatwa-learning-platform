'use client';

import { Download, ExternalLink, FileText, Image, File, Video, FileCode, FileSpreadsheet, FileType } from 'lucide-react';
import { motion } from 'framer-motion';

interface Resource {
  id: string;
  title: string;
  url: string;
  type: string;
}

interface ResourcesPanelProps {
  resources: Resource[];
}

export default function ResourcesPanel({ resources }: ResourcesPanelProps) {
  const getResourceIcon = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('pdf')) return FileText;
    if (lowerType.includes('doc') || lowerType.includes('word')) return FileType;
    if (lowerType.includes('xls') || lowerType.includes('excel') || lowerType.includes('spreadsheet')) return FileSpreadsheet;
    if (lowerType.includes('image') || lowerType.includes('jpg') || lowerType.includes('png') || lowerType.includes('gif')) return Image;
    if (lowerType.includes('video') || lowerType.includes('mp4') || lowerType.includes('avi')) return Video;
    if (lowerType.includes('code') || lowerType.includes('text') || lowerType.includes('txt')) return FileCode;
    return File;
  };

  const getResourceColor = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('pdf')) return {
      bg: 'from-red-600/25 to-red-700/25',
      border: 'border-red-500/40',
      icon: 'text-red-400',
      hover: 'hover:border-red-400/70 hover:shadow-red-500/30'
    };
    if (lowerType.includes('doc') || lowerType.includes('word')) return {
      bg: 'from-blue-600/25 to-blue-700/25',
      border: 'border-blue-500/40',
      icon: 'text-blue-400',
      hover: 'hover:border-blue-400/70 hover:shadow-blue-500/30'
    };
    if (lowerType.includes('xls') || lowerType.includes('excel') || lowerType.includes('spreadsheet')) return {
      bg: 'from-green-600/25 to-green-700/25',
      border: 'border-green-500/40',
      icon: 'text-green-400',
      hover: 'hover:border-green-400/70 hover:shadow-green-500/30'
    };
    if (lowerType.includes('video')) return {
      bg: 'from-purple-600/25 to-purple-700/25',
      border: 'border-purple-500/40',
      icon: 'text-purple-400',
      hover: 'hover:border-purple-400/70 hover:shadow-purple-500/30'
    };
    if (lowerType.includes('image')) return {
      bg: 'from-pink-600/25 to-pink-700/25',
      border: 'border-pink-500/40',
      icon: 'text-pink-400',
      hover: 'hover:border-pink-400/70 hover:shadow-pink-500/30'
    };
    return {
      bg: 'from-gray-600/25 to-gray-700/25',
      border: 'border-gray-500/40',
      icon: 'text-gray-400',
      hover: 'hover:border-gray-400/70 hover:shadow-gray-500/30'
    };
  };

  const handleDownload = (url: string, title: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = title;
    link.click();
  };

  if (resources.length === 0) {
    return (
      <div className="p-5 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-12 h-12 bg-gray-100 dark:bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-3">
            <File className="w-6 h-6 text-gray-400 dark:text-gray-600" />
          </div>
          <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-300 mb-1.5">لا توجد موارد متاحة</h3>
          <p className="text-gray-600 dark:text-gray-400 text-[10px]">لم يتم إضافة أي موارد تعليمية لهذا الدرس بعد.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-3 flex-shrink-0"
      >
        <h3 className="text-xs font-bold text-gray-900 dark:text-white mb-1.5 flex items-center gap-1.5">
          <Download className="w-3 h-3 text-blue-600 dark:text-blue-400" />
          الموارد التعليمية
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-[10px]">جميع الملفات والموارد المرفقة</p>
      </motion.div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2 pb-3">
          {resources.map((resource, index) => {
            const Icon = getResourceIcon(resource.type);
            const colors = getResourceColor(resource.type);

            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group flex items-center justify-between p-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className={`p-2 bg-gray-50 dark:bg-slate-700 rounded-lg flex-shrink-0`}>
                    <Icon className={`w-3 h-3 ${colors.icon}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-0.5 text-xs truncate">{resource.title}</h4>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">
                      {resource.type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDownload(resource.url, resource.title)}
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    aria-label="تحميل"
                  >
                    <Download className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  </motion.button>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    aria-label="فتح في علامة تبويب جديدة"
                  >
                    <ExternalLink className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

