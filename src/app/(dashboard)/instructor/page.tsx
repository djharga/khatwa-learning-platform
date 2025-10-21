'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  MessageSquare,
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2,
  Video,
  FileText,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  students: number;
  lessons: number;
  duration: string;
  status: 'active' | 'draft' | 'completed';
  nextSession?: string;
  rating: number;
}

interface Student {
  id: string;
  name: string;
  email: string;
  progress: number;
  lastActivity: string;
  status: 'active' | 'inactive';
}

export default function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'students' | 'messages'>('overview');
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCourses([
        {
          id: '1',
          title: 'المحاسبة المالية المتقدمة',
          description: 'دورة شاملة في المحاسبة المالية',
          students: 45,
          lessons: 24,
          duration: '8 أسابيع',
          status: 'active',
          nextSession: '2024-02-20 10:00',
          rating: 4.8,
        },
        {
          id: '2',
          title: 'التدقيق والمراجعة الداخلية',
          description: 'أساسيات المراجعة الداخلية',
          students: 32,
          lessons: 18,
          duration: '6 أسابيع',
          status: 'active',
          nextSession: '2024-02-22 14:00',
          rating: 4.6,
        },
      ]);

      setStudents([
        {
          id: '1',
          name: 'أحمد محمد',
          email: 'ahmed@example.com',
          progress: 75,
          lastActivity: 'منذ ساعتين',
          status: 'active',
        },
        {
          id: '2',
          name: 'فاطمة أحمد',
          email: 'fatima@example.com',
          progress: 60,
          lastActivity: 'أمس',
          status: 'active',
        },
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const stats = [
    { title: 'إجمالي الطلاب', value: '156', icon: <Users className="w-6 h-6" />, color: 'text-blue-600' },
    { title: 'الدورات النشطة', value: '8', icon: <BookOpen className="w-6 h-6" />, color: 'text-green-600' },
    { title: 'الجلسات القادمة', value: '12', icon: <Calendar className="w-6 h-6" />, color: 'text-purple-600' },
    { title: 'متوسط التقييم', value: '4.7', icon: <TrendingUp className="w-6 h-6" />, color: 'text-orange-600' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة تحكم المدرس</h1>
          <p className="text-gray-600">إدارة دوراتك ومتابعة طلابك</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'نظرة عامة', icon: <Eye className="w-4 h-4" /> },
                { id: 'courses', label: 'دوراتي', icon: <BookOpen className="w-4 h-4" /> },
                { id: 'students', label: 'الطلاب', icon: <Users className="w-4 h-4" /> },
                { id: 'messages', label: 'الرسائل', icon: <MessageSquare className="w-4 h-4" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">النشاطات الأخيرة</h2>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    عرض الكل →
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">الدورات النشطة</h3>
                    <div className="space-y-3">
                      {courses.filter(course => course.status === 'active').map((course) => (
                        <div key={course.id} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{course.title}</h4>
                            <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">
                              نشط
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>{course.students} طالب</span>
                            <span>{course.lessons} درس</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">الطلاب النشطين</h3>
                    <div className="space-y-3">
                      {students.filter(student => student.status === 'active').map((student) => (
                        <div key={student.id} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{student.name}</h4>
                              <p className="text-sm text-gray-600">{student.email}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-blue-600">
                                {student.progress}% مكتمل
                              </div>
                              <div className="text-xs text-gray-500">
                                {student.lastActivity}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">إدارة الدورات</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    دورة جديدة
                  </button>
                </div>

                <div className="grid gap-4">
                  {courses.map((course) => (
                    <div key={course.id} className="p-6 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{course.title}</h3>
                          <p className="text-gray-600">{course.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{course.students}</div>
                          <div className="text-sm text-gray-600">طالب</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{course.lessons}</div>
                          <div className="text-sm text-gray-600">درس</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{course.duration}</div>
                          <div className="text-sm text-gray-600">المدة</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">{course.rating}</div>
                          <div className="text-sm text-gray-600">التقييم</div>
                        </div>
                      </div>

                      {course.nextSession && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium">الجلسة القادمة:</span>
                            <span className="text-sm text-blue-600">{course.nextSession}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'students' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">إدارة الطلاب</h2>
                <div className="grid gap-4">
                  {students.map((student) => (
                    <div key={student.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{student.name}</h3>
                          <p className="text-gray-600">{student.email}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">{student.progress}%</div>
                          <div className="text-sm text-gray-600">{student.lastActivity}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">الرسائل والتواصل</h2>
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">لا توجد رسائل جديدة</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
