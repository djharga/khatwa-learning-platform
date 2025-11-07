/**
 * File Upload Validation (Client-Side)
 * فحص الملفات قبل الرفع
 */

/**
 * أنواع الملفات المسموحة (Whitelist)
 */
export const ALLOWED_FILE_TYPES = {
  // Images
  images: {
    mimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
    extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
    maxSize: 10 * 1024 * 1024, // 10MB
  },
  // Documents
  documents: {
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
    ],
    extensions: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt'],
    maxSize: 50 * 1024 * 1024, // 50MB
  },
  // Videos
  videos: {
    mimeTypes: ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'],
    extensions: ['.mp4', '.webm', '.ogg', '.mov'],
    maxSize: 500 * 1024 * 1024, // 500MB
  },
  // Audio
  audio: {
    mimeTypes: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/webm'],
    extensions: ['.mp3', '.wav', '.ogg', '.webm'],
    maxSize: 50 * 1024 * 1024, // 50MB
  },
} as const;

/**
 * جميع أنواع الملفات المسموحة
 */
export const ALL_ALLOWED_MIME_TYPES = [
  ...ALLOWED_FILE_TYPES.images.mimeTypes,
  ...ALLOWED_FILE_TYPES.documents.mimeTypes,
  ...ALLOWED_FILE_TYPES.videos.mimeTypes,
  ...ALLOWED_FILE_TYPES.audio.mimeTypes,
];

export const ALL_ALLOWED_EXTENSIONS = [
  ...ALLOWED_FILE_TYPES.images.extensions,
  ...ALLOWED_FILE_TYPES.documents.extensions,
  ...ALLOWED_FILE_TYPES.videos.extensions,
  ...ALLOWED_FILE_TYPES.audio.extensions,
];

/**
 * نتيجة التحقق من الملف
 */
export interface FileValidationResult {
  valid: boolean;
  error?: string;
  fileType?: 'image' | 'document' | 'video' | 'audio' | 'other';
  sanitizedFilename?: string;
}

/**
 * التحقق من نوع الملف
 */
function validateFileType(file: File): { valid: boolean; error?: string; fileType?: string } {
  // التحقق من MIME type
  const mimeTypeValid = ALL_ALLOWED_MIME_TYPES.includes(file.type);
  
  // التحقق من extension
  const fileName = file.name.toLowerCase();
  const extension = fileName.substring(fileName.lastIndexOf('.'));
  const extensionValid = ALL_ALLOWED_EXTENSIONS.includes(extension);
  
  if (!mimeTypeValid && !extensionValid) {
    return {
      valid: false,
      error: `نوع الملف غير مسموح. الأنواع المسموحة: ${ALL_ALLOWED_EXTENSIONS.join(', ')}`,
    };
  }
  
  // تحديد نوع الملف
  let fileType: 'image' | 'document' | 'video' | 'audio' | 'other' = 'other';
  
  if (ALLOWED_FILE_TYPES.images.mimeTypes.includes(file.type) || 
      ALLOWED_FILE_TYPES.images.extensions.includes(extension)) {
    fileType = 'image';
  } else if (ALLOWED_FILE_TYPES.documents.mimeTypes.includes(file.type) || 
             ALLOWED_FILE_TYPES.documents.extensions.includes(extension)) {
    fileType = 'document';
  } else if (ALLOWED_FILE_TYPES.videos.mimeTypes.includes(file.type) || 
             ALLOWED_FILE_TYPES.videos.extensions.includes(extension)) {
    fileType = 'video';
  } else if (ALLOWED_FILE_TYPES.audio.mimeTypes.includes(file.type) || 
             ALLOWED_FILE_TYPES.audio.extensions.includes(extension)) {
    fileType = 'audio';
  }
  
  return { valid: true, fileType };
}

/**
 * التحقق من حجم الملف
 */
function validateFileSize(file: File, fileType?: string): { valid: boolean; error?: string } {
  let maxSize: number;
  
  if (fileType === 'image') {
    maxSize = ALLOWED_FILE_TYPES.images.maxSize;
  } else if (fileType === 'document') {
    maxSize = ALLOWED_FILE_TYPES.documents.maxSize;
  } else if (fileType === 'video') {
    maxSize = ALLOWED_FILE_TYPES.videos.maxSize;
  } else if (fileType === 'audio') {
    maxSize = ALLOWED_FILE_TYPES.audio.maxSize;
  } else {
    maxSize = 10 * 1024 * 1024; // 10MB default
  }
  
  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(0);
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    return {
      valid: false,
      error: `حجم الملف كبير جداً. الحد الأقصى: ${maxSizeMB}MB، حجم الملف: ${fileSizeMB}MB`,
    };
  }
  
  if (file.size === 0) {
    return {
      valid: false,
      error: 'الملف فارغ',
    };
  }
  
  return { valid: true };
}

/**
 * التحقق من اسم الملف
 */
