'use client';

import dynamic from 'next/dynamic';
import { ScrollAnimation } from '@/components/ui';
import { ShimmerSkeletonScreen } from '@/components/ui/Skeleton';

// Lazy load heavy file manager component
const FileManagerComponent = dynamic(() => import('../../components/FileManagerComponent'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen p-6">
      <ScrollAnimation direction="up" delay={0.1}>
        <div className="mb-6">
          <div className="animate-pulse bg-neutral-200 dark:bg-neutral-700 h-8 w-48 rounded-lg mb-2" />
          <div className="animate-pulse bg-neutral-200 dark:bg-neutral-700 h-4 w-64 rounded-lg" />
        </div>
      </ScrollAnimation>

      <ScrollAnimation direction="up" delay={0.2}>
        <ShimmerSkeletonScreen variant="cards" count={8} />
      </ScrollAnimation>
    </div>
  ),
});

export default function FilesPage() {
  return <FileManagerComponent />;
}
