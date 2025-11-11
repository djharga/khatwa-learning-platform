/**
 * Admin Data Service
 * خدمة مشتركة للوصول إلى بيانات الـ store من API routes
 * تستخدم localStorage للوصول إلى البيانات المحفوظة
 */

import type { AdminUser, AdminCourse, AdminProgram, AdminContentFile } from './admin-store';

interface AdminStoreData {
  state: {
    users: AdminUser[];
    courses: AdminCourse[];
    programs: AdminProgram[];
    contentFiles: AdminContentFile[];
    stats: any;
  };
  version: number;
}

/**
 * الحصول على البيانات من localStorage
 */
export function getAdminStoreData(): AdminStoreData | null {
  if (typeof window === 'undefined') {
    // Server-side: استخدام mock data
    return null;
  }

  try {
    const stored = localStorage.getItem('admin-store');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading admin store from localStorage:', error);
  }

  return null;
}

/**
 * حفظ البيانات في localStorage
 */
export function saveAdminStoreData(data: AdminStoreData): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem('admin-store', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving admin store to localStorage:', error);
  }
}

/**
 * الحصول على المستخدمين
 */
export function getUsers(): AdminUser[] {
  const storeData = getAdminStoreData();
  return storeData?.state?.users || [];
}

/**
 * الحصول على الدورات
 */
export function getCourses(): AdminCourse[] {
  const storeData = getAdminStoreData();
  return storeData?.state?.courses || [];
}

/**
 * الحصول على البرامج
 */
export function getPrograms(): AdminProgram[] {
  const storeData = getAdminStoreData();
  return storeData?.state?.programs || [];
}

/**
 * الحصول على الملفات
 */
export function getContentFiles(): AdminContentFile[] {
  const storeData = getAdminStoreData();
  return storeData?.state?.contentFiles || [];
}

/**
 * إضافة مستخدم
 */
export function addUser(user: AdminUser): void {
  const storeData = getAdminStoreData();
  if (storeData) {
    storeData.state.users.push(user);
    saveAdminStoreData(storeData);
  }
}

/**
 * تحديث مستخدم
 */
export function updateUser(id: string, updates: Partial<AdminUser>): void {
  const storeData = getAdminStoreData();
  if (storeData) {
    const index = storeData.state.users.findIndex(u => u.id === id);
    if (index !== -1) {
      storeData.state.users[index] = { ...storeData.state.users[index], ...updates };
      saveAdminStoreData(storeData);
    }
  }
}

/**
 * حذف مستخدم
 */
export function deleteUser(id: string): void {
  const storeData = getAdminStoreData();
  if (storeData) {
    storeData.state.users = storeData.state.users.filter(u => u.id !== id);
    saveAdminStoreData(storeData);
  }
}

/**
 * إضافة دورة
 */
export function addCourse(course: AdminCourse): void {
  const storeData = getAdminStoreData();
  if (storeData) {
    storeData.state.courses.push(course);
    saveAdminStoreData(storeData);
  }
}

/**
 * تحديث دورة
 */
export function updateCourse(id: string, updates: Partial<AdminCourse>): void {
  const storeData = getAdminStoreData();
  if (storeData) {
    const index = storeData.state.courses.findIndex(c => c.id === id);
    if (index !== -1) {
      storeData.state.courses[index] = { 
        ...storeData.state.courses[index], 
        ...updates,
        lastModified: new Date().toISOString().split('T')[0]
      };
      saveAdminStoreData(storeData);
    }
  }
}

/**
 * حذف دورة
 */
export function deleteCourse(id: string): void {
  const storeData = getAdminStoreData();
  if (storeData) {
    storeData.state.courses = storeData.state.courses.filter(c => c.id !== id);
    saveAdminStoreData(storeData);
  }
}

/**
 * إضافة برنامج
 */
export function addProgram(program: AdminProgram): void {
  const storeData = getAdminStoreData();
  if (storeData) {
    storeData.state.programs.push(program);
    saveAdminStoreData(storeData);
  }
}

/**
 * تحديث برنامج
 */
export function updateProgram(id: string, updates: Partial<AdminProgram>): void {
  const storeData = getAdminStoreData();
  if (storeData) {
    const index = storeData.state.programs.findIndex(p => p.id === id);
    if (index !== -1) {
      storeData.state.programs[index] = { 
        ...storeData.state.programs[index], 
        ...updates,
        lastModified: new Date().toISOString().split('T')[0]
      };
      saveAdminStoreData(storeData);
    }
  }
}

/**
 * حذف برنامج
 */
export function deleteProgram(id: string): void {
  const storeData = getAdminStoreData();
  if (storeData) {
    storeData.state.programs = storeData.state.programs.filter(p => p.id !== id);
    saveAdminStoreData(storeData);
  }
}

/**
 * إضافة ملف
 */
export function addContentFile(file: AdminContentFile): void {
  const storeData = getAdminStoreData();
  if (storeData) {
    storeData.state.contentFiles.push(file);
    saveAdminStoreData(storeData);
  }
}

/**
 * تحديث ملف
 */
export function updateContentFile(id: string, updates: Partial<AdminContentFile>): void {
  const storeData = getAdminStoreData();
  if (storeData) {
    const index = storeData.state.contentFiles.findIndex(f => f.id === id);
    if (index !== -1) {
      storeData.state.contentFiles[index] = { 
        ...storeData.state.contentFiles[index], 
        ...updates,
        lastModified: new Date().toISOString().split('T')[0]
      };
      saveAdminStoreData(storeData);
    }
  }
}

/**
 * حذف ملف
 */
export function deleteContentFile(id: string): void {
  const storeData = getAdminStoreData();
  if (storeData) {
    storeData.state.contentFiles = storeData.state.contentFiles.filter(f => f.id !== id);
    saveAdminStoreData(storeData);
  }
}
