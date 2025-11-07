'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  File,
  FileSpreadsheet,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export interface UploadedFile {
  id: string;
  file: File;
  type: 'excel' | 'pdf' | 'word' | 'other';
  size: number;
  preview?: string;
}

export interface FileUploaderProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  onFilesChange?: (files: UploadedFile[]) => void;
  maxFiles?: number;
}

export default function FileUploader({
  accept = '.xlsx,.xls,.pdf,.doc,.docx',
  multiple = true,
  maxSize = 10,
  onFilesChange,
  maxFiles = 5,
}: FileUploaderProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileType = (file: File): UploadedFile['type'] => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (['xlsx', 'xls'].includes(extension || '')) return 'excel';
    if (extension === 'pdf') return 'pdf';
    if (['doc', 'docx'].includes(extension || '')) return 'word';
    return 'other';
  };

  const getFileIcon = (type: UploadedFile['type']) => {
    switch (type) {
      case 'excel':
        return FileSpreadsheet;
      case 'pdf':
        return FileText;
      case 'word':
        return FileText;
      default:
        return File;
    }
  };

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize * 1024 * 1024) {
      return `حجم الملف أكبر من ${maxSize} ميجابايت`;
    }
    return null;
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    setError(null);
    const newFiles: UploadedFile[] = [];

    Array.from(files).forEach((file) => {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      if (uploadedFiles.length + newFiles.length >= maxFiles) {
        setError(`يمكن رفع ${maxFiles} ملفات كحد أقصى`);
        return;
      }

      newFiles.push({
        id: `${Date.now()}-${Math.random()}`,
        file,
        type: getFileType(file),
        size: file.size,
      });
    });

    const updatedFiles = [...uploadedFiles, ...newFiles];
    setUploadedFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeFile = (id: string) => {
    const updatedFiles = uploadedFiles.filter(f => f.id !== id);
    setUploadedFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
          isDragging
            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
            : 'border-gray-300 dark:border-neutral-700 hover:border-indigo-400 dark:hover:border-indigo-600 bg-gray-50 dark:bg-neutral-900/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          className="hidden"
        />

        <motion.div
          animate={{ scale: isDragging ? 1.05 : 1 }}
          className="space-y-4"
        >
          <div className="flex justify-center">
            <div className={`p-4 rounded-full ${
              isDragging
                ? 'bg-indigo-100 dark:bg-indigo-900/30'
                : 'bg-gray-100 dark:bg-neutral-800'
            }`}>
              <Upload className={`w-8 h-8 ${
                isDragging
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-400 dark:text-gray-500'
              }`} />
            </div>
          </div>

          <div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {isDragging ? 'أفلت الملفات هنا' : 'اسحب الملفات أو انقر للرفع'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {accept} (حد أقصى {maxSize} ميجابايت لكل ملف)
            </p>
          </div>
        </motion.div>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <span className="text-sm text-red-700 dark:text-red-400">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            الملفات المرفوعة ({uploadedFiles.length})
          </h4>
          <div className="space-y-2">
            {uploadedFiles.map((uploadedFile) => {
              const Icon = getFileIcon(uploadedFile.type);
              return (
                <motion.div
                  key={uploadedFile.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 p-3 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg"
                >
                  <div className="p-2 bg-gray-100 dark:bg-neutral-700 rounded-lg">
                    <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {uploadedFile.file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(uploadedFile.size)}
                    </p>
                  </div>

                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(uploadedFile.id);
                    }}
                    className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

