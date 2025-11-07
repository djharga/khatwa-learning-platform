export default function LessonLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string; lessonId?: string };
}) {
  // PlayerShell handles its own layout and sidebar, so we don't need additional wrappers
  return <>{children}</>;
}

