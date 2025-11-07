/**
 * أنواع البيانات لنظام التخزين والنسخ الشخصية
 */

export interface StorageQuota {
  userId: string;
  totalQuota: number; // بالبايت (5GB = 5 * 1024 * 1024 * 1024)
  usedStorage: number; // بالبايت
  availableStorage: number; // بالبايت
  percentageUsed: number; // نسبة الاستخدام
  createdAt: string;
  updatedAt: string;
}

export interface PersonalFile {
  id: string;
  userId: string;
  originalFileId?: string; // معرف الملف الأصلي إذا كان نسخة من ملف دورة
  name: string;
  type: string;
  size: number; // بالبايت
  mimeType: string;
  storageProvider: 's3' | 'azure' | 'local';
  storageKey: string; // المفتاح في التخزين السحابي
  url?: string; // رابط الوصول المؤقت
  folderId?: string;
  parentId?: string;
  metadata?: {
    thumbnail?: string;
    description?: string;
    tags?: string[];
    category?: string;
  };
  permissions: {
    canRead: boolean;
    canWrite: boolean;
    canDelete: boolean;
    canShare: boolean;
  };
  version: number;
  createdAt: string;
  updatedAt: string;
  lastAccessed?: string;
}

export interface FileFolder {
  id: string;
  userId: string;
  name: string;
  parentId?: string;
  path: string;
  filesCount: number;
  totalSize: number;
  createdAt: string;
  updatedAt: string;
}

export interface StorageUsage {
  userId: string;
  totalFiles: number;
  totalSize: number;
  byType: Record<string, { count: number; size: number }>;
  byFolder: Record<string, { count: number; size: number }>;
  lastCalculated: string;
}

export interface FileCopyRequest {
  sourceFileId: string;
  targetFolderId?: string;
  newName?: string;
  createPersonalCopy: boolean; // إنشاء نسخة شخصية للمتدرب
}

export interface FileUploadResponse {
  file: PersonalFile;
  uploadUrl?: string; // رابط الرفع المباشر للـ S3
  expiresIn?: number; // مدة صلاحية الرابط بالثواني
}

export interface StorageProviderConfig {
  provider: 's3' | 'azure' | 'local';
  bucket?: string; // لـ S3
  container?: string; // لـ Azure
  region?: string;
  accessKey?: string;
  secretKey?: string;
  endpoint?: string;
}

// ==================== تتبع التعديلات ====================
export interface FileModification {
  id: string;
  fileId: string;
  userId: string;
  courseId?: string;
  action: 'rename' | 'copy' | 'move' | 'delete' | 'create' | 'update';
  oldName?: string;
  newName?: string;
  oldPath?: string;
  newPath?: string;
  oldSize?: number;
  newSize?: number;
  metadata?: {
    reason?: string;
    sourceFileId?: string;
    targetLocation?: string;
  };
  createdAt: string;
  createdBy: string;
}

export interface FileModificationHistory {
  fileId: string;
  userId: string;
  modifications: FileModification[];
  totalModifications: number;
  lastModified: string;
}

export interface FileModificationTree {
  userId: string;
  courseId?: string;
  rootNodes: ModificationTreeNode[];
  totalModifications: number;
}

export interface ModificationTreeNode {
  fileId: string;
  fileName: string;
  fileType: string;
  currentPath: string;
  modifications: FileModification[];
  children?: ModificationTreeNode[];
}

