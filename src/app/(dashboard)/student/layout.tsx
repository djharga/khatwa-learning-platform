import StudentSidebar from '@/components/layout/StudentSidebar';
import PageBackground from '@/components/ui/PageBackground';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageBackground variant="dashboard" pattern>
      {/* Sidebar */}
      <StudentSidebar />
      
      {/* Main Content - مع مساحة للـ Sidebar */}
      <main className="lg:mr-72 min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
          {children}
        </div>
      </main>
    </PageBackground>
  );
}
