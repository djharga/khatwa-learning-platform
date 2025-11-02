'use client';

import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Clock, Users, Star, FileText, Video, Headphones, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { getCourseBySlug } from '@/data/courses/all-courses';

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>العودة إلى الدورات</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  {course.category}
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                  {course.title}
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  {course.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <Star className="w-5 h-5 text-yellow-300 fill-current" />
                    <span className="text-white font-semibold">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <Users className="w-5 h-5 text-white" />
                    <span className="text-white">{course.students.toLocaleString()} طالب</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <Clock className="w-5 h-5 text-white" />
                    <span className="text-white">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <span className="text-white font-bold">{course.price}</span>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Stats */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{course.files}</div>
                    <div className="text-sm text-gray-600">ملف</div>
                  </div>
                  <div className="text-center">
                    <Video className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{course.videos}</div>
                    <div className="text-sm text-gray-600">فيديو</div>
                  </div>
                  <div className="text-center">
                    <Headphones className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{course.audios}</div>
                    <div className="text-sm text-gray-600">صوتي</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Modules */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">محاور الدورة</h2>
                <div className="space-y-4">
                  {course.modules.map((module, moduleIndex) => (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: moduleIndex * 0.1 }}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 font-bold">{moduleIndex + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-3">{module.title}</h3>
                          <ul className="space-y-2">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <li key={lessonIndex} className="flex items-center gap-2 text-gray-600">
                                <ChevronRight className="w-4 h-4 text-blue-500" />
                                <span>{lesson}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">المستوى</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      course.level === 'مبتدئ' ? 'bg-green-100 text-green-700' :
                      course.level === 'متوسط' ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">عدد الدروس</h3>
                    <p className="text-gray-600">{course.lessons} درس</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">المدة</h3>
                    <p className="text-gray-600">{course.duration}</p>
                  </div>
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                    سجل في الدورة الآن
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

