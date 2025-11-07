'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  DollarSign,
  Calculator,
  PieChart,
  Target,
  Users,
  Award,
  BookOpen,
  FileText,
  Video,
  Download,
  Clock,
  CheckCircle,
  Star,
  Building,
  Wallet,
  BarChart3,
  Settings,
  Shield,
  Zap,
  Globe,
} from 'lucide-react';
import Link from 'next/link';
import ContentProtection from '@/components/security/ContentProtection';
import { buttonVariants } from '@/lib/variants';
import { cn } from '@/lib/utils';

const FinancialManagementPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // بيانات برامج الإدارة المالية والتشغيل
  const financialPrograms = {
    overview: {
      title: 'برامج الإدارة المالية والتشغيل',
      subtitle: 'تطوير شامل للمهارات المالية والتشغيلية في عالم الأعمال الحديث',
      description: 'مجموعة متكاملة من البرامج التدريبية المصممة لتزويدك بالمعرفة والمهارات العملية في الإدارة المالية وإدارة العمليات، مع التركيز على التطبيقات العملية والحالات الواقعية.',
      benefits: [
        'فهم شامل للمفاهيم المالية الأساسية والمتقدمة',
        'تطوير مهارات التحليل المالي والتنبؤ',
        'إدارة فعالة للتدفقات النقدية والميزانيات',
        'تحسين العمليات التشغيلية وزيادة الكفاءة',
        'تطبيق أدوات الإدارة المالية الحديثة',
        'تطوير استراتيجيات الاستثمار والتمويل'
      ],
      stats: [
        { number: '15+', label: 'برنامج متخصص', icon: BookOpen },
        { number: '500+', label: 'متدرب نشط', icon: Users },
        { number: '95%', label: 'معدل الرضا', icon: Star },
        { number: '50+', label: 'ساعة تدريبية', icon: Clock }
      ]
    },
    programs: [
      {
        id: 1,
        title: 'الإدارة المالية الاستراتيجية',
        category: 'الإدارة المالية',
        duration: '8 أسابيع',
        level: 'متقدم',
        students: 180,
        rating: 4.9,
        price: 899,
        image: '/banar-cours.png',
        description: 'برنامج شامل في الإدارة المالية الاستراتيجية يغطي تخطيط وإدارة الموارد المالية لتحقيق أهداف المنظمة.',
        modules: [
          'تخطيط الموارد المالية الاستراتيجي',
          'إدارة رأس المال والاستثمار',
          'تقييم المشاريع والاستثمارات',
          'إدارة المخاطر المالية',
          'التحليل المالي المتقدم'
        ],
        outcomes: [
          'قدرة على وضع الخطط المالية الاستراتيجية',
          'مهارات تقييم الاستثمارات والمشاريع',
          'فهم إدارة المخاطر المالية',
          'قدرة على التحليل المالي المتقدم'
        ]
      },
      {
        id: 2,
        title: 'إدارة العمليات والكفاءة التشغيلية',
        category: 'إدارة العمليات',
        duration: '6 أسابيع',
        level: 'متوسط',
        students: 145,
        rating: 4.8,
        price: 699,
        image: '/banar-cours.png',
        description: 'برنامج متخصص في تحسين العمليات التشغيلية وزيادة الكفاءة والإنتاجية في المنظمات.',
        modules: [
          'أساسيات إدارة العمليات',
          'تحسين الإجراءات والعمليات',
          'إدارة سلسلة التوريد',
          'قياس وتحسين الأداء',
          'تطبيقات التحول الرقمي'
        ],
        outcomes: [
          'قدرة على تحليل وتحسين العمليات',
          'مهارات إدارة سلسلة التوريد',
          'فهم أدوات قياس الأداء',
          'قدرة على تطبيق التحول الرقمي'
        ]
      },
      {
        id: 3,
        title: 'التحليل المالي وإعداد التقارير',
        category: 'التحليل المالي',
        duration: '7 أسابيع',
        level: 'متوسط',
        students: 220,
        rating: 4.9,
        price: 749,
        image: '/banar-cours.png',
        description: 'برنامج عملي في التحليل المالي وإعداد التقارير المالية المتقدمة لدعم اتخاذ القرارات.',
        modules: [
          'أساسيات التحليل المالي',
          'تحليل القوائم المالية',
          'إعداد التقارير المالية',
          'استخدام برامج التحليل المالي',
          'تطبيقات عملية في التحليل'
        ],
        outcomes: [
          'مهارات التحليل المالي المتقدمة',
          'قدرة على إعداد التقارير المالية',
          'استخدام أدوات التحليل الحديثة',
          'فهم مؤشرات الأداء المالي'
        ]
      },
      {
        id: 4,
        title: 'إدارة التكاليف وتحسين الربحية',
        category: 'إدارة التكاليف',
        duration: '5 أسابيع',
        level: 'متوسط',
        students: 165,
        rating: 4.7,
        price: 599,
        image: '/banar-cours.png',
        description: 'برنامج متخصص في إدارة التكاليف وتحسين الربحية من خلال تحليل التكاليف وتحسين الكفاءة.',
        modules: [
          'أساسيات إدارة التكاليف',
          'تحليل التكاليف والفوائد',
          'تحسين الربحية والكفاءة',
          'إدارة التكاليف بالأنشطة',
          'تطبيقات عملية في خفض التكاليف'
        ],
        outcomes: [
          'مهارات تحليل وإدارة التكاليف',
          'قدرة على تحسين الربحية',
          'فهم أنظمة إدارة التكاليف الحديثة',
          'تطبيق استراتيجيات خفض التكاليف'
        ]
      },
      {
        id: 5,
        title: 'التخطيط المالي والميزانيات',
        category: 'التخطيط المالي',
        duration: '6 أسابيع',
        level: 'مبتدئ',
        students: 280,
        rating: 4.8,
        price: 549,
        image: '/banar-cours.png',
        description: 'برنامج أساسي في التخطيط المالي وإعداد الميزانيات للمؤسسات والأفراد.',
        modules: [
          'أساسيات التخطيط المالي',
          'إعداد وإدارة الميزانيات',
          'التنبؤ المالي والتخطيط',
          'إدارة التدفق النقدي',
          'تقييم الأداء المالي'
        ],
        outcomes: [
          'مهارات التخطيط المالي الأساسية',
          'قدرة على إعداد وإدارة الميزانيات',
          'فهم التدفق النقدي وإدارته',
          'مهارات التنبؤ والتخطيط المالي'
        ]
      },
      {
        id: 6,
        title: 'التمويل والاستثمار',
        category: 'التمويل والاستثمار',
        duration: '8 أسابيع',
        level: 'متقدم',
        students: 135,
        rating: 4.9,
        price: 949,
        image: '/banar-cours.png',
        description: 'برنامج متقدم في التمويل والاستثمار يغطي استراتيجيات التمويل وإدارة المحافظ الاستثمارية.',
        modules: [
          'أساسيات التمويل والاستثمار',
          'تحليل الأوراق المالية',
          'إدارة المحافظ الاستثمارية',
          'استراتيجيات التمويل',
          'تقييم الأصول والاستثمارات'
        ],
        outcomes: [
          'فهم أسواق المال والاستثمار',
          'مهارات إدارة المحافظ الاستثمارية',
          'قدرة على تقييم الاستثمارات',
          'تطوير استراتيجيات التمويل'
        ]
      }
    ],
    features: [
      {
        icon: TrendingUp,
        title: 'محتوى عملي متطور',
        description: 'محتوى تعليمي عملي مبني على الحالات الواقعية والتطبيقات العملية الحديثة'
      },
      {
        icon: Users,
        title: 'خبراء متخصصون',
        description: 'تدريب من قبل خبراء معتمدين في الإدارة المالية والتشغيلية'
      },
      {
        icon: Award,
        title: 'شهادات معتمدة',
        description: 'شهادات إتمام معتمدة معترف بها في سوق العمل السعودي والخليجي'
      },
      {
        icon: Zap,
        title: 'تكنولوجيا متقدمة',
        description: 'استخدام أحدث أدوات وبرامج التحليل المالي والنمذجة'
      },
      {
        icon: Globe,
        title: 'معايير دولية',
        description: 'تطبيق أفضل الممارسات والمعايير الدولية في الإدارة المالية'
      },
      {
        icon: Target,
        title: 'أهداف واضحة',
        description: 'برامج مصممة لتحقيق أهداف مهنية محددة وقابلة للقياس'
      }
    ]
  };

  return (
    <ContentProtection>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
        <div className="container mx-auto max-w-7xl px-8">
          {/* رأس الصفحة */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {financialPrograms.overview.title}
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {financialPrograms.overview.subtitle}
            </p>
          </motion.div>

          {/* الإحصائيات */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-12 border border-gray-100"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {financialPrograms.overview.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* الوصف العام */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-12 border border-gray-100"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">نبذة عن البرامج</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {financialPrograms.overview.description}
                </p>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-600" />
                  الفوائد الرئيسية
                </h3>
                <ul className="space-y-3">
                  {financialPrograms.overview.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">المميزات الرئيسية</h3>
                <div className="grid gap-4">
                  {financialPrograms.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <feature.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* البرامج التدريبية */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              البرامج التدريبية المتاحة
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {financialPrograms.programs.map((program, index) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        program.level === 'مبتدئ' ? 'bg-green-100 text-green-800' :
                        program.level === 'متوسط' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {program.level}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4">
                      <span className="text-sm text-blue-600 font-semibold">{program.category}</span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{program.description}</p>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {program.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {program.students} طالب
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          {program.rating}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">المواضيع الرئيسية:</h4>
                      <ul className="space-y-1">
                        {program.modules.slice(0, 3).map((module, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                            {module}
                          </li>
                        ))}
                        {program.modules.length > 3 && (
                          <li className="text-sm text-gray-500">
                            +{program.modules.length - 3} مواضيع أخرى
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">مخرجات التعلم:</h4>
                      <ul className="space-y-1">
                        {program.outcomes.slice(0, 2).map((outcome, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-gray-900">
                        {program.price} ريال
                      </div>
                      <motion.button
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 border border-blue-400/50 dark:border-blue-300/50 hover:border-blue-300 dark:hover:border-blue-200 ring-1 ring-blue-500/20 hover:ring-blue-400/40"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        سجل الآن
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* دعوة للعمل */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ابدأ رحلتك في الإدارة المالية والتشغيل
              </h2>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                انضم إلى برامجنا المتخصصة واحصل على المهارات اللازمة لبناء مسيرة مهنية ناجحة في مجال الإدارة المالية والتشغيل
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" aria-label="احصل على استشارة مجانية في الإدارة المالية" role="link">
                  <motion.button
                    className={cn(
                      buttonVariants({ variant: "gradient", size: "xl", interactive: true }),
                      "font-bold flex items-center gap-2"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="احصل على استشارة مجانية"
                    role="button"
                  >
                    <BookOpen className="w-6 h-6" aria-hidden="true" />
                    استشارة مجانية
                  </motion.button>
                </Link>
                <Link href="/courses" aria-label="تصفح جميع برامج الإدارة المالية والتشغيل" role="link">
                  <motion.button
                    className={cn(
                      buttonVariants({ variant: "outline", size: "xl", interactive: true }),
                      "font-bold"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="تصفح جميع البرامج"
                    role="button"
                  >
                    تصفح جميع البرامج
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ContentProtection>
  );
};

export default FinancialManagementPage;
