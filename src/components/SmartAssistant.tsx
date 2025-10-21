'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Send,
  Bot,
  User,
  X,
  Minimize2,
  Maximize2,
  Volume2,
  VolumeX,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Lightbulb,
  BookOpen,
  Calculator,
  FileText,
  HelpCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  suggestions?: string[];
}

interface SmartAssistantProps {
  isOpen?: boolean;
  onToggle?: () => void;
  context?: 'general' | 'course' | 'audit' | 'technical';
  className?: string;
}

const SmartAssistant = ({
  isOpen = false,
  onToggle,
  context = 'general',
  className = ""
}: SmartAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'مرحباً! أنا مساعدك الذكي في منصة خطى التعليمية. كيف يمكنني مساعدتك اليوم؟',
      timestamp: new Date(),
      suggestions: [
        'ما هي كورسات المراجعة الداخلية المتاحة؟',
        'كيف أبدأ في تعلم المراجعة الداخلية؟',
        'ما هي متطلبات زمالة المراجعين الداخليين؟',
        'كيف أحمي ملفاتي من النسخ؟'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // قاعدة بيانات المعرفة
  const knowledgeBase = {
    general: {
      greetings: ['مرحبا', 'السلام عليكم', 'اهلا', 'مرحباً'],
      questions: [
        {
          patterns: ['ما هي منصة خطى', 'ما هي خطى', 'تعريف خطى'],
          answer: 'منصة خطى هي منصة تعليمية متخصصة في المراجعة الداخلية والتطوير المهني، تقدم كورسات متدرجة وبرامج زمالة معتمدة مع حماية متقدمة للمحتوى.',
          suggestions: ['ما هي الكورسات المتاحة؟', 'كيف أسجل في الكورسات؟']
        },
        {
          patterns: ['كيف أسجل', 'كيفية التسجيل', 'طريقة الاشتراك'],
          answer: 'يمكنك التسجيل في المنصة من خلال الضغط على زر "سجل الآن" في الصفحة الرئيسية، ثم اتباع الخطوات البسيطة لإنشاء حسابك.',
          suggestions: ['ما هي الكورسات المتاحة؟', 'ما هي طرق الدفع؟']
        }
      ]
    },
    course: {
      questions: [
        {
          patterns: ['كورسات المراجعة الداخلية', 'الكورسات المتاحة', 'ما هي الكورسات'],
          answer: 'لدينا ثلاثة مستويات من كورسات المراجعة الداخلية:\n\n🎯 المستوى الأساسي: المفاهيم والأدوات الأساسية\n📈 المستوى المتوسط: القيادة وإدارة الفرق\n🏆 المستوى المتقدم: التكنولوجيا والمعايير الدولية',
          suggestions: ['كيف أبدأ في المستوى الأساسي؟', 'ما هي المتطلبات؟']
        },
        {
          patterns: ['مدة الكورس', 'كم يستغرق', 'الوقت المطلوب'],
          answer: 'تختلف مدة الكورسات حسب المستوى:\n\n⏰ المستوى الأساسي: 20 ساعة\n⏰ المستوى المتوسط: 30 ساعة\n⏰ المستوى المتقدم: 45 ساعة\n\nجميع الكورسات متاحة للوصول مدى الحياة.',
          suggestions: ['ما هي طريقة الدراسة؟', 'هل هناك اختبارات؟']
        }
      ]
    },
    audit: {
      questions: [
        {
          patterns: ['ما هي المراجعة الداخلية', 'تعريف المراجعة الداخلية', 'ما هي المراجعة'],
          answer: 'المراجعة الداخلية هي نشاط مستقل وموضوعي يهدف إلى إضافة قيمة وتحسين عمليات المنظمة من خلال تقييم وتحسين فعالية إدارة المخاطر والرقابة والحوكمة.',
          suggestions: ['ما هي أهداف المراجع الداخلي؟', 'ما هي المعايير الدولية؟']
        },
        {
          patterns: ['المعايير الدولية', 'IIA', 'المعايير'],
          answer: 'تتبع منصة خطى المعايير الدولية للمراجعة الداخلية (IIA Standards) والتي تشمل:\n\n✅ معايير الأخلاقيات والكفاءة\n✅ معايير الأداء والجودة\n✅ معايير التنفيذ والتقييم',
          suggestions: ['كيف أحصل على الزمالة؟', 'ما هي الشهادات المعتمدة؟']
        }
      ]
    },
    technical: {
      questions: [
        {
          patterns: ['حماية الملفات', 'أمان المحتوى', 'حقوق الطبع'],
          answer: 'توفر منصة خطى أعلى مستويات الحماية:\n\n🔒 حماية من النسخ والتنزيل غير المصرح\n🛡️ تعطيل لقطات الشاشة\n📱 ربط الهاتف بالموقع\n⚡ تشفير متقدم للمحتوى',
          suggestions: ['كيف أربط هاتفي؟', 'ما هي ميزات الحماية؟']
        },
        {
          patterns: ['ربط الهاتف', 'الهاتف بالموقع', 'التحقق من الهاتف'],
          answer: 'لربط هاتفك بالموقع:\n\n1️⃣ اضغط على زر "ربط الهاتف"\n2️⃣ أدخل رقم هاتفك الصحيح\n3️⃣ أدخل رمز التحقق المرسل\n4️⃣ استمتع بميزات الحماية المتقدمة',
          suggestions: ['ما هي فوائد ربط الهاتف؟', 'كيف ألغي الربط؟']
        }
      ]
    }
  };

  // البحث في قاعدة البيانات
  const findAnswer = (message: string): { answer: string; suggestions?: string[] } => {
    const lowerMessage = message.toLowerCase();

    // البحث في جميع فئات المعرفة
    for (const category of Object.values(knowledgeBase)) {
      for (const qa of category.questions || []) {
        if (qa.patterns.some(pattern => lowerMessage.includes(pattern))) {
          return { answer: qa.answer, suggestions: qa.suggestions };
        }
      }
    }

    // إجابات افتراضية بناءً على السياق
    if (context === 'course') {
      return {
        answer: 'للحصول على معلومات مفصلة عن الكورسات، يمكنك زيارة صفحة كورسات المراجعة الداخلية أو زمالة المراجعين الداخليين.',
        suggestions: ['ما هي الكورسات المتاحة؟', 'كيف أبدأ في التعلم؟']
      };
    }

    if (context === 'audit') {
      return {
        answer: 'لدي معرفة شاملة في مجال المراجعة الداخلية. يمكنني مساعدتك في فهم المفاهيم الأساسية والمتقدمة.',
        suggestions: ['ما هي المراجعة الداخلية؟', 'ما هي المعايير الدولية؟']
      };
    }

    return {
      answer: 'أنا هنا لمساعدتك في جميع استفساراتك المتعلقة بمنصة خطى التعليمية. يمكنني مساعدتك في الكورسات، المراجعة الداخلية، والدعم الفني.',
      suggestions: ['ما هي الكورسات المتاحة؟', 'كيف أحمي ملفاتي؟']
    };
  };

  // إرسال رسالة
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // محاكاة وقت التفكير
    setTimeout(() => {
      const { answer, suggestions } = findAnswer(inputMessage);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: answer,
        timestamp: new Date(),
        suggestions
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);

      if (soundEnabled) {
        // يمكن إضافة صوت هنا
      }
    }, 1000 + Math.random() * 1500);
  };

  // إرسال اقتراح
  const sendSuggestion = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  // نسخ رسالة
  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('تم نسخ النص');
  };

  // تقييم الرد
  const rateResponse = (messageId: string, isPositive: boolean) => {
    toast.success(isPositive ? 'شكراً لتقييمك الإيجابي!' : 'شكراً لملاحظتك، سنعمل على التحسين');
  };

  // التركيز على نهاية المحادثة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) {
    return (
      <motion.button
        onClick={onToggle}
        className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    );
  }

  return (
    <motion.div
      className={`fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 ${className}`}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{
        opacity: isMinimized ? 0.9 : 1,
        scale: 1,
        y: 0,
        width: isMinimized ? 'auto' : '380px',
        height: isMinimized ? 'auto' : '600px'
      }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
    >
      {/* رأس المساعد */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">مساعد خطى الذكي</h3>
            <p className="text-xs text-gray-600">
              متاح للمساعدة • {context === 'general' ? 'عام' : context === 'course' ? 'كورسات' : context === 'audit' ? 'مراجعة داخلية' : 'تقني'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-lg transition-colors ${soundEnabled ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:bg-gray-100'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </motion.button>

          <motion.button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </motion.button>

          <motion.button
            onClick={onToggle}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* المحادثة */}
      {!isMinimized && (
        <>
          <div className="flex-1 p-4 space-y-4 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-xs ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  }`}>
                    {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className={`flex-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block p-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-800 rounded-bl-md'
                    }`}>
                      <p className="text-sm leading-relaxed" dir="rtl">
                        {message.content}
                      </p>

                      {message.isTyping && (
                        <div className="flex items-center gap-1 mt-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-100"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-200"></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* اقتراحات الرد السريع */}
                    {message.suggestions && message.type === 'assistant' && (
                      <div className="mt-3 space-y-2">
                        {message.suggestions.map((suggestion, index) => (
                          <motion.button
                            key={index}
                            onClick={() => sendSuggestion(suggestion)}
                            className="block w-full text-right text-xs bg-blue-50 text-blue-700 p-2 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {suggestion}
                          </motion.button>
                        ))}
                      </div>
                    )}

                    {/* أدوات الرسالة */}
                    <div className={`flex items-center gap-2 mt-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <motion.button
                        onClick={() => copyMessage(message.content)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Copy className="w-3 h-3" />
                      </motion.button>

                      {message.type === 'assistant' && (
                        <>
                          <motion.button
                            onClick={() => rateResponse(message.id, true)}
                            className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                            whileHover={{ scale: 1.1 }}
                          >
                            <ThumbsUp className="w-3 h-3" />
                          </motion.button>

                          <motion.button
                            onClick={() => rateResponse(message.id, false)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            whileHover={{ scale: 1.1 }}
                          >
                            <ThumbsDown className="w-3 h-3" />
                          </motion.button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* مؤشر الكتابة */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex gap-3 max-w-xs">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-md">
                    <div className="flex items-center gap-1">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* مربع الإدخال */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="اكتب رسالتك هنا..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                dir="rtl"
              />
              <motion.button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className={`p-2 rounded-lg transition-colors ${
                  inputMessage.trim() && !isTyping
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                whileHover={inputMessage.trim() && !isTyping ? { scale: 1.05 } : undefined}
                whileTap={inputMessage.trim() && !isTyping ? { scale: 0.95 } : undefined}
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>

            {/* اقتراحات سريعة */}
            <div className="mt-3 flex flex-wrap gap-2">
              {['ما هي الكورسات؟', 'كيف أبدأ؟', 'مساعدة تقنية'].map((suggestion, index) => (
                <motion.button
                  key={index}
                  onClick={() => sendSuggestion(suggestion)}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  disabled={isTyping}
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default SmartAssistant;
