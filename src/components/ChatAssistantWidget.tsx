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
  Sparkles,
} from 'lucide-react';
import {
  analyzeIntent,
  generateIntelligentReply,
  generateSmartSuggestions,
  enhanceReplyWithContext,
  type ConversationHistory,
} from '@/lib/ai-assistant/intelligent-reply';
import { useReducedMotion } from '@/hooks/useReducedMotion';

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
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const saved = localStorage.getItem('chatAssistantMinimized');
      return saved === 'true';
    } catch {
      return false;
    }
  });
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [showHistory, setShowHistory] = useState(true);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const timeouts = useRef<number[]>([]);
  const chatPanelRef = useRef<HTMLDivElement>(null);

  // Save minimized state to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('chatAssistantMinimized', isMinimized.toString());
      } catch (error) {
        console.error('Failed to save chat assistant state:', error);
      }
    }
  }, [isMinimized]);

  useEffect(() => {
    return () => {
      timeouts.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, []);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && chatPanelRef.current && !chatPanelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

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

  const generateAssistantReply = (userMessage: Message): { message: Message; newSuggestions: string[] } => {
    // تحليل نية المستخدم
    const context = analyzeIntent(userMessage.content);
    
    // بناء تاريخ المحادثة
    const conversationHistory: ConversationHistory = {
      messages: messages
        .filter((m): m is Message & { role: 'user' | 'assistant' } => m.role !== 'system')
        .map(m => ({
          role: m.role,
          content: m.content,
          timestamp: m.timestamp,
        })),
      context: messages
        .filter(m => m.role === 'user')
        .map(m => analyzeIntent(m.content)),
    };

    // توليد رد ذكي
    let reply = generateIntelligentReply(userMessage.content, context, conversationHistory);
    
    // تحسين الرد بالسياق
    reply = enhanceReplyWithContext(reply, context, conversationHistory);

    // توليد اقتراحات ذكية
    const newSuggestions = generateSmartSuggestions(context, conversationHistory);

    const assistantMessage: Message = {
      id: createId(),
      role: 'assistant',
      content: reply,
      timestamp: new Date().toISOString(),
      parentId: userMessage.id,
      feedback: null,
    };

    return { message: assistantMessage, newSuggestions };
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

    // محاكاة وقت التفكير بناءً على طول الرسالة
    const thinkingTime = Math.min(800 + userMessage.content.length * 20, 2500);

    const typingTimeout = window.setTimeout(() => {
      const { message: assistantResponse, newSuggestions } = generateAssistantReply(userMessage);
      setMessages((prev) => [...prev, assistantResponse]);
      setSuggestions(newSuggestions);
      setIsAssistantTyping(false);
    }, thinkingTime);

    timeouts.current.push(typingTimeout);
  };

  const renderThread = (message: Message, depth = 0) => {
    const isAssistant = message.role === 'assistant';
    const isUser = message.role === 'user';
    const children = getChildMessages(message.id);

    return (
      <div key={message.id} className="space-y-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`rounded-lg p-3 border shadow-sm transition-all duration-300 backdrop-blur-sm ${
              isAssistant
                ? 'bg-white/85 dark:bg-neutral-800/85 border-purple-100 dark:border-purple-900/50'
                : isUser
                  ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white border-transparent'
                  : 'bg-slate-100/80 dark:bg-neutral-800/80 border-slate-200 dark:border-neutral-700'
            }`}
            style={{ marginInlineStart: depth * 12 }}
          >
          <div className="flex items-center justify-between text-xs font-semibold mb-1 text-slate-500 dark:text-neutral-400">
            <span className="flex items-center gap-1 text-slate-600 dark:text-neutral-300">
              {message.parentId && <CornerDownRight className="w-3 h-3" aria-hidden="true" />}
              {message.role === 'assistant'
                ? 'مساعد خطى'
                : message.role === 'user'
                  ? 'أنت'
                  : 'نظام'}
            </span>
            <span className="text-[10px]">{formatTime(message.timestamp)}</span>
          </div>
          <div className="text-sm leading-relaxed whitespace-pre-line text-slate-800 dark:text-slate-200">
            <AnimatePresence mode="wait">
              <motion.p
                key={message.content}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
                className={isUser ? 'text-white' : 'text-slate-800 dark:text-slate-200'}
              >
                {message.content}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <button
                type="button"
                onClick={() => setReplyTo(message)}
                className="px-2 py-1 text-xs rounded-full bg-white/60 dark:bg-neutral-700/60 hover:bg-white dark:hover:bg-neutral-600 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-neutral-700 transition-all"
                aria-label="الرد على هذه الرسالة"
              >
                رد
              </button>
              {isAssistant && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleFeedback(message.id, 'up')}
                    className={`p-1 rounded-full border transition-all ${
                      message.feedback === 'up'
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400'
                        : 'border-slate-200 dark:border-neutral-700 text-slate-500 dark:text-neutral-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                    }`}
                    aria-label="تقييم الرد بالإيجاب"
                  >
                    <ThumbsUp className="w-3 h-3" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFeedback(message.id, 'down')}
                    className={`p-1 rounded-full border transition-all ${
                      message.feedback === 'down'
                        ? 'bg-rose-100 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400'
                        : 'border-slate-200 dark:border-neutral-700 text-slate-500 dark:text-neutral-400 hover:bg-rose-50 dark:hover:bg-rose-900/20'
                    }`}
                    aria-label="تقييم الرد بالسلب"
                  >
                    <ThumbsDown className="w-3 h-3" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
            {message.feedback && (
              <span className="text-xs" aria-hidden="true">
                {message.feedback === 'up' ? '👍' : '👎'}
              </span>
            )}
          </div>
        </motion.div>
        {children.length > 0 && (
          <div className="space-y-2">
            {children.map((child) => renderThread(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Minimized button - shown when minimized and not open */}
      <AnimatePresence>
        {isMinimized && !isOpen && (
          <motion.button
            key="chat-minimized"
            initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
            onClick={() => {
              setIsMinimized(false);
              setIsOpen(true);
            }}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-600 via-purple-600 to-indigo-600 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:ring-offset-2 group"
            aria-label="فتح مساعد خطى"
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          >
            <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Normal button - shown when not minimized and not open */}
      <AnimatePresence>
        {!isOpen && !isMinimized && (
          <motion.button
            key="chat-toggle"
            initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-600 via-purple-600 to-indigo-600 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:ring-offset-2 group relative"
            aria-label="فتح محادثة المساعد الذكي"
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          >
            <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
            {!prefersReducedMotion && (
              <motion.div
                className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatPanelRef}
            key="chat-panel"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeOut' }}
            className="w-[calc(100vw-2rem)] sm:w-[320px] md:w-[340px] max-w-[340px] bg-gradient-to-br from-white via-slate-50 to-white dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-2xl shadow-xl overflow-hidden"
            style={{ 
              position: 'fixed',
              bottom: '5rem',
              right: '1rem',
              zIndex: 50,
              maxHeight: 'calc(100vh - 6rem)'
            }}
            role="dialog"
            aria-label="نافذة محادثة مساعد خطى"
            aria-modal="true"
          >
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200/70 dark:border-neutral-700/70 bg-gradient-to-r from-primary-600 via-purple-600 to-indigo-600 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                    <MessageCircle className="w-3 h-3" aria-hidden="true" />
                  </div>
                  {!prefersReducedMotion && (
                    <motion.div
                      className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border border-white"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  )}
                </div>
                <div className="text-sm font-bold text-white">
                  مساعد خطى
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setIsMinimized(true);
                  }}
                  className="w-5 h-5 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-all focus:outline-none focus:ring-1 focus:ring-white/50"
                  aria-label="تصغير نافذة الدردشة"
                  title="تصغير"
                >
                  <ChevronDown className="w-2.5 h-2.5 transform rotate-180" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="w-5 h-5 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-all focus:outline-none focus:ring-1 focus:ring-white/50"
                  aria-label="إغلاق نافذة الدردشة"
                  title="إغلاق"
                >
                  <X className="w-2.5 h-2.5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="px-3 py-2 border-b border-slate-100 bg-white/60">
              <button
                type="button"
                onClick={() => setShowHistory((prev) => !prev)}
                className="flex items-center justify-between w-full text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
              >
                <span>سجل المحادثة ({sortedMessages.length})</span>
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
                    className="mt-2 flex flex-wrap gap-1.5"
                  >
                    {sortedMessages.slice(-4).map((message) => (
                      <span
                        key={`history-${message.id}`}
                        className="px-2.5 py-1 text-xs rounded-full bg-slate-100 text-slate-600 border border-slate-200"
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

            <div className="px-3 py-2 max-h-[280px] overflow-y-auto space-y-2.5 bg-white/70 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                  {rootMessages.map((message) => renderThread(message))}
              <AnimatePresence>
                {isAssistantTyping && (
                  <motion.div
                    key="typing-indicator"
                    initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 w-fit"
                  >
                    <div className="relative">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
                        <Sparkles className="w-4 h-4" aria-hidden="true" />
                      </div>
                      {!prefersReducedMotion && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400 to-purple-400 opacity-75"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.75, 0, 0.75] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-slate-600 dark:text-slate-400 font-medium mr-1">يفكر...</span>
                      {!prefersReducedMotion ? (
                        <>
                          <motion.span
                            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="w-1.5 h-1.5 rounded-full bg-primary-500"
                          />
                          <motion.span
                            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.2, 1] }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              delay: 0.2,
                            }}
                            className="w-1.5 h-1.5 rounded-full bg-purple-500"
                          />
                          <motion.span
                            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.2, 1] }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              delay: 0.4,
                            }}
                            className="w-1.5 h-1.5 rounded-full bg-indigo-500"
                          />
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 opacity-60" />
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 opacity-60" />
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-60" />
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="px-3 py-2 bg-white/85 border-t border-slate-200 space-y-1.5">
              {replyTo && (
                <div className="flex items-center justify-between text-xs bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5">
                  <div className="truncate text-slate-600">
                    رد على:{' '}
                    {replyTo.role === 'assistant' ? 'المساعد' : 'رسالتك'}
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
              
              {/* اقتراحات ذكية */}
              {suggestions.length > 0 && !isAssistantTyping && (
                <div className="flex flex-wrap gap-1.5">
                  {suggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                      onClick={() => {
                        setInput(suggestion);
                        setSuggestions([]);
                      }}
                      className="px-2.5 py-1 text-xs bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 rounded-md hover:from-primary-100 hover:to-purple-100 dark:hover:from-primary-900/30 dark:hover:to-purple-900/30 transition-all flex items-center gap-1"
                      aria-label={`استخدام الاقتراح: ${suggestion}`}
                    >
                      <Sparkles className="w-3 h-3" aria-hidden="true" />
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              )}

              <div className="flex items-end gap-1.5">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  rows={1}
                  placeholder="اكتب سؤالك..."
                  className="flex-1 resize-none rounded-lg border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 shadow-sm focus:border-primary-400 dark:focus:border-primary-500 focus:ring-1 focus:ring-primary-100 dark:focus:ring-primary-900/50 transition-all placeholder:text-slate-400 dark:placeholder:text-neutral-500"
                  aria-label="اكتب سؤالك"
                />
                <motion.button
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  className="p-2.5 rounded-lg bg-gradient-to-br from-primary-600 via-purple-600 to-indigo-600 text-white shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-primary-400/50"
                  aria-label="إرسال الرسالة"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
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
