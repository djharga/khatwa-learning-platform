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
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'ended':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
      case 'cancelled':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
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
      className={`
        bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700
        p-6 hover:shadow-md transition-shadow
        ${session.status === 'live' ? 'ring-2 ring-red-500' : ''}
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Video className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {session.title}
            </h3>
          </div>
          {session.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {session.description}
            </p>
          )}
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}
            >
              {getStatusLabel(session.status)}
            </span>
            {isRegistered && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                مسجل
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(session.startTime)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Clock className="w-4 h-4" />
          <span>مدة الجلسة: {session.duration} دقيقة</span>
        </div>
        {session.maxParticipants && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Users className="w-4 h-4" />
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
        <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          {session.status === 'live' ? (
            <motion.button
              onClick={handleJoin}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="w-5 h-5" />
              انضم الآن
            </motion.button>
          ) : isUpcoming ? (
            <motion.button
              onClick={handleJoin}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Video className="w-5 h-5" />
              انضم عند البدء
            </motion.button>
          ) : null}

          <button
            onClick={handleCopyLink}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            title="نسخ الرابط"
          >
            <Copy className="w-5 h-5" />
          </button>

          <button
            onClick={handleShare}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            title="مشاركة"
          >
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      )}

      {session.status === 'ended' && (
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <AlertCircle className="w-4 h-4" />
            <span>انتهت هذه الجلسة</span>
          </div>
          {session.recordingUrl && (
            <a
              href={session.recordingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
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

