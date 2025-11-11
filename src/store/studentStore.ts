import { create } from 'zustand';
import { fetchStudent } from '@/lib/apiClient';

// تعريف واجهة لحالة الطالب
interface Course {
  id: string;
  title: string;
  progress: number;
  lastAccessed: Date;
}

interface RecentFile {
  id: string;
  title: string;
  type: 'file' | 'exam';
  courseId: string;
  accessedAt: Date;
}

interface StudentState {
  id: string;
  name: string;
  email: string;
  enrolledCourses: Course[];
  recentFiles: RecentFile[];
  fetchStudentData: (studentId: string) => Promise<void>;
}

// الحالة الابتدائية
const initialState: Omit<StudentState, 'fetchStudentData'> = {
  id: '',
  name: '',
  email: '',
  enrolledCourses: [],
  recentFiles: [],
};

// إنشاء المتجر
const useStudentStore = create<StudentState>((set) => ({
  ...initialState,

  // دالة لجلب بيانات الطالب من API
  fetchStudentData: async (studentId: string) => {
    try {
      const response = await fetchStudent(studentId);
      
      if (response.error) {
        throw new Error(response.error.message);
      }

      if (response.data) {
        set({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          enrolledCourses: (response.data as any).enrolledCourses || [],
          recentFiles: (response.data as any).recentFiles || [],
        });
      }
    } catch (error) {
      console.error('فشل في جلب بيانات الطالب:', error);
    }
  },
}));

export default useStudentStore;
export type { Course, RecentFile };
