import CMSComponent from '@/components/CMSComponent';

export default function CMSPage() {
  // في التطبيق الحقيقي، تحقق من صلاحيات المستخدم هنا
  // const user = getCurrentUser();
  // if (!user.hasCMSAccess) {
  //   return <AccessDenied />;
  // }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CMSComponent />
      </div>
    </div>
  );
}
