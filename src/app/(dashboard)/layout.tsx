import React from 'react';
import PageBackground from '@/components/ui/PageBackground';

// Force dynamic rendering for all dashboard pages - they require authentication
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageBackground variant="dashboard" pattern>
      {children}
    </PageBackground>
  );
}
