import { create } from 'zustand';

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
      // TODO: استبدال الرابط مع API حقيقي
      const response = await fetch(`/api/student/${studentId}`);
      const data = await response.json();

      set({
        id: data.id,
        name: data.name,
        email: data.email,
        enrolledCourses: data.enrolledCourses,
        recentFiles: data.recentFiles,
      });
    } catch (error) {
      console.error('فشل في جلب بيانات الطالب:', error);
    }
  },
}));

export default useStudentStore;
export type { Course, RecentFile };
