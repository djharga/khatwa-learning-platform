'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import {
  Video,
  Calendar,
  Clock,
  Users,
  ExternalLink,
  Copy,
  CheckCircle,
  AlertCircle,
  Play,
  MessageCircle,
} from 'lucide-react';
import type { ZoomSession } from '@/types/zoom';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

interface ZoomSessionCardProps {
  session: ZoomSession;
  onJoin?: (sessionId: string) => void;
  onCopyLink?: (link: string) => void;
  onShare?: (sessionId: string) => void;
  className?: string;
}

const ZoomSessionCard: FC<ZoomSessionCardProps> = ({
  session,
  onJoin,
  onCopyLink,
  onShare,
  className = '',
}) => {
  const { user } = useAuth();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: ZoomSession['status']) => {
    switch (status) {
      case 'live':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800';
      case 'scheduled':
        return 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 border border-primary-200 dark:border-primary-800';
      case 'ended':
        return 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700';
      case 'cancelled':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-800';
      default:
        return 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700';
    }
  };

  const getStatusLabel = (status: ZoomSession['status']) => {
    switch (status) {
      case 'live':
        return 'مباشر الآن';
      case 'scheduled':
        return 'مجدولة';
      case 'ended':
        return 'انتهت';
      case 'cancelled':
        return 'ملغاة';
      default:
        return status;
    }
  };

  const isRegistered = user?.id && session.registeredParticipants.includes(user.id);
  const canJoin = session.status === 'live' || session.status === 'scheduled';
  const isUpcoming = new Date(session.startTime) > new Date();

  const handleCopyLink = () => {
    if (onCopyLink) {
      onCopyLink(session.joinUrl);
    } else {
      navigator.clipboard.writeText(session.joinUrl);
      toast.success('تم نسخ رابط الجلسة');
    }
  };

  const handleJoin = () => {
    if (onJoin) {
      onJoin(session.id);
    } else {
      window.open(session.joinUrl, '_blank');
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare(session.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-700',
        'p-6 hover:shadow-lg transition-all duration-300',
        session.status === 'live' && 'ring-2 ring-red-500 shadow-red-500/20',
        className
      )}
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Video className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              {session.title}
            </h3>
          </div>
          {session.description && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 leading-relaxed">
              {session.description}
            </p>
          )}
          <div className="flex items-center gap-2">
            <span
              className={cn('px-3 py-1 rounded-full text-xs font-semibold', getStatusColor(session.status))}
            >
              {getStatusLabel(session.status)}
            </span>
            {isRegistered && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                مسجل
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
          <Calendar className="w-4 h-4 text-primary-600 dark:text-primary-400" />
          <span>{formatDate(session.startTime)}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
          <Clock className="w-4 h-4 text-primary-600 dark:text-primary-400" />
          <span>مدة الجلسة: {session.duration} دقيقة</span>
        </div>
        {session.maxParticipants && (
          <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
            <Users className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span>
              {session.currentParticipants || 0} / {session.maxParticipants} مشارك
            </span>
          </div>
        )}
        {session.whatsappLinkSent && (
          <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
            <MessageCircle className="w-4 h-4" />
            <span>تم إرسال الرابط عبر واتساب</span>
          </div>
        )}
        {session.telegramLinkSent && (
          <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
            <MessageCircle className="w-4 h-4" />
            <span>تم إرسال الرابط عبر تليجرام</span>
          </div>
        )}
      </div>

      {/* Actions */}
      {canJoin && (
        <div className="flex items-center gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
          {session.status === 'live' ? (
            <motion.button
              onClick={handleJoin}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="w-5 h-5" />
              انضم الآن
            </motion.button>
          ) : isUpcoming ? (
            <motion.button
              onClick={handleJoin}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Video className="w-5 h-5" />
              انضم عند البدء
            </motion.button>
          ) : null}

          <motion.button
            onClick={handleCopyLink}
            className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all duration-200 shadow-sm hover:shadow-md"
            title="نسخ الرابط"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Copy className="w-5 h-5" />
          </motion.button>

          <motion.button
            onClick={handleShare}
            className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all duration-200 shadow-sm hover:shadow-md"
            title="مشاركة"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="w-5 h-5" />
          </motion.button>
        </div>
      )}

      {session.status === 'ended' && (
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700" dir="rtl">
          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <AlertCircle className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
            <span>انتهت هذه الجلسة</span>
          </div>
          {session.recordingUrl && (
            <a
              href={session.recordingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200"
            >
              <Video className="w-4 h-4" />
              مشاهدة التسجيل
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ZoomSessionCard;

