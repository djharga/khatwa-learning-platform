import StudentSidebar from '@/components/layout/StudentSidebar';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <StudentSidebar />
      
      {/* Main Content - مع مساحة للـ Sidebar */}
      <main className="lg:mr-72 min-h-screen pt-16">
        {children}
      </main>
    </div>
  );
}
