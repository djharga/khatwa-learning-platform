/**
 * Secure File Upload Component
 * مكون آمن لرفع الملفات مع validation
 */

'use client';

import { useState, useRef } from 'react';
import { Upload, X, AlertCircle, CheckCircle } from 'lucide-react';
import { validateFile, validateFiles, type FileValidationResult } from '@/lib/security/file-validator';
import { sanitizeFilename } from '@/lib/security/sanitize';
import { api } from '@/lib/api/client';
import { handleApiError, getErrorMessage } from '@/lib/error-handler';
import { showToast } from '@/utils/toast';

interface FileUploadProps {
  /** API endpoint للرفع */
  uploadUrl: string;
  /** معرف المستخدم */
  userId: string;
  /** معرف المجلد (اختياري) */
  folderId?: string;
  /** أنواع الملفات المسموحة */
  allowedTypes?: ('image' | 'document' | 'video' | 'audio')[];
  /** الحد الأقصى لحجم الملف (بالبايت) */
  maxSize?: number;
  /** الحد الأقصى لعدد الملفات */
  maxFiles?: number;
  /** Callback عند نجاح الرفع */
  onUploadSuccess?: (files: any[]) => void;
  /** Callback عند فشل الرفع */
  onUploadError?: (error: string) => void;
  /** عرض تقدم الرفع */
  showProgress?: boolean;
  /** نص الزر */
  buttonText?: string;
  /** السماح برفع عدة ملفات */
  multiple?: boolean;
}

export default function FileUpload({
  uploadUrl,
  userId,
  folderId,
  allowedTypes,
  maxSize,
  maxFiles = 1,
  onUploadSuccess,
  onUploadError,
  showProgress = true,
  buttonText = 'رفع ملف',
  multiple = false,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [validationResults, setValidationResults] = useState<FileValidationResult[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * معالجة اختيار الملفات
   */
  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const fileArray = Array.from(selectedFiles);
    setErrors([]);

    // التحقق من عدد الملفات
    if (fileArray.length > maxFiles) {
      setErrors([`يمكنك رفع ${maxFiles} ملف فقط`]);
      return;
    }

    // التحقق من كل ملف
    const validation = validateFiles(fileArray, {
      allowedTypes,
      maxSize,
      maxFiles,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      showToast.error('بعض الملفات غير صالحة');
      return;
    }

    setFiles(fileArray);
    setValidationResults(validation.results);
  };

  /**
   * رفع الملفات
   */
  const handleUpload = async () => {
    if (files.length === 0) {
      setErrors(['يرجى اختيار ملف أولاً']);
      return;
    }

    setIsUploading(true);
    setErrors([]);
    const uploadedFiles: any[] = [];
    const uploadErrors: string[] = [];

    try {
      for (const file of files) {
        const validation = validationResults.find((r) => r.sanitizedFilename === sanitizeFilename(file.name));
        
        if (!validation || !validation.valid) {
          uploadErrors.push(`${file.name}: ملف غير صالح`);
          continue;
        }

        // إنشاء FormData
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', userId);
        if (folderId) formData.append('folderId', folderId);

        try {
          // رفع الملف مع تتبع التقدم
          const response = await api.upload(
            uploadUrl,
            formData,
            (progress) => {
              setUploadProgress((prev) => ({
                ...prev,
                [file.name]: progress,
              }));
            }
          );

          uploadedFiles.push(response.data);
        } catch (error) {
          const errorMessage = getErrorMessage(error);
          uploadErrors.push(`${file.name}: ${errorMessage}`);
        }
      }

      if (uploadedFiles.length > 0) {
        showToast.success(`تم رفع ${uploadedFiles.length} ملف بنجاح`);
        onUploadSuccess?.(uploadedFiles);
        // مسح الملفات بعد الرفع الناجح
        setFiles([]);
        setValidationResults([]);
        setUploadProgress({});
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }

      if (uploadErrors.length > 0) {
        setErrors(uploadErrors);
        onUploadError?.(uploadErrors.join(', '));
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setErrors([errorMessage]);
      onUploadError?.(errorMessage);
      showToast.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * إزالة ملف من القائمة
   */
  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setValidationResults((prev) => prev.filter((_, i) => i !== index));
    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[files[index].name];
      return newProgress;
    });
  };

  /**
   * مسح جميع الملفات
   */
  const handleClear = () => {
    setFiles([]);
    setValidationResults([]);
    setUploadProgress({});
    setErrors([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* File Input */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          id="file-upload-input"
          accept={allowedTypes?.map((type) => {
            if (type === 'image') return 'image/*';
            if (type === 'document') return '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt';
            if (type === 'video') return 'video/*';
            if (type === 'audio') return 'audio/*';
            return '*';
          }).join(',')}
        />
        <label
          htmlFor="file-upload-input"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Upload className="w-5 h-5" />
          <span>{buttonText}</span>
        </label>
      </div>

      {/* Selected Files */}
      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">الملفات المحددة ({files.length})</h4>
            <button
              onClick={handleClear}
              className="text-sm text-red-600 hover:text-red-700"
              disabled={isUploading}
            >
              مسح الكل
            </button>
          </div>

          {files.map((file, index) => {
            const validation = validationResults[index];
            const progress = uploadProgress[file.name] || 0;
            const isValid = validation?.valid;

            return (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1">
                  {isValid ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    {showProgress && progress > 0 && progress < 100 && (
                      <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                    {validation?.error && (
                      <p className="text-xs text-red-500 mt-1">{validation.error}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  disabled={isUploading}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Errors */}
      {errors.length > 0 && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-red-800 dark:text-red-200 mb-1">أخطاء:</h4>
              <ul className="list-disc list-inside text-sm text-red-600 dark:text-red-400 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Upload Button */}
      {files.length > 0 && (
        <button
          onClick={handleUpload}
          disabled={isUploading || validationResults.some((r) => !r.valid)}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? 'جاري الرفع...' : 'رفع الملفات'}
        </button>
      )}
    </div>
  );
}

