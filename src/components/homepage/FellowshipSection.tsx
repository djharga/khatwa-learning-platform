import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Crown, 
  BookOpen, 
  FileText, 
  Target, 
  Video, 
  Headphones, 
  FileSpreadsheet, 
  ChevronRight, 
  Award, 
  GraduationCap,
  CheckCircle2,
  TrendingUp,
  Users,
  Shield,
  Clock,
  Users2,
  Zap,
  Globe
} from 'lucide-react';
import { Container } from '@/components/ui/primitives';
import StyledButton from '@/components/ui/StyledButton';

/**
 * Enhanced Fellowship Section - قسم الزمالة المحسّن
 * قسم تفاعلي احترافي مع شهادات، مؤشرات تقدم، وتصميم جذاب لبرنامج زمالة CIA
 */
const FellowshipSection = () => {
  const learningPath = [
    {
      icon: BookOpen,
      title: 'المستوى الأول',
      description: 'الأساسيات والمفاهيم الأولية',
      progress: 100,
      color: 'from-blue-500 to-cyan-500',
      duration: '8 أسابيع',
      lessons: 12
    },
    {
      icon: Target,
      title: 'المستوى الثاني',
      description: 'الممارسات المهنية المتقدمة',
      progress: 75,
      color: 'from-purple-500 to-pink-500',
      duration: '10 أسابيع',
      lessons: 15
    },
    {
      icon: Award,
      title: 'المستوى الثالث',
      description: 'المعرفة التجارية والتحليلية',
      progress: 50,
      color: 'from-emerald-500 to-teal-500',
      duration: '12 أسابيع',
      lessons: 18
    },
  ];

  const benefits = [
    {
      icon: GraduationCap,
      text: 'شهادة معتمدة دولياً من IIA',
      details: 'معترف بها في 190+ دولة'
    },
    {
      icon: TrendingUp,
      text: 'تطوير المهارات المهنية',
      details: 'مهارات مطلوبة في سوق العمل'
    },
    {
      icon: Users,
      text: 'فرص وظيفية أفضل',
      details: 'زيادة في الراتب بنسبة 30%'
    },
    {
      icon: CheckCircle2,
      text: 'بنك أسئلة شامل مع حلول تفصيلية',
      details: 'أكثر من 2000 سؤال مع تفاصيل'
    },
  ];

  const resources = [
    {
      icon: Video,
      text: 'فيديوهات تعليمية',
      count: '50+ ساعة',
      format: 'HD 1080p'
    },
    {
      icon: Headphones,
      text: 'بودكاست صوتي',
      count: '20+ حلقة',
      format: 'صوت عالي الجودة'
    },
    {
      icon: FileText,
      text: 'ملفات Word و PDF',
      count: '100+ ملف',
      format: 'قابلة للطباعة'
    },
    {
      icon: FileSpreadsheet,
      text: 'جداول Excel تفاعلية',
      count: '30+ نموذج',
      format: 'متوافقة مع Office 365'
    },
  ];



  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-white via-neutral-50 to-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <Container size="xl" className="relative z-10 overflow-visible">
        <div className="max-w-7xl mx-auto overflow-visible">
          {/* Enhanced Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center gap-4 mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl dark:from-blue-950/30 dark:to-indigo-950/30">
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-neutral-900 dark:text-white mb-3">
                  زمالة المدقق الداخلي المعتمد
                  <span className="block text-2xl lg:text-3xl text-indigo-600 dark:text-indigo-400 font-normal mt-2">
                    Certified Internal Auditor (CIA)
                  </span>
                </h2>
                <div className="flex items-center justify-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <Globe className="w-4 h-4" />
                  <span>معتمدة من معهد المراجعين الداخليين العالمي (IIA)</span>
                </div>
              </div>
            </div>
            <p className="text-xl lg:text-2xl text-neutral-600 dark:text-neutral-300 max-w-4xl mx-auto leading-relaxed">
              البرنامج الأكثر طلباً في مجال المراجعة الداخلية - شهادة معترف بها عالمياً تفتح أبواب الفرص المهنية
            </p>
          </motion.div>

          {/* What is CIA Enhanced */}
          <motion.div
            className="bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 dark:from-indigo-950/20 dark:via-blue-950/20 dark:to-purple-950/20 rounded-3xl p-8 lg:p-12 mb-16 border border-indigo-200/50 dark:border-indigo-800/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-right">
                <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center justify-center lg:justify-start gap-3">
                  <Shield className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                  ما هي شهادة CIA؟
                </h3>
                <div className="space-y-4 text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  <p>
                    شهادة المدقق الداخلي المعتمد (Certified Internal Auditor) هي الاعتماد المهني الأعلى في مجال المراجعة الداخلية على مستوى العالم. تُمنح من قبل معهد المراجعين الداخليين (IIA) وتُعتبر المعيار الذهبي للمهنيين في هذا المجال.
                  </p>
                  <p className="font-medium">
                    أكثر من 200,000 محترف حول العالم يحملون هذه الشهادة، مما يجعل حامليها مطلوبين بشدة في جميع أنحاء العالم.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-neutral-200/50 dark:border-neutral-700/50">
                    <div className="text-center p-3 bg-white/70 dark:bg-neutral-800/70 rounded-xl">
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">190+</div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">دولة معترف بها</div>
                    </div>
                    <div className="text-center p-3 bg-white/70 dark:bg-neutral-800/70 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">3</div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">مستويات احترافية</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white text-center">
                  <div className="text-6xl mb-4">🎯</div>
                  <h4 className="text-2xl font-bold mb-4">فرصة ذهبية لتطوير مسيرتك</h4>
                  <p className="text-indigo-100 mb-6">احصل على الاعتماد الدولي المطلوب في مجال المراجعة الداخلية</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4" />
                      <span>زيادة في الراتب بنسبة 25-40%</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>فرص قيادية أعلى</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span>اعتراف عالمي</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Learning Path */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
              مسار التعلم التفاعلي
            </h3>
            <div className="relative">
              {/* Progress Timeline */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-purple-500 h-full z-0"></div>
              <div className="relative z-10 grid md:grid-cols-3 gap-0">
                {learningPath.map((level, index) => {
                  const Icon = level.icon;
                  const isEven = index % 2 === 0;
                  return (
                    <motion.div
                      key={level.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                      className={`relative flex flex-col items-center p-6 ${
                        isEven ? 'md:order-2' : 'md:order-1'
                      }`}
                    >
                      <div className={`w-full max-w-sm bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-xl border border-neutral-200 dark:border-neutral-700 mb-6 overflow-visible ${
                        isEven ? 'md:-translate-y-12 md:shadow-2xl' : ''
                      }`}>
                        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${level.color} mb-6`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 text-center">
                          {level.title}
                        </h4>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-center leading-relaxed">
                          {level.description}
                        </p>
                        <div className="space-y-4 mb-6">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-neutral-600 dark:text-neutral-400">المدة:</span>
                            <span className="font-semibold text-neutral-900 dark:text-white">{level.duration}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-neutral-600 dark:text-neutral-400">الدروس:</span>
                            <span className="font-semibold text-neutral-900 dark:text-white">{level.lessons}</span>
                          </div>
                        </div>
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400 mb-2">
                            <span>التقدم</span>
                            <span>{level.progress}%</span>
                          </div>
                          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                            <motion.div 
                              className={`bg-gradient-to-r ${level.color} h-2 rounded-full`} 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${level.progress}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.5, delay: 0.6 + index * 0.2 }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <Clock className="w-4 h-4" />
                          <span>متوقع الإكمال: {level.duration}</span>
                        </div>
                      </div>
                      {/* Level Connector */}
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center bg-white dark:bg-neutral-800 border-4 border-neutral-200 dark:border-neutral-700 shadow-lg ${
                        index < learningPath.length - 1 ? 'mb-12 md:mb-0' : ''
                      }`}>
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${level.color}`}>
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Enhanced Benefits and Resources */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Benefits */}
            <motion.div
              className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-3xl p-8 lg:p-10 border border-indigo-200 dark:border-indigo-800 shadow-xl overflow-visible"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8 flex items-center justify-center gap-3">
                <TrendingUp className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                الفوائد المهنية للحصول على CIA
              </h3>
              <div className="space-y-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                      className="group flex items-center gap-4 p-4 bg-white/80 dark:bg-neutral-800/80 rounded-2xl border border-neutral-200/50 dark:border-neutral-700/50 hover:bg-white dark:hover:bg-neutral-800 transition-all duration-300 hover:shadow-md"
                    >
                      <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-neutral-900 dark:text-white mb-1">
                          {benefit.text}
                        </div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                          {benefit.details}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Resources */}
            <motion.div
              className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-3xl p-8 lg:p-10 border border-emerald-200 dark:border-emerald-800 shadow-xl overflow-visible"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8 flex items-center justify-center gap-3">
                <BookOpen className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                الموارد التعليمية المتاحة
              </h3>
              <div className="space-y-6">
                {resources.map((resource, index) => {
                  const Icon = resource.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                      className="group flex items-center gap-4 p-4 bg-white/80 dark:bg-neutral-800/80 rounded-2xl border border-neutral-200/50 dark:border-neutral-700/50 hover:bg-white dark:hover:bg-neutral-800 transition-all duration-300 hover:shadow-md"
                    >
                      <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-neutral-900 dark:text-white mb-1">
                          {resource.text}
                        </div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                          <span className="font-medium">{resource.count}</span> - {resource.format}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default FellowshipSection;
