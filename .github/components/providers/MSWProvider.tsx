'use client';

/**
 * MSW Provider
 * تفعيل Mock Service Worker في وضع التطوير
 */

import { useEffect, useState } from 'react';

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    // تفعيل MSW فقط في وضع التطوير
    if (process.env.NODE_ENV === 'development') {
      import('../../../mocks/browser')
        .then(({ worker }) => {
          return worker.start({
            onUnhandledRequest: 'bypass',
            quiet: false, // إظهار التحذيرات للتطوير
            serviceWorker: {
              url: '/mockServiceWorker.js',
            },
          });
        })
        .then(() => {
          setMswReady(true);
        })
        .catch((error) => {
          console.error('Failed to start MSW:', error);
          setMswReady(true); // المتابعة حتى لو فشل MSW
        });
    } else {
      setMswReady(true);
    }
  }, []);

  // لا نعرض المحتوى حتى يكون MSW جاهزاً (في التطوير)
  if (!mswReady && process.env.NODE_ENV === 'development') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">جاري تحميل Mock Service Worker...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

