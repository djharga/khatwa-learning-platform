'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Download,
  Play,
  Headphones,
  FileText,
  CheckCircle,
  BookOpen,
  Shield,
  Users,
  Award,
  Target,
  TrendingUp,
  Smartphone,
  Eye,
  Lock,
  AlertTriangle,
} from 'lucide-react';
import ContentProtection from '@/components/security/ContentProtection';
import QuestionBank from '@/components/fellowship/QuestionBank';
import ProtectedFileViewer from '@/components/fellowship/ProtectedFileViewer';
import ProtectedVideoPlayer from '@/components/fellowship/ProtectedVideoPlayer';


const AuditorsFellowshipPage = () => {
  const [activePart, setActivePart] = useState<1 | 2 | 3>(1);
  const [showQuestionBank, setShowQuestionBank] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  // بيانات الأجزاء الثلاثة للزمالة
  const fellowshipParts = [
    {
      id: 1,
      title: 'الجزء الأول: الأساسيات',
      description: 'مقدمة شاملة في أساسيات المراجعة الداخلية والمفاهيم الأولية',
      files: [
        {
          id: '1',
          name: 'دليل المراجعة الداخلية الأساسي.pdf',
          type: 'pdf' as const,
          size: '2.5 MB',
          description: 'دليل شامل لأساسيات المراجعة الداخلية',
          isProtected: true,
          downloadAllowed: true,
          previewAvailable: true,
          url: '/files/internal-audit-basics.pdf'
        },
        {
          id: '2',
          name: 'نماذج التقارير الأساسية.docx',
          type: 'docx' as const,
          size: '1.8 MB',
          description: 'نماذج جاهزة لتقارير المراجعة البسيطة',
          isProtected: true,
          downloadAllowed: true,
          previewAvailable: true,
          url: '/files/report-templates.docx'
        }
      ],
      videos: [
        {
          id: '1',
          title: 'مقدمة في المراجعة الداخلية',
          description: 'شرح مفصل لمفهوم المراجعة الداخلية وأهميتها',
          duration: '45 دقيقة',
          src: '/videos/intro-internal-audit.mp4',
          isProtected: true,
          downloadAllowed: false
        },
        {
          id: '2',
          title: 'أساسيات إدارة المخاطر',
          description: 'فهم أساسيات تحديد وتقييم المخاطر',
          duration: '38 دقيقة',
          src: '/videos/risk-management-basics.mp4',
          isProtected: true,
          downloadAllowed: false
        }
      ],
      podcasts: [
        {
          id: '1',
          title: 'حوار مع خبير المراجعة الداخلية',
          description: 'حوار مفتوح مع أحد خبراء المراجعة الداخلية',
          duration: '62 دقيقة',
          src: '/podcasts/expert-interview.mp3',
          isProtected: false,
          downloadAllowed: true
        }
      ]
    },
    {
      id: 2,
      title: 'الجزء الثاني: المتقدم',
      description: 'الطرق والأدوات المتقدمة في المراجعة الداخلية',
      files: [
        {
          id: '3',
          name: 'أدوات المراجعة المتقدمة.pdf',
          type: 'pdf' as const,
          size: '3.2 MB',
          description: 'دليل الأدوات والتقنيات المتقدمة',
          isProtected: true,
          downloadAllowed: true,
          previewAvailable: true,
          url: '/files/advanced-tools.pdf'
        },
        {
          id: '4',
          name: 'دراسات حالة عملية.xlsx',
          type: 'xlsx' as const,
          size: '1.5 MB',
          description: 'دراسات حالة حقيقية لتطبيق عملي',
          isProtected: true,
          downloadAllowed: true,
          previewAvailable: true,
          url: '/files/case-studies.xlsx'
        }
      ],
      videos: [
        {
          id: '3',
          title: 'تحليل البيانات في المراجعة',
          description: 'استخدام التحليلات في عمليات المراجعة',
          duration: '52 دقيقة',
          src: '/videos/data-analysis-audit.mp4',
          isProtected: true,
          downloadAllowed: false
        }
      ],
      podcasts: [
        {
          id: '2',
          title: 'تجارب ناجحة في المراجعة الداخلية',
          description: 'قصص نجاح من الميدان العملي',
          duration: '45 دقيقة',
          src: '/podcasts/success-stories.mp3',
          isProtected: false,
          downloadAllowed: true
        }
      ]
    },
    {
      id: 3,
      title: 'الجزء الثالث: الدولي',
      description: 'المعايير الدولية وأفضل الممارسات العالمية',
      files: [
        {
          id: '5',
          name: 'المعايير الدولية للمراجعة.pdf',
          type: 'pdf' as const,
          size: '4.1 MB',
          description: 'المعايير الدولية المعتمدة للمراجعة الداخلية',
          isProtected: true,
          downloadAllowed: true,
          previewAvailable: true,
          url: '/files/international-standards.pdf'
        }
      ],
      videos: [
        {
          id: '4',
          title: 'تطبيق المعايير الدولية',
          description: 'كيفية تطبيق المعايير الدولية في الواقع العملي',
          duration: '48 دقيقة',
          src: '/videos/international-standards-application.mp4',
          isProtected: true,
          downloadAllowed: false
        }
      ],
      podcasts: [
        {
          id: '3',
          title: 'مستقبل المراجعة الداخلية',
          description: 'اتجاهات وتوقعات مستقبل المهنة',
          duration: '55 دقيقة',
          src: '/podcasts/future-of-audit.mp3',
          isProtected: false,
          downloadAllowed: true
        }
      ]
    }
  ];

  // بيانات بنك الأسئلة
  const sampleQuestions = [
    {
      id: '1',
      question: 'ما هو الدور الرئيسي للمراجع الداخلي في المنظمة؟',
      options: [
        'تحسين العمليات والرقابة الداخلية',
        'إعداد القوائم المالية',
        'التسويق للمنظمة',
        'إدارة الموارد البشرية'
      ],
      correctAnswer: 0,
      explanation: 'المراجع الداخلي يهدف إلى تحسين العمليات وتعزيز فعالية الرقابة الداخلية في المنظمة.',
      difficulty: 'سهل' as const,
      category: 'الأساسيات',
      points: 10
    },
    {
      id: '2',
      question: 'ما هي المعايير الدولية الرئيسية للمراجعة الداخلية؟',
      options: [
        'معايير الأخلاقيات والكفاءة',
        'معايير الجودة فقط',
        'معايير الكمية فقط',
        'معايير السرعة فقط'
      ],
      correctAnswer: 0,
      explanation: 'تشمل المعايير الدولية للمراجعة الداخلية معايير الأخلاقيات، الكفاءة، الأداء والجودة.',
      difficulty: 'متوسط' as const,
      category: 'المعايير الدولية',
      points: 15
    },
    {
      id: '3',
      question: 'ما هي أهمية تحليل المخاطر في المراجعة الداخلية؟',
      options: [
        'تحديد المجالات ذات الأولوية العالية',
        'تقليل التكاليف فقط',
        'زيادة عدد الموظفين',
        'تحسين الصورة الخارجية فقط'
      ],
      correctAnswer: 0,
      explanation: 'يساعد تحليل المخاطر في تحديد المجالات ذات الأولوية العالية ورصد التهديدات المحتملة.',
      difficulty: 'صعب' as const,
      category: 'إدارة المخاطر',
      points: 20
    }
  ];

  const currentPart = fellowshipParts.find(part => part.id === activePart);

  return (
    <ContentProtection>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* رأس الصفحة */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                زمالة المراجعين الداخليين
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              برنامج تطوير مهني متكامل يشمل ثلاثة أجزاء متخصصة في المراجعة الداخلية
            </p>
          </motion.div>

          {/* أزرار الأجزاء */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
              {[1, 2, 3].map((part) => (
                <motion.button
                  key={part}
                  onClick={() => setActivePart(part as 1 | 2 | 3)}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                    activePart === part
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  الجزء {part}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* محتوى الجزء النشط */}
          {currentPart && (
            <motion.div
              key={activePart}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {currentPart.title}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {currentPart.description}
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* الملفات */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-blue-600" />
                    الملفات والوثائق
                  </h3>
                  <div className="space-y-4">
                    {currentPart.files.map((file) => (
                      <motion.div
                        key={file.id}
                        className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedFile(file)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${file.isProtected ? 'bg-amber-100' : 'bg-blue-100'}`}>
                              <FileText className={`w-5 h-5 ${file.isProtected ? 'text-amber-600' : 'text-blue-600'}`} />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{file.name}</h4>
                              <p className="text-sm text-gray-600">{file.size}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {file.isProtected && <Lock className="w-4 h-4 text-amber-600" />}
                            <Eye className="w-5 h-5 text-gray-600" />
                          </div>
                        </div>
                        {file.description && (
                          <p className="text-sm text-gray-600 mt-2">{file.description}</p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* الفيديوهات */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Play className="w-6 h-6 text-purple-600" />
                    الفيديوهات التعليمية
                  </h3>
                  <div className="space-y-4">
                    {currentPart.videos.map((video) => (
                      <motion.div
                        key={video.id}
                        className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                              <Play className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{video.title}</h4>
                              <p className="text-sm text-gray-600">{video.duration}</p>
                            </div>
                          </div>
                          {video.isProtected && <Lock className="w-4 h-4 text-amber-600" />}
                        </div>
                        {video.description && (
                          <p className="text-sm text-gray-600 mt-2">{video.description}</p>
                        )}
                        <motion.button
                          className="mt-3 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 w-full"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Play className="w-4 h-4" />
                          مشاهدة الفيديو
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* البودكاست */}
              {currentPart.podcasts.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Headphones className="w-6 h-6 text-green-600" />
                    البودكاست والصوتيات
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {currentPart.podcasts.map((podcast) => (
                      <motion.div
                        key={podcast.id}
                        className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-3 bg-green-100 rounded-lg">
                            <Headphones className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{podcast.title}</h4>
                            <p className="text-sm text-gray-600">{podcast.duration}</p>
                          </div>
                        </div>
                        {podcast.description && (
                          <p className="text-sm text-gray-600 mb-4">{podcast.description}</p>
                        )}
                        <motion.button
                          className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Headphones className="w-4 h-4" />
                          استماع للبودكاست
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* بنك الأسئلة المتطور */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-200">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  بنك الأسئلة التفاعلي المتطور
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                  اختبر معرفتك وطور مهاراتك من خلال نظام أسئلة ذكي يغطي جميع جوانب المراجعة الداخلية
                </p>

                {/* تبويبات الأسئلة المجانية والمدفوعة */}
                <div className="flex justify-center mb-8">
                  <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
                    <motion.button
                      onClick={() => setShowQuestionBank(false)}
                      className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                        !showQuestionBank
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      الأسئلة المجانية 🎁
                    </motion.button>
                    <motion.button
                      onClick={() => setShowQuestionBank(true)}
                      className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                        showQuestionBank
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      الأسئلة المميزة ⭐
                    </motion.button>
                  </div>
                </div>
              </div>

              {!showQuestionBank ? (
                /* قسم الأسئلة المجانية */
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-center p-6 bg-green-50 rounded-2xl border border-green-200">
                    <h3 className="text-2xl font-bold text-green-800 mb-4">الأسئلة المجانية</h3>
                    <p className="text-green-700 mb-6">
                      اختبر معرفتك الأساسية مجاناً مع 50 سؤال متنوع في المراجعة الداخلية
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-600 mb-2">50</div>
                        <div className="text-sm text-gray-600">سؤال مجاني</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-600 mb-2">5</div>
                        <div className="text-sm text-gray-600">مستويات صعوبة</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-600 mb-2">∞</div>
                        <div className="text-sm text-gray-600">محاولات غير محدودة</div>
                      </div>
                    </div>
                    <motion.button
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ابدأ الاختبار المجاني
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                /* قسم الأسئلة المميزة */
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-200">
                    <h3 className="text-2xl font-bold text-purple-800 mb-4">الأسئلة المميزة</h3>
                    <p className="text-purple-700 mb-4">
                      اختبر معرفتك المتقدمة مع 200 سؤال متخصص في المراجعة الداخلية
                    </p>
                    <div className="bg-white rounded-lg p-4 mb-6">
                      <div className="flex items-center justify-center gap-2 text-purple-600 mb-2">
                        <span className="text-2xl">💎</span>
                        <span className="text-lg font-bold">باقة الأسئلة المتقدمة</span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        احصل على تقارير مفصلة وشهادة إتمام مع إمكانية التنافس مع الآخرين
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600 mb-2">200</div>
                        <div className="text-sm text-gray-600">سؤال متخصص</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600 mb-2">🏆</div>
                        <div className="text-sm text-gray-600">شهادة إتمام</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600 mb-2">📊</div>
                        <div className="text-sm text-gray-600">تقارير مفصلة</div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <motion.button
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        اشترك في الباقة المميزة - 49 ريال
                      </motion.button>
                      <motion.button
                        className="bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        جرب مجاناً لمدة 7 أيام
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>


        </div>

        {/* عارض الملفات */}
        {selectedFile && (
          <ProtectedFileViewer
            file={selectedFile}
            onClose={() => setSelectedFile(null)}
            className="mt-8"
          />
        )}


      </div>
    </ContentProtection>
  );
};

export default AuditorsFellowshipPage;
