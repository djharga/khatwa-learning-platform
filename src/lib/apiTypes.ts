/**
 * API Types and Contracts
 * واجهات البيانات المستخدمة في التواصل مع Backend
 */

export type ID = string;

/**
 * Course Interface
 */
export interface Course {
  id: ID;
  title: string;
  slug: string;
  description: string;
  coverUrl?: string;
  createdAt: string;
  updatedAt?: string;
  category?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  duration?: number;
  instructor?: string;
  price?: number;
  isFree?: boolean;
}

/**
 * User Interface
 */
export interface User {
  id: ID;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
  createdAt: string;
}

/**
 * API Response Wrapper
 */
export interface ApiResponse<T> {
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

/**
 * Pagination Parameters
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Course List Response
 */
export type CourseListResponse = ApiResponse<Course[]>;

/**
 * Course Detail Response
 */
export type CourseDetailResponse = ApiResponse<Course>;

/**
 * User Response
 */
export type UserResponse = ApiResponse<User>;

/**
 * File Upload Response
 */
export interface FileUploadResponse {
  id: ID;
  filename: string;
  url: string;
  size: number;
  mimeType: string;
  uploadedAt: string;
}

export type FileUploadApiResponse = ApiResponse<FileUploadResponse>;

