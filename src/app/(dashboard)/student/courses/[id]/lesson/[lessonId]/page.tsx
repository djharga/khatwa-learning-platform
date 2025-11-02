import { notFound } from 'next/navigation';

interface LessonPageProps {
  params: {
    id: string;
    lessonId: string;
  };
}

export default function LessonPage({ params }: LessonPageProps) {
  // بيانات وهمية للدرس
  const lessons = {
    '1': {
      title: 'مقدمة في المراجعة الداخلية',
      content: 'هذا الدرس يغطي أساسيات المراجعة الداخلية...',
      videoUrl: 'https://example.com/video1.mp4',
    },
    '2': {
      title: 'أنواع المخاطر في الشركات',
      content: 'في هذا الدرس، سنتعرف على أنواع المخاطر المختلفة...',
      videoUrl: 'https://example.com/video2.mp4',
    },
    // إضافة المزيد حسب الحاجة
  };

  const lesson = lessons[params.lessonId as keyof typeof lessons];

  if (!lesson) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
        {lesson.title}
      </h1>

      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 mb-8">
        <div className="aspect-video bg-neutral-200 dark:bg-neutral-700 rounded-lg mb-6 flex items-center justify-center">
          <p className="text-neutral-500">فيديو الدرس: {lesson.videoUrl}</p>
          {/* هنا يمكن إضافة مشغل فيديو حقيقي */}
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p>{lesson.content}</p>
        </div>
      </div>

      <div className="flex justify-between">
        <button className="px-6 py-3 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 rounded-lg font-medium">
          الدرس السابق
        </button>
        <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium">
          الدرس التالي
        </button>
      </div>
    </div>
  );
}
