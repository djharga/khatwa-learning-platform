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
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const timeouts = useRef<number[]>([]);
  const chatPanelRef = useRef<HTMLDivElement>(null);

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
            className={`rounded-xl p-2.5 border shadow-sm transition-all duration-300 backdrop-blur-sm ${
              isAssistant
                ? 'bg-white/85 border-purple-100'
                : isUser
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent'
                  : 'bg-slate-100/80 border-slate-200'
            }`}
            style={{ marginInlineStart: depth * 12 }}
          >
          <div className="flex items-center justify-between text-[9px] font-semibold mb-1 text-slate-500">
            <span className="flex items-center gap-0.5 text-slate-600">
              {message.parentId && <CornerDownRight className="w-2.5 h-2.5" />}
              {message.role === 'assistant'
                ? 'مساعد خطى'
                : message.role === 'user'
                  ? 'أنت'
                  : 'نظام'}
            </span>
            <span className="text-[8px]">{formatTime(message.timestamp)}</span>
          </div>
          <div className="text-[11px] leading-relaxed whitespace-pre-line text-slate-800">
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
          <div className="mt-1.5 flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <button
                type="button"
                onClick={() => setReplyTo(message)}
                className="px-2 py-0.5 text-[9px] rounded-full bg-white/60 hover:bg-white text-slate-600 border border-slate-200 transition-all"
              >
                رد
              </button>
              {isAssistant && (
                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    onClick={() => handleFeedback(message.id, 'up')}
                    className={`p-0.5 rounded-full border transition-all ${
                      message.feedback === 'up'
                        ? 'bg-emerald-100 border-emerald-200 text-emerald-600'
                        : 'border-slate-200 text-slate-500 hover:bg-emerald-50'
                    }`}
                    aria-label="تقييم الرد بالإيجاب"
                  >
                    <ThumbsUp className="w-2.5 h-2.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFeedback(message.id, 'down')}
                    className={`p-0.5 rounded-full border transition-all ${
                      message.feedback === 'down'
                        ? 'bg-rose-100 border-rose-200 text-rose-600'
                        : 'border-slate-200 text-slate-500 hover:bg-rose-50'
                    }`}
                    aria-label="تقييم الرد بالسلب"
                  >
                    <ThumbsDown className="w-2.5 h-2.5" />
                  </button>
                </div>
              )}
            </div>
            {message.feedback && (
              <span className="text-[10px]">
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
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-toggle"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-3 sm:px-4 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 shadow-xl hover:shadow-2xl transition-all duration-500 group"
            aria-label="فتح محادثة المساعد الذكي"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white">مساعد خطى</p>
              <p className="text-[10px] text-white/80">جاهز لمساعدتك</p>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatPanelRef}
            key="chat-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="w-[85vw] sm:w-[340px] md:w-[360px] lg:w-[380px] max-w-[380px] bg-gradient-to-br from-white via-slate-50 to-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200/70 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <div className="text-xs font-bold text-white">
                      مساعد خطى الذكي
                    </div>
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <Sparkles className="w-3 h-3 text-yellow-300" />
                    </motion.div>
                  </div>
                  <div className="text-[10px] text-white/80">جاهز لمساعدتك</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
                aria-label="إغلاق نافذة الدردشة"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="px-4 py-2.5 border-b border-slate-100 bg-white/60">
              <button
                type="button"
                onClick={() => setShowHistory((prev) => !prev)}
                className="flex items-center justify-between w-full text-[11px] font-semibold text-slate-600 hover:text-slate-800 transition-colors"
              >
                <span>سجل المحادثة ({sortedMessages.length})</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${showHistory ? 'rotate-180' : ''}`}
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

            <div className="px-4 py-3 max-h-[250px] overflow-y-auto space-y-3 bg-white/70 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
              {rootMessages.map((message) => renderThread(message))}
              <AnimatePresence>
                {isAssistantTyping && (
                  <motion.div
                    key="typing-indicator"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 w-fit"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-75"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.75, 0, 0.75] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-slate-600 font-medium mr-1">يفكر...</span>
                      <motion.span
                        animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-2 h-2 rounded-full bg-blue-500"
                      />
                      <motion.span
                        animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.2, 1] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          delay: 0.2,
                        }}
                        className="w-2 h-2 rounded-full bg-purple-500"
                      />
                      <motion.span
                        animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.2, 1] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          delay: 0.4,
                        }}
                        className="w-2 h-2 rounded-full bg-indigo-500"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="px-4 py-2.5 bg-white/85 border-t border-slate-200 space-y-2">
              {replyTo && (
                <div className="flex items-center justify-between text-[10px] bg-slate-100 border border-slate-200 rounded-xl px-2.5 py-1.5">
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
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              
              {/* اقتراحات ذكية */}
              {suggestions.length > 0 && !isAssistantTyping && (
                <div className="flex flex-wrap gap-1.5">
                  {suggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setInput(suggestion);
                        setSuggestions([]);
                      }}
                      className="px-2.5 py-1 text-[10px] bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 text-blue-700 rounded-lg hover:from-blue-100 hover:to-purple-100 transition-all flex items-center gap-1"
                    >
                      <Sparkles className="w-2.5 h-2.5" />
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
                  className="flex-1 resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-700 shadow-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  className="p-2.5 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="إرسال الرسالة"
                >
                  <Send className="w-3.5 h-3.5" />
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
