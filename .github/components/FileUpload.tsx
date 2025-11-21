'use client';

/**
 * FileUpload Component
 * مكون رفع الملفات مع تتبع التقدم
 */

import React, { useState, useCallback, useRef } from 'react';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import { api } from '@/lib/api/client';
import { FileUploadResponse } from '@/lib/apiTypes';

interface FileUploadProps {
  onUploadComplete?: (file: FileUploadResponse) => void;
  onUploadError?: (error: Error) => void;
  accept?: string;
  maxSize?: number; // بالبايت
  className?: string;
}

export default function FileUpload({
  onUploadComplete,
  onUploadError,
  accept = '*/*',
  maxSize = 10 * 1024 * 1024, // 10MB افتراضي
  className = '',
}: FileUploadProps) {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<FileUploadResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      return `حجم الملف كبير جداً. الحد الأقصى: ${(maxSize / 1024 / 1024).toFixed(2)} MB`;
    }
    return null;
  };

  const handleFileSelect = useCallback(
    async (file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      setError(null);
      setProgress(0);
      setIsUploading(true);
      setUploadedFile(null);

      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.upload<{ data: FileUploadResponse }>(
          '/api/files/upload',
          formData,
          (progressPercent) => {
            setProgress(progressPercent);
          }
        );

        if (response.data?.data) {
          setUploadedFile(response.data.data);
          onUploadComplete?.(response.data.data);
        } else {
          throw new Error('لم يتم استلام بيانات الملف');
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('حدث خطأ أثناء رفع الملف');
        setError(error.message);
        onUploadError?.(error);
      } finally {
        setIsUploading(false);
      }
    },
    [maxSize, onUploadComplete, onUploadError]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const onFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const reset = useCallback(() => {
    setProgress(0);
    setIsUploading(false);
    setUploadedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  return (
    <div className={`file-upload-container ${className}`}>
      <div
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center
          transition-all duration-200
          ${
            isUploading
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : uploadedFile
              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
              : error
              ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
              : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/10'
          }
        `}
      >
        {isUploading ? (
          <div className="space-y-4">
            <Upload className="mx-auto h-12 w-12 text-blue-500 animate-pulse" />
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                جاري الرفع...
              </p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {progress}%
              </p>
            </div>
          </div>
        ) : uploadedFile ? (
          <div className="space-y-4">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <div>
              <p className="text-sm font-medium text-green-700 dark:text-green-300">
                تم الرفع بنجاح!
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {uploadedFile.filename}
              </p>
            </div>
            <button
              onClick={reset}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              رفع ملف آخر
            </button>
          </div>
        ) : error ? (
          <div className="space-y-4">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
            <div>
              <p className="text-sm font-medium text-red-700 dark:text-red-300">
                خطأ في الرفع
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {error}
              </p>
            </div>
            <button
              onClick={reset}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              المحاولة مرة أخرى
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                اسحب الملف هنا أو اضغط للرفع
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                الحد الأقصى: {(maxSize / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={onFileInputChange}
              className="hidden"
              id="file-upload-input"
            />
            <label
              htmlFor="file-upload-input"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
            >
              <Upload className="h-4 w-4 mr-2" />
              اختر ملف
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
