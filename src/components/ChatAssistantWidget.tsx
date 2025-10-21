'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Send,
  X,
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
  CornerDownRight,
} from 'lucide-react';

type MessageRole = 'user' | 'assistant' | 'system';

type Message = {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  parentId?: string;
  feedback?: 'up' | 'down' | null;
};

const initialMessages: Message[] = [
  {
    id: 'm-1',
    role: 'system',
    content:
      'أهلاً بك في مساعد خطى المختص بمساندة محترفي المراجعة الداخلية والمحاسبة.',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'm-2',
    role: 'assistant',
    content:
      'يمكنني مساعدتك في بناء خطط التدريب، مراجعة التقارير، أو اقتراح مسارات التعلم الأنسب لفريقك.',
    timestamp: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
  },
  {
    id: 'm-3',
    role: 'user',
    content: 'أحتاج خطة قصيرة لتأهيل فريق جديد على معايير المراجعة الداخلية.',
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: 'm-4',
    role: 'assistant',
    content:
      'يمكننا البدء ببرنامج مكثف من ثلاث مراحل: أساسيات المعايير، تطبيقات عملية، ثم تقييم داخلي بعد أسبوعين.',
    timestamp: new Date(Date.now() - 1000 * 60 * 11).toISOString(),
    parentId: 'm-3',
  },
];

const formatTime = (timestamp: string) =>
  new Intl.DateTimeFormat('ar-EG', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));

const createId = () => `msg-${Math.random().toString(36).slice(2, 11)}`;

