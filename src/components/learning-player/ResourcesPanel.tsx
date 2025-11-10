'use client';

import {
  Download,
  ExternalLink,
  FileText,
  Image,
  File,
  Video,
  FileCode,
  FileSpreadsheet,
  FileType,
} from 'lucide-react';
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
    const lower = type.toLowerCase();
    if (lower.includes('pdf')) return FileText;
    if (lower.includes('doc') || lower.includes('word')) return FileType;
    if (lower.includes('xls') || lower.includes('excel')) return FileSpreadsheet;
    if (lower.includes('image') || lower.includes('jpg') || lower.includes('png') || lower.includes('gif')) return Image;
    if (lower.includes('video') || lower.includes('mp4') || lower.includes('avi')) return Video;
    if (lower.includes('code') || lower.includes('txt')) return FileCode;
    return File;
  };

  const getResourceColor = (type: string) => {
    const lower = type.toLowerCase();
    if (lower.includes('pdf'))
      return { icon: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' };
    if (lower.includes('word'))
      return { icon: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' };
    if (lower.includes('excel'))
      return { icon: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200' };
    if (lower.includes('video'))
      return { icon: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-200' };
    if (lower.includes('image'))
      return { icon: 'text-pink-500', bg: 'bg-pink-50', border: 'border-pink-200' };
    return { icon: 'text-gray-500', bg: 'bg-gray-50', border: 'border-gray-200' };
  };

  const handleDownload = (url: string, title: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (resources.length === 0)
    return (
      <div className="p-6 text-center flex flex-col items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-inner">
            <File className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-xs font-semibold text-gray-800 mb-1">لا توجد موارد</h3>
          <p className="text-[10px] text-gray-500">لم يتم إضافة ملفات لهذا الدرس بعد.</p>
        </motion.div>
      </div>
    );

  return (
    <div className="p-4 h-full flex flex-col">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-3 flex-shrink-0"
      >
        <h3 className="text-xs font-bold text-gray-900 mb-1.5 flex items-center gap-1.5">
          <Download className="w-3 h-3 text-blue-600" />
          الموارد التعليمية
        </h3>
        <p className="text-gray-500 text-[10px]">جميع الملفات المرفقة بهذا الدرس</p>
      </motion.div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2 pb-3">
          {resources.map((res, i) => {
            const Icon = getResourceIcon(res.type);
            const color = getResourceColor(res.type);

            return (
              <motion.div
                key={res.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                className={`group flex items-center justify-between p-2.5 rounded-lg border ${color.border} ${color.bg} hover:shadow-md transition-all`}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="p-2 bg-white rounded-md flex-shrink-0 shadow-sm">
                    <Icon className={`w-3.5 h-3.5 ${color.icon}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 text-xs truncate mb-0.5">
                      {res.title}
                    </h4>
                    <span className="text-[10px] text-gray-500 uppercase">{res.type}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDownload(res.url, res.title)}
                    className="p-1.5 hover:bg-white rounded-lg transition"
                    aria-label="تحميل"
                  >
                    <Download className="w-3 h-3 text-blue-600" />
                  </motion.button>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 hover:bg-white rounded-lg transition"
                    aria-label="فتح"
                  >
                    <ExternalLink className="w-3 h-3 text-purple-600" />
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
