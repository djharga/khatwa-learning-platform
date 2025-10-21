'use client';

import { useState, useRef, useEffect, useCallback, memo, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import {
  MessageCircle,
  Send,
  Share2,
  Monitor,
  Users,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  PhoneOff,
  Settings,
  Paperclip,
  FileText,
  Image,
  File,
  Download,
  Eye,
  Calendar,
  Clock,
  User,
  Plus,
  MoreVertical,
  Volume2,
  VolumeX,
  Camera,
  CameraOff,
  Hand,
  Maximize2,
  Minimize2,
  Grid3X3,
  UserPlus,
  Shield,
  Zap,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { useNotifications } from './NotificationProvider';

/**
 * Shared file in meeting room with uploader and timestamp
 */
interface SharedFile {
  id: string;
  name: string;
  type: 'document' | 'image' | 'video' | 'presentation';
  size: string;
  sharedBy: string;
  sharedAt: string;
  thumbnail?: string;
  downloadCount: number;
  isStarred: boolean;
}

/**
 * Chat message with sender, content, timestamp, and optional reactions
 */
interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: string;
  type: 'message' | 'system' | 'file' | 'reaction';
  avatar?: string;
  reactions?: { emoji: string; users: string[] }[];
  isEdited?: boolean;
  replyTo?: string;
}

/**
 * Meeting participant with status and media states
 */
interface Participant {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  isMuted: boolean;
  isVideoOn: boolean;
  role: 'host' | 'participant' | 'moderator';
  connectionQuality: 'excellent' | 'good' | 'poor' | 'offline';
  handRaised: boolean;
  speaking: boolean;
  lastSeen?: string;
}

/**
 * Props for MeetingHeader subcomponent
 */
interface MeetingHeaderProps {
  meetingDuration: number;
  connectionStatus: 'connected' | 'connecting' | 'disconnected';
  viewMode: 'grid' | 'speaker' | 'gallery';
  setViewMode: (mode: 'grid' | 'speaker' | 'gallery') => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  isScreenSharing: boolean;
  toggleScreenShare: () => void;
  isRecording: boolean;
  toggleRecording: () => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
}

/**
 * Props for FilesSidebar subcomponent
 */
interface FilesSidebarProps {
  sharedFiles: SharedFile[];
  setSharedFiles: React.Dispatch<React.SetStateAction<SharedFile[]>>;
  participants: Participant[];
  showParticipants: boolean;
  setShowParticipants: (show: boolean) => void;
  meetingStats: {
    totalParticipants: number;
    maxParticipants: number;
    bandwidth: string;
    latency: string;
  };
  setShowFileUpload: (show: boolean) => void;
  getFileIcon: (type: SharedFile['type']) => React.ReactNode;
  getConnectionIcon: (quality: Participant['connectionQuality']) => React.ReactNode;
}

/**
 * Props for ChatPanel subcomponent
 */
interface ChatPanelProps {
  chatMessages: ChatMessage[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  sendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  showChat: boolean;
  setShowChat: (show: boolean) => void;
}

/**
 * Props for ControlBar subcomponent
 */
interface ControlBarProps {
  isMicOn: boolean;
  toggleMic: () => void;
  isVideoOn: boolean;
  toggleVideo: () => void;
  isScreenSharing: boolean;
  toggleScreenShare: () => void;
  isHandRaised: boolean;
  toggleHandRaise: () => void;
  showParticipants: boolean;
  setShowParticipants: (show: boolean) => void;
  participants: Participant[];
}

/**
 * Virtual meeting room component with video controls, chat, file sharing, and participant management. Features real-time chat with reactions, screen sharing, recording, hand raise, and connection status monitoring. Integrates with notification system for user feedback.
 */
const MeetingRoomComponent = memo(() => {
  const { addNotification } = useNotifications();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'speaker' | 'gallery'>(
    'grid'
  );
  const [connectionStatus, setConnectionStatus] = useState<
    'connected' | 'connecting' | 'disconnected'
  >('connected');
  const [meetingDuration, setMeetingDuration] = useState(0);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [showParticipants, setShowParticipants] = useState(true);
  const [showChat, setShowChat] = useState(true);
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);

  const controls = useAnimation();
  const meetingStartTime = useRef(Date.now());

  /**
   * Ends meeting call with confirmation
   */
  const handleEndCall = useCallback(() => {
    // Placeholder for end call logic
    console.log('Ending call...');
  }, []);

  const [sharedFiles, setSharedFiles] = useState<SharedFile[]>([
    {
      id: '1',
      name: 'عرض المشروع النهائي.pdf',
      type: 'document',
      size: '2.3 MB',
      sharedBy: 'أحمد محمد',
      sharedAt: '10:30',
      thumbnail: '/api/placeholder/100/100',
      downloadCount: 12,
      isStarred: true,
    },
    {
      id: '2',
      name: 'رسم بياني المبيعات.png',
      type: 'image',
      size: '1.8 MB',
      sharedBy: 'فاطمة علي',
      sharedAt: '10:25',
      downloadCount: 8,
      isStarred: false,
    },
    {
      id: '3',
      name: 'فيديو العرض التقديمي.mp4',
      type: 'video',
      size: '45.2 MB',
      sharedBy: 'محمد حسن',
      sharedAt: '10:20',
      downloadCount: 5,
      isStarred: true,
    },
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      user: 'System',
      message: 'انضم أحمد محمد إلى الاجتماع',
      timestamp: '10:15',
      type: 'system',
    },
    {
      id: '2',
      user: 'فاطمة علي',
      message: 'مرحباً بكم جميعاً، سنبدأ بعرض المشروع',
      timestamp: '10:16',
      type: 'message',
      avatar: '/api/placeholder/40/40',
      reactions: [
        { emoji: '👍', users: ['أحمد محمد', 'محمد حسن'] },
        { emoji: '👏', users: ['سارة أحمد'] },
      ],
    },
    {
      id: '3',
      user: 'محمد حسن',
      message: 'أهلاً، جاهز للبدء',
      timestamp: '10:17',
      type: 'message',
      avatar: '/api/placeholder/40/40',
    },
    {
      id: '4',
      user: 'سارة أحمد',
      message: 'ممتاز! لدي بعض الأسئلة حول النقاط المالية',
      timestamp: '10:18',
      type: 'message',
      avatar: '/api/placeholder/40/40',
      replyTo: '2',
    },
  ]);

  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: '1',
      name: 'أحمد محمد',
      avatar: '/api/placeholder/40/40',
      isOnline: true,
      isMuted: false,
      isVideoOn: true,
      role: 'host',
      connectionQuality: 'excellent',
      handRaised: false,
      speaking: true,
    },
    {
      id: '2',
      name: 'فاطمة علي',
      avatar: '/api/placeholder/40/40',
      isOnline: true,
      isMuted: true,
      isVideoOn: false,
      role: 'moderator',
      connectionQuality: 'good',
      handRaised: false,
      speaking: false,
    },
    {
      id: '3',
      name: 'محمد حسن',
      avatar: '/api/placeholder/40/40',
      isOnline: true,
      isMuted: false,
      isVideoOn: true,
      role: 'participant',
      connectionQuality: 'excellent',
      handRaised: true,
      speaking: false,
    },
    {
      id: '4',
      name: 'سارة أحمد',
      avatar: '/api/placeholder/40/40',
      isOnline: true,
      isMuted: false,
      isVideoOn: true,
      role: 'participant',
      connectionQuality: 'good',
      handRaised: false,
      speaking: false,
    },
  ]);

  /**
   * Sidebar panel displaying shared files, participants preview, and meeting statistics. Features file upload and download actions.
   */
  const FilesSidebar: React.FC<FilesSidebarProps> = ({
    sharedFiles,
    setSharedFiles,
    participants,
    showParticipants,
    setShowParticipants,
    meetingStats,
    setShowFileUpload,
    getFileIcon,
    getConnectionIcon,
  }) => (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="col-span-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 overflow-hidden flex flex-col border border-white/20"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <Share2 className="w-5 h-5 mr-2 text-blue-600" />
          الملفات المشتركة
          <span className="ml-2 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
            {sharedFiles.length}
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFileUpload(true)}
            className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
            title="رفع ملف جديد"
          >
            <Plus className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            title="إعدادات الملفات"
          >
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </motion.button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {sharedFiles.map((file, index) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="group bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200 hover:border-blue-300"
          >
            <div className="flex items-start space-x-3 space-x-reverse">
              {file.thumbnail ? (
                <img
                  src={file.thumbnail}
                  alt={file.name}
                  className="w-12 h-12 rounded-lg object-cover border border-gray-300 group-hover:border-blue-400 transition-colors"
                />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center border border-gray-300 group-hover:border-blue-400 transition-colors">
                  {getFileIcon(file.type)}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {file.name}
                  </h3>
                  {file.isStarred && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-yellow-500">⭐</span>
                    </motion.div>
                  )}
                </div>
                <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600 mt-1">
                  <span>{file.size}</span>
                  <span>•</span>
                  <span>{file.sharedBy}</span>
                  <span>•</span>
                  <span>{file.sharedAt}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    {file.downloadCount} تحميل
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 space-x-reverse mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="عرض"
              >
                <Eye className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="تحميل"
              >
                <Download className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                title={file.isStarred ? 'إلغاء التمييز' : 'تمييز'}
              >
                <span className="text-sm">
                  {file.isStarred ? '⭐' : '☆'}
                </span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Participants Preview */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800">
            المشاركون ({participants.length})
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowParticipants(!showParticipants)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            {showParticipants ? 'إخفاء' : 'عرض الكل'}
          </motion.button>
        </div>

        <div className="flex -space-x-2 space-x-reverse overflow-hidden">
          {participants.slice(0, 5).map((participant, index) => (
            <motion.div
              key={participant.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <img
                src={participant.avatar}
                alt={participant.name}
                className={`w-10 h-10 rounded-full border-2 shadow-sm transition-all duration-200 ${
                  participant.speaking
                    ? 'border-green-400 ring-2 ring-green-200'
                    : participant.handRaised
                      ? 'border-yellow-400 ring-2 ring-yellow-200'
                      : 'border-white'
                }`}
              />

              {/* Connection Quality Indicator */}
              <div className="absolute -bottom-1 -right-1">
                {getConnectionIcon(participant.connectionQuality)}
              </div>

              {/* Role Badge */}
              {participant.role === 'host' && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <Shield className="w-2 h-2 text-white" />
                </div>
              )}

              {/* Speaking Indicator */}
              {participant.speaking && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-green-400"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}

              {/* Hand Raised Indicator */}
              {participant.handRaised && (
                <motion.div
                  className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Hand className="w-3 h-3 text-white" />
                </motion.div>
              )}

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                {participant.name}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </motion.div>
          ))}
          {participants.length > 5 && (
            <motion.div
              className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-xs font-medium text-gray-600">
                +{participants.length - 5}
              </span>
            </motion.div>
          )}
        </div>

        {/* Meeting Stats */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">عرض النطاق:</span>
            <span className="font-medium">{meetingStats.bandwidth}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-gray-600">زمن الاستجابة:</span>
            <span className="font-medium">{meetingStats.latency}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  /**
   * Chat panel with message thread, reactions, and message input. Features file attachment and emoji support.
   */
  const ChatPanel: React.FC<ChatPanelProps> = ({
    chatMessages,
    newMessage,
    setNewMessage,
    sendMessage,
    handleKeyPress,
    fileInputRef,
    showChat,
    setShowChat,
  }) => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="col-span-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 flex flex-col border border-white/20"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <MessageCircle className="w-5 h-5 mr-2 text-green-600" />
          المحادثة
          <span className="ml-2 bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
            {chatMessages.filter((m) => m.type === 'message').length}
          </span>
        </h2>
        <div className="flex items-center space-x-2 space-x-reverse">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            title="إعدادات الصوت"
          >
            <Volume2 className="w-4 h-4 text-gray-600" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fileInputRef.current?.click()}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            title="إرفاق ملف"
          >
            <Paperclip className="w-4 h-4 text-gray-600" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowChat(!showChat)}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            title={showChat ? 'إخفاء الدردشة' : 'إظهار الدردشة'}
          >
            <MessageCircle className="w-4 h-4 text-gray-600" />
          </motion.button>
        </div>
      </div>

      {/* Enhanced Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {chatMessages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex ${message.user === 'أنت' ? 'justify-end' : 'justify-start'} group`}
          >
            <div className="flex items-start space-x-2 space-x-reverse max-w-xs lg:max-w-md">
              {message.user !== 'أنت' && message.avatar && (
                <img
                  src={message.avatar}
                  alt={message.user}
                  className="w-8 h-8 rounded-full flex-shrink-0"
                />
              )}

              <div
                className={`px-4 py-2 rounded-2xl relative ${
                  message.type === 'system'
                    ? 'bg-gray-100 text-gray-600 text-center text-sm'
                    : message.user === 'أنت'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.replyTo && (
                  <div className="text-xs text-gray-500 mb-1 border-r-2 border-blue-300 pr-2">
                    رد على:{' '}
                    {
                      chatMessages.find((m) => m.id === message.replyTo)
                        ?.user
                    }
                  </div>
                )}

                {message.type !== 'system' && (
                  <div
                    className={`text-xs opacity-75 mb-1 ${message.user === 'أنت' ? 'text-blue-100' : 'text-gray-500'}`}
                  >
                    {message.user}
                    {message.isEdited && (
                      <span className="ml-1 text-xs">(مُعدّل)</span>
                    )}
                  </div>
                )}

                <div className="text-sm">{message.message}</div>

                <div className="flex items-center justify-between mt-1">
                  <div
                    className={`text-xs ${message.user === 'أنت' ? 'text-blue-100' : 'text-gray-500'}`}
                  >
                    {message.timestamp}
                  </div>

                  {message.reactions && message.reactions.length > 0 && (
                    <div className="flex items-center gap-1">
                      {message.reactions.map((reaction, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.2 }}
                          className="text-xs bg-white/20 px-1 py-0.5 rounded-full flex items-center gap-1"
                        >
                          <span>{reaction.emoji}</span>
                          <span>{reaction.users.length}</span>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {message.user === 'أنت' && message.avatar && (
                <img
                  src={message.avatar}
                  alt={message.user}
                  className="w-8 h-8 rounded-full flex-shrink-0"
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Message Input */}
      <div className="flex space-x-3 space-x-reverse">
        <div className="flex-1 relative">
          <textarea
            ref={chatInputRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="اكتب رسالة... (اضغط Enter للإرسال، Shift+Enter للسطر الجديد)"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 resize-none min-h-[48px] max-h-32"
            rows={1}
            style={{ height: 'auto' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height =
                Math.min(target.scrollHeight, 128) + 'px';
            }}
          />
          <div className="absolute bottom-2 left-2 text-xs text-gray-400">
            {newMessage.length}/500
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
              newMessage.trim()
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            title="إرسال الرسالة"
          >
            <Send className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            title="إضافة رد فعل"
          >
            <span className="text-lg">😊</span>
          </motion.button>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.mp4,.mov"
        onChange={handleFileUpload}
        className="hidden"
      />
    </motion.div>
  );

  /**
   * Fixed bottom control bar with media controls, hand raise, participant toggle, and call end button. Features status indicators and tooltips.
   */
  const ControlBar: React.FC<ControlBarProps> = ({
    isMicOn,
    toggleMic,
    isVideoOn,
    toggleVideo,
    isScreenSharing,
    toggleScreenShare,
    isHandRaised,
    toggleHandRaise,
    showParticipants,
    setShowParticipants,
    participants,
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-white/20"
    >
      <div className="flex items-center space-x-4 space-x-reverse">
        {/* Mic */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMic}
          className={`p-4 rounded-xl transition-all duration-200 relative ${
            isMicOn
              ? 'bg-gray-100 hover:bg-gray-200'
              : 'bg-red-100 hover:bg-red-200'
          }`}
          title={isMicOn ? 'كتم الميكروفون' : 'تشغيل الميكروفون'}
        >
          {isMicOn ? (
            <Mic className="w-6 h-6 text-gray-700" />
          ) : (
            <MicOff className="w-6 h-6 text-red-600" />
          )}
          {isMicOn && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.button>

        {/* Camera */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleVideo}
          className={`p-4 rounded-xl transition-all duration-200 relative ${
            isVideoOn
              ? 'bg-gray-100 hover:bg-gray-200'
              : 'bg-red-100 hover:bg-red-200'
          }`}
          title={isVideoOn ? 'إيقاف الكاميرا' : 'تشغيل الكاميرا'}
        >
          {isVideoOn ? (
            <Video className="w-6 h-6 text-gray-700" />
          ) : (
            <VideoOff className="w-6 h-6 text-red-600" />
          )}
          {isVideoOn && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.button>

        {/* Screen Share */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleScreenShare}
          className={`p-4 rounded-xl transition-all duration-200 ${
            isScreenSharing
              ? 'bg-blue-100 hover:bg-blue-200'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
          title={isScreenSharing ? 'إيقاف مشاركة الشاشة' : 'مشاركة الشاشة'}
        >
          <Monitor
            className={`w-6 h-6 ${isScreenSharing ? 'text-blue-600' : 'text-gray-700'}`}
          />
        </motion.button>

        {/* Hand Raise */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleHandRaise}
          className={`p-4 rounded-xl transition-all duration-200 relative ${
            isHandRaised
              ? 'bg-yellow-200 hover:bg-yellow-300'
              : 'bg-yellow-100 hover:bg-yellow-200'
          }`}
          title={isHandRaised ? 'خفض اليد' : 'رفع اليد'}
        >
          <Hand
            className={`w-6 h-6 ${isHandRaised ? 'text-yellow-800' : 'text-yellow-700'}`}
          />
          {isHandRaised && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.button>

        {/* Participants */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowParticipants(!showParticipants)}
          className="p-4 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors relative"
          title="المشاركون"
        >
          <Users className="w-6 h-6 text-gray-700" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
            {participants.length}
          </span>
        </motion.button>

        {/* End Call */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-4 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors ml-6"
          title="إنهاء المكالمة"
        >
          <PhoneOff className="w-6 h-6" />
        </motion.button>
      </div>
    </motion.div>
  );

  const [newMessage, setNewMessage] = useState('');
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [meetingStats, setMeetingStats] = useState({
    totalParticipants: 4,
    maxParticipants: 100,
    bandwidth: '2.5 Mbps',
    latency: '45ms',
  });

  const chatInputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setMeetingDuration(
        Math.floor((Date.now() - meetingStartTime.current) / 1000)
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Connection status simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const statuses: ('connected' | 'connecting' | 'disconnected')[] = [
        'connected',
        'connecting',
        'disconnected',
      ];
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];
      if (randomStatus !== connectionStatus) {
        setConnectionStatus(randomStatus);
        if (randomStatus === 'disconnected') {
          addNotification({
            type: 'error',
            title: 'انقطاع الاتصال',
            message: 'تم فقدان الاتصال بالإنترنت. جاري إعادة المحاولة...',
          });
        } else if (randomStatus === 'connected') {
          addNotification({
            type: 'success',
            title: 'تم استعادة الاتصال',
            message: 'تم الاتصال بنجاح مرة أخرى',
          });
        }
      }
    }, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [connectionStatus, addNotification]);

  /**
   * Sends chat message and shows notification
   */
  const sendMessage = useCallback(() => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        user: 'أنت',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString('ar-SA', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        type: 'message',
        avatar: '/api/placeholder/40/40',
      };
      setChatMessages((prev) => [...prev, message]);
      setNewMessage('');
      chatInputRef.current?.focus();
    }
  }, [newMessage]);

  /**
   * Toggles hand raise status with notification
   */
  const toggleHandRaise = useCallback(() => {
    setIsHandRaised(!isHandRaised);
    if (!isHandRaised) {
      addNotification({
        type: 'info',
        title: 'رفع اليد',
        message: 'تم رفع يدك. سيتم إشعار المضيف',
      });
    }
  }, [isHandRaised, addNotification]);

  /**
   * Toggles fullscreen mode for meeting room
   */
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  /**
   * Handles file upload to meeting room
   */
  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);
      setSelectedFiles(files);

      files.forEach((file) => {
        const newFile: SharedFile = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          type: file.type.startsWith('image/')
            ? 'image'
            : file.type.startsWith('video/')
              ? 'video'
              : file.type.includes('pdf')
                ? 'document'
                : 'presentation',
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          sharedBy: 'أنت',
          sharedAt: new Date().toLocaleTimeString('ar-SA', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          downloadCount: 0,
          isStarred: false,
        };

        setSharedFiles((prev) => [newFile, ...prev]);
      });

      addNotification({
        type: 'success',
        title: 'تم رفع الملفات',
        message: `تم رفع ${files.length} ملف بنجاح`,
      });
    },
    [addNotification]
  );

  const getFileIcon = (type: SharedFile['type']) => {
    const iconProps = { className: 'w-6 h-6' };

    switch (type) {
      case 'document':
        return <FileText {...iconProps} className="w-6 h-6 text-blue-600" />;
      case 'image':
        return <Image {...iconProps} className="w-6 h-6 text-green-600" />;
      case 'video':
        return <Video {...iconProps} className="w-6 h-6 text-red-600" />;
      case 'presentation':
        return <File {...iconProps} className="w-6 h-6 text-purple-600" />;
      default:
        return <File {...iconProps} className="w-6 h-6 text-gray-600" />;
    }
  };

  const getConnectionIcon = (quality: Participant['connectionQuality']) => {
    switch (quality) {
      case 'excellent':
        return <Wifi className="w-4 h-4 text-green-500" />;
      case 'good':
        return <Wifi className="w-4 h-4 text-yellow-500" />;
      case 'poor':
        return <Wifi className="w-4 h-4 text-red-500" />;
      case 'offline':
        return <WifiOff className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /**
   * Toggles screen sharing with notification
   */
  const toggleScreenShare = useCallback(() => {
    setIsScreenSharing(!isScreenSharing);
    addNotification({
      type: isScreenSharing ? 'info' : 'success',
      title: isScreenSharing
        ? 'تم إيقاف مشاركة الشاشة'
        : 'تم بدء مشاركة الشاشة',
      message: isScreenSharing
        ? 'لم تعد تشارك شاشتك'
        : 'أنت تشارك شاشتك الآن مع المشاركين',
    });
  }, [isScreenSharing, addNotification]);

  /**
   * Toggles meeting recording with notification
   */
  const toggleRecording = useCallback(() => {
    setIsRecording(!isRecording);
    addNotification({
      type: isRecording ? 'info' : 'success',
      title: isRecording ? 'تم إيقاف التسجيل' : 'تم بدء التسجيل',
      message: isRecording ? 'تم حفظ التسجيل' : 'يتم تسجيل الاجتماع الآن',
    });
  }, [isRecording, addNotification]);

  /**
   * Toggles microphone on/off
   */
  const toggleMic = useCallback(() => {
    setIsMicOn(!isMicOn);
    addNotification({
      type: 'info',
      title: isMicOn ? 'تم كتم الميكروفون' : 'تم تشغيل الميكروفون',
      message: isMicOn ? 'لم تعد تشارك الصوت' : 'أنت تشارك الصوت الآن',
    });
  }, [isMicOn, addNotification]);

  /**
   * Toggles video on/off
   */
  const toggleVideo = useCallback(() => {
    setIsVideoOn(!isVideoOn);
    addNotification({
      type: 'info',
      title: isVideoOn ? 'تم إيقاف الكاميرا' : 'تم تشغيل الكاميرا',
      message: isVideoOn ? 'لم تعد تشارك الفيديو' : 'أنت تشارك الفيديو الآن',
    });
  }, [isVideoOn, addNotification]);

  /**
   * Meeting room header with title, duration timer, connection status, and control buttons for screen share, recording, and fullscreen.
   */
  const MeetingHeader: React.FC<MeetingHeaderProps> = ({
    meetingDuration,
    connectionStatus,
    viewMode,
    setViewMode,
    isFullscreen,
    toggleFullscreen,
    isScreenSharing,
    toggleScreenShare,
    isRecording,
    toggleRecording,
    showSettings,
    setShowSettings,
  }) => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 border border-white/20"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 space-x-reverse">
          <motion.div
            className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Users className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              غرفة الاجتماعات
              <motion.div
                className={`w-3 h-3 rounded-full ${
                  connectionStatus === 'connected'
                    ? 'bg-green-500'
                    : connectionStatus === 'connecting'
                      ? 'bg-yellow-500 animate-pulse'
                      : 'bg-red-500 animate-pulse'
                }`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </h1>
            <div className="flex items-center gap-4 text-gray-600">
              <p>اجتماع فريق المشروع • {participants.length} مشارك</p>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="font-mono">
                  {formatDuration(meetingDuration)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 space-x-reverse">
          {/* View Mode Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              setViewMode(viewMode === 'grid' ? 'speaker' : 'grid')
            }
            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            title="تغيير طريقة العرض"
          >
            <Grid3X3 className="w-5 h-5 text-gray-600" />
          </motion.button>

          {/* Fullscreen Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleFullscreen}
            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            title={isFullscreen ? 'الخروج من وضع ملء الشاشة' : 'ملء الشاشة'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-5 h-5 text-gray-600" />
            ) : (
              <Maximize2 className="w-5 h-5 text-gray-600" />
            )}
          </motion.button>

          {/* Screen Share Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleScreenShare}
            className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              isScreenSharing
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg'
            }`}
          >
            <Monitor className="w-5 h-5 mr-2" />
            {isScreenSharing ? 'إيقاف المشاركة' : 'مشاركة الشاشة'}
          </motion.button>

          {/* Recording Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleRecording}
            className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
              isRecording
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full mr-2 ${isRecording ? 'bg-white animate-pulse' : 'bg-gray-500'}`}
            ></div>
            {isRecording ? 'إيقاف التسجيل' : 'تسجيل'}
          </motion.button>

          {/* Settings */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSettings(!showSettings)}
            className={`p-3 rounded-xl transition-colors ${
              showSettings
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            <Settings className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pt-20">
      <MeetingHeader
        meetingDuration={meetingDuration}
        connectionStatus={connectionStatus}
        viewMode={viewMode}
        setViewMode={setViewMode}
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
        isScreenSharing={isScreenSharing}
        toggleScreenShare={toggleScreenShare}
        isRecording={isRecording}
        toggleRecording={toggleRecording}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />

      {/* Enhanced Main Content */}
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
        {/* Enhanced Left Panel - Shared Files */}
        <FilesSidebar
          sharedFiles={sharedFiles}
          setSharedFiles={setSharedFiles}
          participants={participants}
          showParticipants={showParticipants}
          setShowParticipants={setShowParticipants}
          meetingStats={meetingStats}
          setShowFileUpload={setShowFileUpload}
          getFileIcon={getFileIcon}
          getConnectionIcon={getConnectionIcon}
        />

        {/* Enhanced Right Panel - Chat */}
        <ChatPanel
          chatMessages={chatMessages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessage={sendMessage}
          handleKeyPress={handleKeyPress}
          fileInputRef={fileInputRef}
          showChat={showChat}
          setShowChat={setShowChat}
        />
      </div>

      {/* Enhanced Control Bar */}
      <ControlBar
        isMicOn={isMicOn}
        toggleMic={toggleMic}
        isVideoOn={isVideoOn}
        toggleVideo={toggleVideo}
        isScreenSharing={isScreenSharing}
        toggleScreenShare={toggleScreenShare}
        isHandRaised={isHandRaised}
        toggleHandRaise={toggleHandRaise}
        showParticipants={showParticipants}
        setShowParticipants={setShowParticipants}
        participants={participants}
      />
    </div>
  );
});

MeetingRoomComponent.displayName = 'MeetingRoomComponent';

export default MeetingRoomComponent;
