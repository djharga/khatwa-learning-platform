/**
 * Admin Store - State Management للوحة الإدارة
 * يستخدم Zustand لإدارة حالة جميع البيانات في لوحة الإدارة
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// أنواع البيانات
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: 'student' | 'company' | 'admin';
  companyName?: string;
  status: 'active' | 'inactive' | 'suspended';
  storageUsed: number;
  storageLimit: number;
  coursesEnrolled: number;
  coursesCompleted: number;
  joinDate: string;
  lastLogin: string;
  customUrl?: string;
  whatsappLink?: string;
  isPremium: boolean;
  companyLogo?: string;
}

export interface AdminCourse {
  id: string;
  title: string;
  description: string;
  image: string;
  instructor: string;
  type: 'short' | 'long';
  status: 'active' | 'review' | 'suspended';
  enrolledStudents: number;
  completedStudents: number;
  startDate: string;
  endDate?: string;
  createdAt: string;
  lastModified: string;
  storageUsed: number;
  totalFiles: number;
  isLocked: boolean;
  tags: string[];
  modules: any[];
}

export interface AdminProgram {
  id: string;
  title: string;
  description: string;
  type: 'fellowship' | 'diploma' | 'certificate' | 'workshop';
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  totalHours: number;
  maxParticipants: number;
  enrolledParticipants: number;
  completedParticipants: number;
  instructor: string;
  price: number;
  prerequisites: string[];
  objectives: string[];
  schedule: any[];
  participants: any[];
  createdAt: string;
  lastModified: string;
}

export interface AdminContentFile {
  id: string;
  name: string;
  type: 'word' | 'excel' | 'pdf' | 'powerpoint' | 'video' | 'image' | 'other';
  size: number;
  uploadedAt: string;
  uploadedBy: string;
  courseId?: string;
  moduleId?: string;
  tags: string[];
  description?: string;
  downloads: number;
  views: number;
  isPublic: boolean;
  version: number;
  lastModified: string;
  thumbnail?: string;
  duration?: number;
  explanationVideo?: string;
}

interface AdminStore {
  // البيانات
  users: AdminUser[];
  courses: AdminCourse[];
  programs: AdminProgram[];
  contentFiles: AdminContentFile[];
  
  // الإحصائيات
  stats: {
    users: {
      total: number;
      active: number;
      students: number;
      companies: number;
      admins: number;
      premium: number;
      totalStorage: number;
    };
    courses: {
      total: number;
      active: number;
      review: number;
      suspended: number;
      shortCourses: number;
      longCourses: number;
      totalStudents: number;
      totalStorage: number;
    };
    programs: {
      total: number;
      active: number;
      completed: number;
      planning: number;
    };
    content: {
      totalFiles: number;
      totalSize: number;
      videos: number;
      documents: number;
      images: number;
      totalDownloads: number;
      totalViews: number;
    };
  };
  
  // Actions - المستخدمين
  setUsers: (users: AdminUser[]) => void;
  addUser: (user: AdminUser) => void;
  updateUser: (id: string, user: Partial<AdminUser>) => void;
  deleteUser: (id: string) => void;
  
  // Actions - الدورات
  setCourses: (courses: AdminCourse[]) => void;
  addCourse: (course: AdminCourse) => void;
  updateCourse: (id: string, course: Partial<AdminCourse>) => void;
  deleteCourse: (id: string) => void;
  
  // Actions - البرامج
  setPrograms: (programs: AdminProgram[]) => void;
  addProgram: (program: AdminProgram) => void;
  updateProgram: (id: string, program: Partial<AdminProgram>) => void;
  deleteProgram: (id: string) => void;
  
  // Actions - المحتوى
  setContentFiles: (files: AdminContentFile[]) => void;
  addContentFile: (file: AdminContentFile) => void;
  updateContentFile: (id: string, file: Partial<AdminContentFile>) => void;
  deleteContentFile: (id: string) => void;
  
  // Actions - الإحصائيات
  updateStats: () => void;
  
  // Actions - التهيئة
  initializeData: () => void;
}

// البيانات الافتراضية
const defaultUsers: AdminUser[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '+966501234567',
    userType: 'student',
    status: 'active',
    storageUsed: 1200,
    storageLimit: 5120,
    coursesEnrolled: 3,
    coursesCompleted: 2,
    joinDate: '2024-01-15',
    lastLogin: '2024-01-20',
    customUrl: 'ahmed.audit-sa.com',
    whatsappLink: 'https://wa.me/966501234567',
    isPremium: false
  },
  {
    id: '2',
    name: 'شركة الرياض للمحاسبة',
    email: 'info@riyadh-accounting.com',
    phone: '+966112345678',
    userType: 'company',
    companyName: 'شركة الرياض للمحاسبة',
    status: 'active',
    storageUsed: 8500,
    storageLimit: 20480,
    coursesEnrolled: 8,
    coursesCompleted: 5,
    joinDate: '2024-01-10',
    lastLogin: '2024-01-19',
    customUrl: 'riyadh-accounting.audit-sa.com',
    whatsappLink: 'https://wa.me/966112345678',
    isPremium: true,
    companyLogo: '/logos/riyadh-accounting.png'
  },
  {
    id: '3',
    name: 'سارة أحمد',
    email: 'sara@example.com',
    phone: '+966507654321',
    userType: 'admin',
    status: 'active',
    storageUsed: 2560,
    storageLimit: 10240,
    coursesEnrolled: 15,
    coursesCompleted: 12,
    joinDate: '2023-12-01',
    lastLogin: '2024-01-20',
    isPremium: true
  }
];

const defaultCourses: AdminCourse[] = [
  {
    id: '1',
    title: 'دورة المراجعة الداخلية المستوى الأول',
    description: 'أساسيات المراجعة الداخلية والمحاسبة',
    image: '/courses/auditing-1.jpg',
    instructor: 'د. أحمد محمد',
    type: 'short',
    status: 'active',
    enrolledStudents: 127,
    completedStudents: 89,
    startDate: '2024-02-01',
    endDate: '2024-02-15',
    createdAt: '2024-01-15',
    lastModified: '2024-01-20',
    storageUsed: 2048,
    totalFiles: 45,
    isLocked: false,
    tags: ['مراجعة داخلية', 'أساسيات', 'محاسبة'],
    modules: []
  },
  {
    id: '2',
    title: 'برنامج المراجعين الداخليين',
    description: 'برنامج شامل للحصول على شهادة الزمالة',
    image: '/courses/fellowship.jpg',
    instructor: 'د. فاطمة علي',
    type: 'long',
    status: 'active',
    enrolledStudents: 89,
    completedStudents: 23,
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    createdAt: '2023-12-01',
    lastModified: '2024-01-20',
    storageUsed: 15360,
    totalFiles: 234,
    isLocked: false,
    tags: ['زمالة', 'متقدم', 'شهادة'],
    modules: []
  }
];

const defaultPrograms: AdminProgram[] = [
  {
    id: '1',
    title: 'المراجعين الداخليين',
    description: 'برنامج زمالة شامل للحصول على شهادة معتمدة في المراجعة الداخلية',
    type: 'fellowship',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    totalHours: 120,
    maxParticipants: 50,
    enrolledParticipants: 35,
    completedParticipants: 12,
    instructor: 'د. أحمد محمد',
    price: 15000,
    prerequisites: ['بكالوريوس في المحاسبة', 'خبرة 2 سنة في المجال'],
    objectives: [
      'فهم أساسيات المراجعة الداخلية',
      'تطبيق معايير المراجعة الدولية',
      'إعداد تقارير المراجعة المهنية'
    ],
    schedule: [],
    participants: [],
    createdAt: '2024-01-01',
    lastModified: '2024-01-20'
  }
];

const defaultContentFiles: AdminContentFile[] = [
  {
    id: '1',
    name: 'مقدمة_المراجعة_الداخلية.docx',
    type: 'word',
    size: 2048,
    uploadedAt: '2024-01-15',
    uploadedBy: 'د. أحمد محمد',
    courseId: '1',
    moduleId: 'm1',
    tags: ['مراجعة داخلية', 'مقدمة', 'أساسيات'],
    description: 'ملف مقدمة شامل لأساسيات المراجعة الداخلية',
    downloads: 89,
    views: 156,
    isPublic: true,
    version: 2,
    lastModified: '2024-01-18',
    explanationVideo: 'video1'
  },
  {
    id: '2',
    name: 'جدول_المراجعة.xlsx',
    type: 'excel',
    size: 512,
    uploadedAt: '2024-01-15',
    uploadedBy: 'د. أحمد محمد',
    courseId: '1',
    moduleId: 'm1',
    tags: ['جدول', 'مراجعة', 'قالب'],
    description: 'قالب Excel لجدول المراجعة الداخلية',
    downloads: 67,
    views: 89,
    isPublic: true,
    version: 1,
    lastModified: '2024-01-15'
  },
  {
    id: '3',
    name: 'شرح_المقدمة.mp4',
    type: 'video',
    size: 15360,
    uploadedAt: '2024-01-16',
    uploadedBy: 'د. أحمد محمد',
    courseId: '1',
    moduleId: 'm1',
    tags: ['فيديو', 'شرح', 'مقدمة'],
    description: 'فيديو شرح تفصيلي للمقدمة',
    downloads: 45,
    views: 156,
    isPublic: true,
    version: 1,
    lastModified: '2024-01-16',
    duration: 25
  },
  {
    id: '4',
    name: 'دليل_المحاسبة_المالية.pdf',
    type: 'pdf',
    size: 3584,
    uploadedAt: '2024-01-10',
    uploadedBy: 'د. فاطمة علي',
    courseId: '2',
    tags: ['دليل', 'محاسبة', 'مالية'],
    description: 'دليل شامل للمحاسبة المالية',
    downloads: 234,
    views: 567,
    isPublic: true,
    version: 3,
    lastModified: '2024-01-19'
  }
];

// دالة حساب الإحصائيات
function calculateStats(
  users: AdminUser[],
  courses: AdminCourse[],
  programs: AdminProgram[],
  contentFiles: AdminContentFile[]
) {
  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    students: users.filter(u => u.userType === 'student').length,
    companies: users.filter(u => u.userType === 'company').length,
    admins: users.filter(u => u.userType === 'admin').length,
    premium: users.filter(u => u.isPremium).length,
    totalStorage: users.reduce((sum, u) => sum + u.storageUsed, 0)
  };

  const courseStats = {
    total: courses.length,
    active: courses.filter(c => c.status === 'active').length,
    review: courses.filter(c => c.status === 'review').length,
    suspended: courses.filter(c => c.status === 'suspended').length,
    shortCourses: courses.filter(c => c.type === 'short').length,
    longCourses: courses.filter(c => c.type === 'long').length,
    totalStudents: courses.reduce((sum, c) => sum + c.enrolledStudents, 0),
    totalStorage: courses.reduce((sum, c) => sum + c.storageUsed, 0)
  };

  const programStats = {
    total: programs.length,
    active: programs.filter(p => p.status === 'active').length,
    completed: programs.filter(p => p.status === 'completed').length,
    planning: programs.filter(p => p.status === 'planning').length
  };

  const contentStats = {
    totalFiles: contentFiles.length,
    totalSize: contentFiles.reduce((sum, f) => sum + f.size, 0),
    videos: contentFiles.filter(f => f.type === 'video').length,
    documents: contentFiles.filter(f => ['word', 'excel', 'pdf', 'powerpoint'].includes(f.type)).length,
    images: contentFiles.filter(f => f.type === 'image').length,
    totalDownloads: contentFiles.reduce((sum, f) => sum + f.downloads, 0),
    totalViews: contentFiles.reduce((sum, f) => sum + f.views, 0)
  };

  return {
    users: userStats,
    courses: courseStats,
    programs: programStats,
    content: contentStats
  };
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      // البيانات الافتراضية
      users: defaultUsers,
      courses: defaultCourses,
      programs: defaultPrograms,
      contentFiles: defaultContentFiles,
      stats: calculateStats(defaultUsers, defaultCourses, defaultPrograms, defaultContentFiles),

      // Actions - المستخدمين
      setUsers: (users) => {
        set({ users });
        get().updateStats();
      },
      addUser: (user) => {
        set((state) => ({ users: [...state.users, user] }));
        get().updateStats();
      },
      updateUser: (id, updates) => {
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? { ...u, ...updates } : u))
        }));
        get().updateStats();
      },
      deleteUser: (id) => {
        set((state) => ({ users: state.users.filter((u) => u.id !== id) }));
        get().updateStats();
      },

      // Actions - الدورات
      setCourses: (courses) => {
        set({ courses });
        get().updateStats();
      },
      addCourse: (course) => {
        set((state) => ({ courses: [...state.courses, course] }));
        get().updateStats();
      },
      updateCourse: (id, updates) => {
        set((state) => ({
          courses: state.courses.map((c) => (c.id === id ? { ...c, ...updates, lastModified: new Date().toISOString().split('T')[0] } : c))
        }));
        get().updateStats();
      },
      deleteCourse: (id) => {
        set((state) => ({ courses: state.courses.filter((c) => c.id !== id) }));
        get().updateStats();
      },

      // Actions - البرامج
      setPrograms: (programs) => {
        set({ programs });
        get().updateStats();
      },
      addProgram: (program) => {
        set((state) => ({ programs: [...state.programs, program] }));
        get().updateStats();
      },
      updateProgram: (id, updates) => {
        set((state) => ({
          programs: state.programs.map((p) => (p.id === id ? { ...p, ...updates, lastModified: new Date().toISOString().split('T')[0] } : p))
        }));
        get().updateStats();
      },
      deleteProgram: (id) => {
        set((state) => ({ programs: state.programs.filter((p) => p.id !== id) }));
        get().updateStats();
      },

      // Actions - المحتوى
      setContentFiles: (files) => {
        set({ contentFiles: files });
        get().updateStats();
      },
      addContentFile: (file) => {
        set((state) => ({ contentFiles: [...state.contentFiles, file] }));
        get().updateStats();
      },
      updateContentFile: (id, updates) => {
        set((state) => ({
          contentFiles: state.contentFiles.map((f) => (f.id === id ? { ...f, ...updates, lastModified: new Date().toISOString().split('T')[0] } : f))
        }));
        get().updateStats();
      },
      deleteContentFile: (id) => {
        set((state) => ({ contentFiles: state.contentFiles.filter((f) => f.id !== id) }));
        get().updateStats();
      },

      // Actions - الإحصائيات
      updateStats: () => {
        const { users, courses, programs, contentFiles } = get();
        const stats = calculateStats(users, courses, programs, contentFiles);
        set({ stats });
      },

      // Actions - التهيئة
      initializeData: () => {
        const state = get();
        if (state.users.length === 0) {
          set({ users: defaultUsers });
        }
        if (state.courses.length === 0) {
          set({ courses: defaultCourses });
        }
        if (state.programs.length === 0) {
          set({ programs: defaultPrograms });
        }
        if (state.contentFiles.length === 0) {
          set({ contentFiles: defaultContentFiles });
        }
        get().updateStats();
      }
    }),
    {
      name: 'admin-store', // اسم المفتاح في localStorage
      version: 1,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
