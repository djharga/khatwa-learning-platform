import SidebarComponent from '@/components/layout/SidebarComponent';

export default function LessonLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string; lessonId?: string };
}) {
  return (
    <div className="flex min-h-screen">
      <SidebarComponent
        courseId={params.id}
        currentLessonId={params.lessonId}
      />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