function validateFilename(filename: string): { valid: boolean; error?: string; sanitized?: string } {
  if (!filename || filename.trim().length === 0) {
    return {
      valid: false,
      error: 'اسم الملف مطلوب',
    };
  }
  
  // التحقق من طول الاسم
  if (filename.length > 255) {
    return {
      valid: false,
      error: 'اسم الملف طويل جداً (الحد الأقصى: 255 حرف)',
    };
  }
  
  // التحقق من وجود extension
  if (!filename.includes('.')) {
    return {
      valid: false,
      error: 'اسم الملف يجب أن يحتوي على extension',
    };
  }
  
  return { valid: true };
}

/**
 * التحقق الكامل من الملف
 * @param file - الملف المراد التحقق منه
 * @param options - خيارات إضافية
 * @returns نتيجة التحقق
 */
export function validateFile(
  file: File,
  options?: {
    allowedTypes?: ('image' | 'document' | 'video' | 'audio')[];
    maxSize?: number;
    customValidator?: (file: File) => { valid: boolean; error?: string };
  }
): FileValidationResult {
  // التحقق من وجود الملف
  if (!file) {
    return {
      valid: false,
      error: 'الملف مطلوب',
    };
  }
  
  // التحقق من اسم الملف
  const filenameCheck = validateFilename(file.name);
  if (!filenameCheck.valid) {
    return {
      valid: false,
      error: filenameCheck.error,
    };
  }
  
  // التحقق من نوع الملف
  const typeCheck = validateFileType(file);
  if (!typeCheck.valid) {
    return {
      valid: false,
      error: typeCheck.error,
    };
  }
  
  // التحقق من نوع الملف المحدد في options
  if (options?.allowedTypes && typeCheck.fileType) {
    if (!options.allowedTypes.includes(typeCheck.fileType as any)) {
      return {
        valid: false,
        error: `نوع الملف غير مسموح. الأنواع المسموحة: ${options.allowedTypes.join(', ')}`,
      };
    }
  }
  
  // التحقق من حجم الملف
  const sizeCheck = validateFileSize(file, typeCheck.fileType);
  if (!sizeCheck.valid) {
    return {
      valid: false,
      error: sizeCheck.error,
    };
  }
  
  // التحقق من الحجم المخصص في options
  if (options?.maxSize && file.size > options.maxSize) {
    const maxSizeMB = (options.maxSize / (1024 * 1024)).toFixed(0);
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    return {
      valid: false,
      error: `حجم الملف كبير جداً. الحد الأقصى: ${maxSizeMB}MB، حجم الملف: ${fileSizeMB}MB`,
    };
  }
  
  // التحقق المخصص
  if (options?.customValidator) {
    const customCheck = options.customValidator(file);
    if (!customCheck.valid) {
      return {
        valid: false,
        error: customCheck.error,
      };
    }
  }
  
  // تنظيف اسم الملف
  const sanitizedFilename = sanitizeFilename(file.name);
  
  return {
    valid: true,
    fileType: typeCheck.fileType as any,
    sanitizedFilename,
  };
}

/**
 * تنظيف اسم الملف
 */
function sanitizeFilename(filename: string): string {
  // إزالة path separators
  let clean = filename.replace(/[\/\\]/g, '_');
  
  // إزالة أحرف خاصة خطرة
  clean = clean.replace(/[<>:"|?*\x00-\x1f]/g, '');
  
  // إزالة spaces من البداية والنهاية
  clean = clean.trim();
  
  // تحديد طول أقصى
  const maxLength = 255;
  if (clean.length > maxLength) {
    const ext = clean.substring(clean.lastIndexOf('.'));
    const name = clean.substring(0, maxLength - ext.length);
    clean = name + ext;
  }
  
  return clean;
}

/**
 * التحقق من عدة ملفات
 */
export function validateFiles(
  files: File[],
  options?: {
    allowedTypes?: ('image' | 'document' | 'video' | 'audio')[];
    maxSize?: number;
    maxFiles?: number;
  }
): { valid: boolean; errors: string[]; results: FileValidationResult[] } {
  const errors: string[] = [];
  const results: FileValidationResult[] = [];
  
  // التحقق من عدد الملفات
  if (options?.maxFiles && files.length > options.maxFiles) {
    errors.push(`عدد الملفات كبير جداً. الحد الأقصى: ${options.maxFiles}`);
    return { valid: false, errors, results };
  }
  
  // التحقق من كل ملف
  for (const file of files) {
    const result = validateFile(file, options);
    results.push(result);
    if (!result.valid && result.error) {
      errors.push(`${file.name}: ${result.error}`);
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
    results,
  };
}

/**
 * قراءة MIME type من الملف (للتحقق الإضافي)
 */
export async function getFileMimeType(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      if (arrayBuffer) {
        const bytes = new Uint8Array(arrayBuffer.slice(0, 4));
        const hex = Array.from(bytes)
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');
        
        // Magic numbers للأنواع الشائعة
        const mimeTypes: Record<string, string> = {
          '89504e47': 'image/png',
          'ffd8ffe0': 'image/jpeg',
          'ffd8ffe1': 'image/jpeg',
          '25504446': 'application/pdf',
          '504b0304': 'application/zip', // Also for .docx, .xlsx, etc.
        };
        
        resolve(mimeTypes[hex] || file.type);
      } else {
        resolve(file.type);
      }
    };
    reader.readAsArrayBuffer(file.slice(0, 4));
  });
}

