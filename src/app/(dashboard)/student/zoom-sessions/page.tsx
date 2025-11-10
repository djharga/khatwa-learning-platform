'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ZoomSessionCard from '@/components/trainee/ZoomSessionCard';
import type { ZoomSession } from '@/types/zoom';
import { zoomService } from '@/services/zoomService';
import { useAuth } from '@/contexts/AuthContext';
import { Video, Calendar, Filter, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ZoomSessionsPage() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<ZoomSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'live' | 'scheduled' | 'ended'>('all');

  useEffect(() => {
    loadSessions();
  }, [filter, user?.id]);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const filters: any = { userId: user?.id };
      if (filter !== 'all') {
        filters.status = filter;
      }
      const data = await zoomService.getSessions(filters);
      setSessions(data);
    } catch (error) {
      console.error('Error loading sessions:', error);
      toast.error('فشل تحميل الجلسات');
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = (sessionId: string) => {
    zoomService.getJoinUrl(sessionId, user?.id || '').then((joinUrl) => {
      window.open(joinUrl, '_blank');
    });
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success('تم نسخ رابط الجلسة');
  };

  const filteredSessions = sessions.filter((session) => {
    if (filter === 'all') return true;
    return session.status === filter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600 dark:text-primary-400 mx-auto mb-4" aria-hidden="true" />
          <p className="text-neutral-600 dark:text-neutral-400">جاري تحميل الجلسات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <Video className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600 dark:text-primary-400" aria-hidden="true" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
              الجلسات المباشرة
            </h1>
          </div>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            حضور الجلسات المباشرة عبر Zoom
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.2, ease: 'easeOut' }}
          className="mb-6 bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-700 p-4 sm:p-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-neutral-600 dark:text-neutral-400" aria-hidden="true" />
              <span className="text-sm sm:text-base font-medium text-neutral-700 dark:text-neutral-300">التصفية:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {(['all', 'live', 'scheduled', 'ended'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 sm:px-4 py-2 min-h-[44px] rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                    filter === status
                      ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md shadow-primary-500/20'
                      : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                  }`}
                  aria-label={`تصفية حسب ${status === 'all' ? 'الكل' : status === 'live' ? 'مباشر' : status === 'scheduled' ? 'مجدولة' : 'انتهت'}`}
                  aria-pressed={filter === status}
                  type="button"
                >
                  {status === 'all' && 'الكل'}
                  {status === 'live' && 'مباشر'}
                  {status === 'scheduled' && 'مجدولة'}
                  {status === 'ended' && 'انتهت'}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sessions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.2, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {filteredSessions.length === 0 ? (
            <div className="col-span-full text-center py-12 sm:py-16">
              <Video className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-neutral-300 dark:text-neutral-600 opacity-50" aria-hidden="true" />
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">لا توجد جلسات متاحة</p>
            </div>
          ) : (
            filteredSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05, duration: 0.2, ease: 'easeOut' }}
              >
                <ZoomSessionCard
                  session={session}
                  onJoin={handleJoin}
                  onCopyLink={handleCopyLink}
                />
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}

