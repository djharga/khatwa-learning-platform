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
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
} from 'lucide-react';
import ContentProtection from '@/components/security/ContentProtection';
import QuestionBank from '@/components/fellowship/QuestionBank';
import ProtectedFileViewer from '@/components/fellowship/ProtectedFileViewer';
import ProtectedVideoPlayer from '@/components/fellowship/ProtectedVideoPlayer';
import PageBackground from '@/components/ui/PageBackground';


const AuditorsFellowshipPage = () => {
  const [activePart, setActivePart] = useState<1 | 2 | 3>(1);
  const [showQuestionBank, setShowQuestionBank] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [expandedAxis, setExpandedAxis] = useState<string | null>(null);

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
          isProtected: false,
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
          isProtected: false,
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
      <PageBackground variant="cia">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* رأس الصفحة */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                المراجعين الداخليين
              </span>
            </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            برنامج تطوير مهني متكامل يشمل ثلاثة أجزاء متخصصة في المراجعة الداخلية
          </p>

          {/* المحتوى التعريفي الإلزامي */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 mb-8 text-right max-w-5xl mx-auto">
            <div className="space-y-6 text-gray-800 leading-relaxed">

              {/* المقطع الافتتاحي - كسر الحواجز */}
              <div className="border-r-4 border-blue-500 pr-6">
                <p className="text-lg font-semibold text-blue-700 mb-2">كسر الحواجز التقليدية</p>
                <p className="text-base">
                  مهنة المراجعة الداخلية لم تعد حكراً على متخصصين محددين – إنها فرصة حقيقية لأي شخص يسعى لتطوير مساره المهني، حتى لو كنت تفكر في تغيير تخصصك الحالي او تطوير تخصصك واكتساب مهارات مطلوبة لسوق العمل.
                </p>
              </div>

              {/* المقطع الثاني - التعريف الاستراتيجي */}
              <div className="border-r-4 border-green-500 pr-6">
                <p className="text-lg font-semibold text-green-700 mb-2">عين الإدارة اليقظة</p>
                <p className="text-base">
                  المراجعة الداخلية اليوم هي عين الإدارة اليقظة، التي ترى ما وراء الأرقام والبيانات، وتكشف المخاطر قبل أن تتحول إلى أزمات، وتحوّلها إلى فرص للتحسين والابتكار. إنها الشريك الصامت الذي يحمي مسيرة المؤسسة، ويقودها نحو التميز.
                </p>
              </div>

              {/* المقطع الثالث - شرح الشراكة */}
              <div className="border-r-4 border-purple-500 pr-6">
                <p className="text-lg font-semibold text-purple-700 mb-2">الشراكة التكاملية</p>
                <p className="text-base mb-3">
                  المراجعة الداخلية والمراجع الداخلي… شراكة تصنع التفوق المؤسسي. معًا يشكلان قوة استراتيجية تدعم استقرار مؤسستك وتدفعها نحو الريادة. فالمراجعة الداخلية تمنحك الحماية والشفافية، بينما يحوّل المراجع الداخلي المحترف هذه الحماية إلى قيمة مستدامة تضمن التميز وتبقي مؤسستك دائمًا في موقع المبادرة، مستبقة للمخاطر، وسبّاقة لاغتنام الفرص.
                </p>
                <p className="text-sm font-medium text-purple-600 bg-purple-50 p-3 rounded-lg">
                  إن الاستثمار في بناء منظومة مراجعة داخلية قوية، وتطوير كفاءات المراجع الداخلي، ليس رفاهية أو خيارًا تكميليًا… بل قرار استراتيجي يحمي أعمالك اليوم ويصنع نجاحك المستقبلي.
                </p>
              </div>

              {/* المقطع الرابع - تعريف المراجع الحديث */}
              <div className="border-r-4 border-orange-500 pr-6">
                <p className="text-lg font-semibold text-orange-700 mb-3">المراجع الداخلي: قيمة مضافة لا تُقدّر بثمن</p>
                <p className="text-base mb-4">
                  المراجع الداخلي هو قيمة مضافة لا تُقدّر بثمن، وشريك استراتيجي للإدارة في رسم ملامح المستقبل. ليس مجرد مدقق يركز على الأخطاء، بل رائد يساهم بفعالية في:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>الكشف المبكر وتحليل المخاطر قبل أن تتحول إلى أزمات.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>تقييم كفاءة وفعالية الضوابط الداخلية لضمان حماية المؤسسة.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>تقديم توصيات عملية ومبتكرة تعزز الأداء وتحقق التحسين المستمر.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>دعم الإدارة في تحقيق أهدافها الاستراتيجية بكفاءة وثقة.</span>
                  </li>
                </ul>
              </div>

              {/* المقطع الخامس - عامل الاستعجال */}
              <div className="border-r-4 border-red-500 pr-6">
                <p className="text-lg font-semibold text-red-700 mb-2">التأمين المستدام لمستقبل أعمالك</p>
                <p className="text-base">
                  الاستثمار في تطوير قدرات المراجعة الداخلية يعني أكثر من حماية الأصول… إنه تأمين مستدام لمستقبل أعمالك. فالمراجع الداخلي المحترف يحول كل تقرير إلى خطة إنقاذ وتحسين فعّالة، تجعلك دائمًا على أتم الاستعداد لمواجهة التحديات. المستقبل لا ينتظر أحدًا، ومن يتأخر في بناء منظومة مراجعة قوية سيواجه تكاليف مضاعفة.
                </p>
              </div>

              {/* المقطع الختامي - CTA */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl text-center">
                <p className="text-xl font-bold mb-2">احترف مهنة المراجعة الداخلية بالتدريب العملى</p>
                <p className="text-base opacity-90">ابدأ رحلتك نحو التميز المهني اليوم</p>
              </div>

            </div>
          </div>
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

              {/* شجرة الملفات */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Folder className="w-6 h-6 text-blue-600" />
                  شجرة الملفات والمحتوى
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="space-y-2">
                    {[
                      {
                        id: 'axis1',
                        title: 'المحور الأول: مفهوم المراجعة الداخلية',
                        description: 'تعريف شامل للمراجعة الداخلية وأهميتها في المنظمات',
                        files: ['دليل المراجعة الداخلية الأساسي.pdf', 'مقدمة في المراجعة الداخلية.mp4']
                      },
                      {
                        id: 'axis2',
                        title: 'المحور الثاني: إطار عمل المراجعة',
                        description: 'المعايير والإطارات المرجعية للمراجعة الداخلية',
                        files: ['نماذج التقارير الأساسية.docx', 'أساسيات إدارة المخاطر.mp4']
                      },
                      {
                        id: 'axis3',
                        title: 'المحور الثالث: عمليات المراجعة',
                        description: 'خطوات وطرق إجراء المراجعة الداخلية',
                        files: ['حوار مع خبير المراجعة الداخلية.mp3']
                      }
                    ].map((axis) => (
                      <div key={axis.id} className="border border-gray-200 rounded-lg">
                        <button
                          onClick={() => setExpandedAxis(expandedAxis === axis.id ? null : axis.id)}
                          className="w-full flex items-center justify-between p-4 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {expandedAxis === axis.id ? (
                              <ChevronDown className="w-5 h-5 text-blue-600" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-blue-600" />
                            )}
                            <span className="font-semibold text-gray-900">{axis.title}</span>
                          </div>
                          <span className="text-sm text-gray-600">{axis.files.length} ملف</span>
                        </button>

                        {expandedAxis === axis.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-gray-200 bg-white"
                          >
                            <div className="p-4">
                              <p className="text-gray-600 mb-4">{axis.description}</p>
                              <div className="space-y-2">
                                {axis.files.map((file, index) => (
                                  <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                                    <FileText className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm text-gray-700">{file}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
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
                      onClick={() => window.open('/question-bank?tab=free', '_blank')}
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
                        onClick={() => window.open('/question-bank?tab=premium', '_blank')}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        اشترك في الباقة المميزة - $49
                      </motion.button>
                      <motion.button
                        onClick={() => window.open('/question-bank?tab=premium', '_blank')}
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


          {/* رابط موقع IIA الرسمي */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center">
              <div className="inline-flex items-center gap-3 bg-white/20 px-6 py-3 rounded-full mb-6">
                <Shield className="w-6 h-6 text-white" />
                <span className="text-white font-bold">معهد المدققين الداخليين</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                تعرف على معهد المدققين الداخليين (IIA)
              </h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
                المرجع العالمي الرئيسي لمهنة المراجعة الداخلية - تعرف على المعايير الدولية والشهادات المعتمدة
              </p>
              <motion.a
                href="https://www.theiia.org/en/internal-audit-foundation/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-5 h-5" />
                زيارة موقع IIA الرسمي
                <ExternalLink className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* نظام الساعات المعتمدة (CPE Certificate System) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-200">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 bg-blue-100 px-6 py-3 rounded-full mb-6">
                  <Award className="w-6 h-6 text-blue-600" />
                  <span className="text-blue-700 font-bold">نظام الساعات المعتمدة</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  احصل على شهادة الساعات المعتمدة (CPE)
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                  اختبر مهاراتك واحصل على شهادة الساعات المعتمدة معتمدة من IIA مع رسوم رمزية
                </p>

                {/* معلومات الشهادة */}
                <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-gray-100">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Award className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">شهادة معتمدة</h3>
                      <p className="text-sm text-gray-600">معتمدة من IIA وجهات دولية</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Target className="w-6 h-6 text-green-600" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">اختبار شامل</h3>
                      <p className="text-sm text-gray-600">15 سؤال في الدورة المختارة</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="w-6 h-6 text-purple-600" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">تطوير مهني</h3>
                      <p className="text-sm text-gray-600">تعزيز فرصك المهنية</p>
                    </div>
                  </div>
                </div>

                {/* نموذج طلب الشهادة */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">اطلب شهادتك الآن</h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        اسم الدورة التدريبية
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="">اختر الدورة التي أكملتها</option>
                        <option value="basics">أساسيات المراجعة الداخلية</option>
                        <option value="advanced">المراجعة المتقدمة</option>
                        <option value="international">المعايير الدولية</option>
                        <option value="finance-basics">أساسيات المالية والمحاسبة</option>
                        <option value="procurement">إدارة المشتريات والتوريدات</option>
                        <option value="warehouse">إدارة المخازن والمستودعات</option>
                        <option value="financial-analysis">التقارير المالية والمحاسبية</option>
                        <option value="inventory-reconciliations">التسويات الجردية والرقابة</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الفترة الزمنية للدورة
                      </label>
                      <input
                        type="text"
                        placeholder="مثال: من 1/1/2024 إلى 31/1/2024"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-700">رسوم إصدار الشهادة</span>
                        <span className="text-lg font-bold text-blue-700">5 دولار</span>
                      </div>
                      <p className="text-xs text-blue-600">
                        الدفع بعد اجتياز الاختبار بنجاح
                      </p>
                    </div>

                    <motion.button
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        // TODO: Implement CPE Certificate System flow
                        alert('جارى التنفيذ - سيتم تفعيل نظام الساعات المعتمدة قريباً');
                      }}
                    >
                      الساعات المعتمدة
                      <span className="text-sm mr-2">(15 سؤال - 30 دقيقة)</span>
                    </motion.button>
                  </div>

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    * سيتم إنشاء أسئلة الاختبار تلقائياً بناءً على الدورة المختارة باستخدام الذكاء الاصطناعي
                  </p>
                </div>
              </div>
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


      </PageBackground>
    </ContentProtection>
  );
};

export default AuditorsFellowshipPage;
