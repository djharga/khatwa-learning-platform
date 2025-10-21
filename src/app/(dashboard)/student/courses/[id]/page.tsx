'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

// تعريف واجهة لتفاصيل الكورس
interface CourseDetail {
  id: string;
  title: string;
  videos: {
    id: string;
    title: string;
    duration: string;
  }[];
  files: {
    id: string;
    title: string;
    type: string;
  }[];
  exams: {
    id: string;
    title: string;
    duration: string;
  }[];
  discussions: {
    id: string;
    title: string;
    author: string;
  }[];
}

// بيانات محاكاة للكورسات
const coursesData: Record<string, CourseDetail> = {
  '1': {
    id: '1',
    title: 'مقدمة في البرمجة',
    videos: [
      { id: '1', title: 'الفيديو الأول', duration: '15:30' },
      { id: '2', title: 'الفيديو الثاني', duration: '20:45' },
    ],
    files: [
      { id: '1', title: 'ملخص المحاضرة الأولى', type: 'pdf' },
      { id: '2', title: 'تمارين البرمجة', type: 'docx' },
    ],
    exams: [{ id: '1', title: 'اختبار الفصل الأول', duration: '30 دقيقة' }],
    discussions: [{ id: '1', title: 'سؤال حول البرمجة', author: 'محمد أحمد' }],
  },
  '2': {
    id: '2',
    title: 'تطوير الويب بـ React',
    videos: [{ id: '1', title: 'مقدمة في React', duration: '18:20' }],
    files: [{ id: '1', title: 'دليل React', type: 'pdf' }],
    exams: [],
    discussions: [],
  },
  '3': {
    id: '3',
    title: 'قواعد البيانات المتقدمة',
    videos: [{ id: '1', title: 'مقدمة في قواعد البيانات', duration: '18:20' }],
    files: [{ id: '1', title: 'دليل قواعد البيانات', type: 'pdf' }],
    exams: [],
    discussions: [],
  },
  '4': {
    id: '4',
    title: 'تعلم الذكاء الاصطناعي',
    videos: [
      { id: '1', title: 'مقدمة في الذكاء الاصطناعي', duration: '18:20' },
    ],
    files: [{ id: '1', title: 'دليل الذكاء الاصطناعي', type: 'pdf' }],
    exams: [],
    discussions: [],
  },
  '5': {
    id: '5',
    title: 'أمان المعلومات',
    videos: [{ id: '1', title: 'مقدمة في أمان المعلومات', duration: '18:20' }],
    files: [{ id: '1', title: 'دليل أمان المعلومات', type: 'pdf' }],
    exams: [],
    discussions: [],
  },
  '6': {
    id: '6',
    title: 'تصميم واجهات المستخدم',
    videos: [
      { id: '1', title: 'مقدمة في تصميم واجهات المستخدم', duration: '18:20' },
    ],
    files: [{ id: '1', title: 'دليل تصميم واجهات المستخدم', type: 'pdf' }],
    exams: [],
    discussions: [],
  },
};

interface PageProps {
  params: {
    id: string;
  };
}

const CoursePage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<
    'videos' | 'files' | 'exams' | 'discussion'
  >('videos');
  const [videoProgress, setVideoProgress] = useState<number>(0); // تقدم الفيديو (0-100)

  // تحويل id إلى string إذا كانت مصفوفة
  const courseId = Array.isArray(id) ? id[0] : id;

  // محاكاة بيانات الكورس
  const courseData = coursesData[courseId];

  // حفظ تقدم الفيديو
  const handleVideoProgress = (progress: number) => {
    setVideoProgress(progress);
    // TODO: إرسال التقدم إلى الخادم لحفظه
  };

  if (!courseData) {
    return <div className="p-6">الكورس غير موجود</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{courseData.title}</h1>

      {/* مشغل الفيديو الثابت */}
      <div className="mb-6 bg-black rounded-xl overflow-hidden">
        {/* مكان مشغل الفيديو الحقيقي */}
        <div className="w-full h-96 bg-gray-800 flex items-center justify-center">
          <span className="text-white text-xl">مشغل الفيديو</span>
        </div>

        {/* شريط التقدم */}
        <div className="w-full bg-gray-700 h-2">
          <div
            className="bg-blue-500 h-2"
            style={{ width: `${videoProgress}%` }}
          ></div>
        </div>
      </div>

      {/* تبويبات المحتوى */}
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          {(['videos', 'files', 'exams', 'discussion'] as const).map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'videos' && 'الفيديوهات'}
              {tab === 'files' && 'الملفات'}
              {tab === 'exams' && 'الاختبارات'}
              {tab === 'discussion' && 'المناقشة'}
            </button>
          ))}
        </div>

        {/* محتوى التبويب النشط */}
        <div className="p-4">
          {activeTab === 'videos' && (
            <ul className="space-y-3">
              {courseData.videos.map((video) => (
                <li
                  key={video.id}
                  className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{video.title}</h3>
                    <p className="text-sm text-gray-600">{video.duration}</p>
                  </div>
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => {
                      // TODO: تحميل وتشغيل الفيديو
                      setVideoProgress(0);
                    }}
                  >
                    تشغيل
                  </button>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'files' && (
            <ul className="space-y-3">
              {courseData.files.map((file) => (
                <li
                  key={file.id}
                  className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{file.title}</h3>
                    <p className="text-sm text-gray-600">{file.type}</p>
                  </div>
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => console.log(`تنزيل ${file.title}`)}
                  >
                    تنزيل
                  </button>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'exams' && (
            <ul className="space-y-3">
              {courseData.exams.map((exam) => (
                <li
                  key={exam.id}
                  className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{exam.title}</h3>
                    <p className="text-sm text-gray-600">{exam.duration}</p>
                  </div>
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => console.log(`بدء ${exam.title}`)}
                  >
                    بدء الاختبار
                  </button>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'discussion' && (
            <ul className="space-y-3">
              {courseData.discussions.map((discussion) => (
                <li
                  key={discussion.id}
                  className="p-3 hover:bg-gray-50 rounded-lg"
                >
                  <h3 className="font-medium">{discussion.title}</h3>
                  <p className="text-sm text-gray-600">
                    بواسطة: {discussion.author}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