const ChatAssistantWidget = ({
  purpose = 'تقديم دعم ذكي للمهنيين في المراجعة الداخلية والمجالات المالية.',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [showHistory, setShowHistory] = useState(true);
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timeouts.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, []);

  const sortedMessages = useMemo(() => {
    return [...messages].sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  }, [messages]);

  const rootMessages = useMemo(
    () => sortedMessages.filter((message) => !message.parentId),
    [sortedMessages]
  );

  const getChildMessages = (parentId: string) =>
    sortedMessages.filter((message) => message.parentId === parentId);

  const handleFeedback = (messageId: string, value: 'up' | 'down') => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === messageId
          ? { ...message, feedback: message.feedback === value ? null : value }
          : message
      )
    );
  };

  const generateAssistantReply = (userMessage: Message): Message => {
    const suggestions = [
      'سأقترح عليك خطة تدريبية تفصيلية خلال لحظات بناءً على احتياجاتك.',
      'يمكنني مشاركة ملفات عمل جاهزة وقوائم تحقق لدعم فريقك فوراً.',
      'هل تود تقييم الوضع الحالي للفريق قبل تحديد التوصيات؟',
      'سأربط لك بين الدروس المتاحة وأفضل المحاضرين المتخصصين في هذا الموضوع.',
    ];
    const reply = suggestions[Math.floor(Math.random() * suggestions.length)];
    return {
      id: createId(),
      role: 'assistant',
      content: reply,
      timestamp: new Date().toISOString(),
      parentId: userMessage.id,
      feedback: null,
    };
  };

  const handleSendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }

    const userMessage: Message = {
      id: createId(),
      role: 'user',
      content: trimmed,
      timestamp: new Date().toISOString(),
      parentId: replyTo?.id,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setReplyTo(null);
    setIsAssistantTyping(true);

    const typingTimeout = window.setTimeout(() => {
      const assistantResponse = generateAssistantReply(userMessage);
      setMessages((prev) => [...prev, assistantResponse]);
      setIsAssistantTyping(false);
    }, 1200);

    timeouts.current.push(typingTimeout);
  };

  const renderThread = (message: Message, depth = 0) => {
    const isAssistant = message.role === 'assistant';
    const isUser = message.role === 'user';
    const children = getChildMessages(message.id);

    return (
      <div key={message.id} className="space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`rounded-3xl p-4 border shadow-sm transition-all duration-300 backdrop-blur-sm ${
            isAssistant
              ? 'bg-white/85 border-purple-100'
              : isUser
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent'
                : 'bg-slate-100/80 border-slate-200'
          }`}
          style={{ marginInlineStart: depth * 18 }}
        >
          <div className="flex items-center justify-between text-xs font-semibold mb-2 text-slate-500">
            <span className="flex items-center gap-1 text-slate-600">
              {message.parentId && <CornerDownRight className="w-3.5 h-3.5" />}
              {message.role === 'assistant'
                ? 'مساعد خطى'
                : message.role === 'user'
                  ? 'أنت'
                  : 'رسالة نظام'}
            </span>
            <span>{formatTime(message.timestamp)}</span>
          </div>
          <div className="text-sm leading-relaxed whitespace-pre-line text-slate-800">
            <AnimatePresence mode="wait">
              <motion.p
                key={message.content}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={isUser ? 'text-white' : 'text-slate-800'}
              >
                {message.content}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <button
                type="button"
                onClick={() => setReplyTo(message)}
                className="px-3 py-1 rounded-full bg-white/60 hover:bg-white text-slate-600 border border-slate-200 transition-all"
              >
                رد
              </button>
              {isAssistant && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleFeedback(message.id, 'up')}
                    className={`p-1.5 rounded-full border transition-all ${
                      message.feedback === 'up'
                        ? 'bg-emerald-100 border-emerald-200 text-emerald-600'
                        : 'border-slate-200 text-slate-500 hover:bg-emerald-50'
                    }`}
                    aria-label="تقييم الرد بالإيجاب"
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFeedback(message.id, 'down')}
                    className={`p-1.5 rounded-full border transition-all ${
                      message.feedback === 'down'
                        ? 'bg-rose-100 border-rose-200 text-rose-600'
                        : 'border-slate-200 text-slate-500 hover:bg-rose-50'
                    }`}
                    aria-label="تقييم الرد بالسلب"
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            {message.feedback && (
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  message.feedback === 'up'
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-rose-100 text-rose-600'
                }`}
              >
                {message.feedback === 'up'
                  ? 'تم تقييمه بشكل إيجابي'
                  : 'تم تقييمه بشكل سلبي'}
              </span>
            )}
          </div>
        </motion.div>
        {children.length > 0 && (
          <div className="space-y-3">
            {children.map((child) => renderThread(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-toggle"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 px-5 py-4 rounded-full bg-white shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-500"
            aria-label="فتح محادثة المساعد الذكي"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 flex items-center justify-center text-white">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-800">مساعد خطى</p>
              <p className="text-xs text-slate-500">جاهز لمساعدتك الآن</p>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="w-[360px] lg:w-[420px] bg-gradient-to-br from-white via-slate-50 to-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
              <div>
                <div className="text-sm font-semibold text-slate-800">
                  مساعد خطى الذكي
                </div>
                <div className="text-xs text-slate-500">{purpose}</div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all"
                aria-label="إغلاق نافذة الدردشة"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-5 py-3 border-b border-slate-100 bg-white/60">
              <button
                type="button"
                onClick={() => setShowHistory((prev) => !prev)}
                className="flex items-center justify-between w-full text-xs font-medium text-slate-600"
              >
                <span>سجل المحادثة</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${showHistory ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {showHistory && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-3 flex flex-wrap gap-2"
                  >
                    {sortedMessages.slice(-6).map((message) => (
                      <span
                        key={`history-${message.id}`}
                        className="px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-600 border border-slate-200"
                      >
                        {message.role === 'assistant'
                          ? 'رد المساعد'
                          : message.role === 'user'
                            ? 'سؤال سابق'
                            : 'معلومة'}
                      </span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="px-5 py-4 max-h-96 overflow-y-auto space-y-4 bg-white/70">
              {rootMessages.map((message) => renderThread(message))}
              <AnimatePresence>
                {isAssistantTyping && (
                  <motion.div
                    key="typing-indicator"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-slate-200 w-fit"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm">
                      AI
                    </div>
                    <div className="flex items-center gap-1">
                      <motion.span
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-2 h-2 rounded-full bg-slate-400"
                      />
                      <motion.span
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          delay: 0.2,
                        }}
                        className="w-2 h-2 rounded-full bg-slate-400"
                      />
                      <motion.span
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          delay: 0.4,
                        }}
                        className="w-2 h-2 rounded-full bg-slate-400"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="px-5 py-4 bg-white/85 border-t border-slate-200 space-y-3">
              {replyTo && (
                <div className="flex items-center justify-between text-xs bg-slate-100 border border-slate-200 rounded-2xl px-3 py-2">
                  <div className="truncate text-slate-600">
                    رد على:{' '}
                    {replyTo.role === 'assistant' ? 'رد المساعد' : 'رسالتك'}
                  </div>
                  <button
                    type="button"
                    onClick={() => setReplyTo(null)}
                    className="text-slate-400 hover:text-slate-600"
                    aria-label="إلغاء الرد"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  rows={2}
                  placeholder="اكتب سؤالك أو اطلب مساعدة الآن..."
                  className="flex-1 resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  className="p-4 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all"
                  aria-label="إرسال الرسالة"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatAssistantWidget;
