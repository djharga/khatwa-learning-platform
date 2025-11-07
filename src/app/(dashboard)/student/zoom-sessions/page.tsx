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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">جاري تحميل الجلسات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <Video className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              الجلسات المباشرة
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            حضور الجلسات المباشرة عبر Zoom
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
        >
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <div className="flex items-center gap-2">
              {(['all', 'live', 'scheduled', 'ended'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filter === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
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
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSessions.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
              <Video className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>لا توجد جلسات متاحة</p>
            </div>
          ) : (
            filteredSessions.map((session) => (
              <ZoomSessionCard
                key={session.id}
                session={session}
                onJoin={handleJoin}
                onCopyLink={handleCopyLink}
              />
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}

