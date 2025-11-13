'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/Skeleton';

// Lazy load heavy file manager component
const FileManagerComponent = dynamic(() => import('../../components/FileManagerComponent'), {
  ssr: false,
  loading: () => <Skeleton variant="card" className="h-screen" />,
});

export default function FilesPage() {
  return <FileManagerComponent />;
}
