'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, ChevronUp, Crown, GraduationCap, HelpCircle, Star, TrendingUp, User, Users, BookOpen, Brain, Shield, CheckCircle, CreditCard, Warehouse, FileText, Calculator, Award, Lock, EyeOff, FileX, HardDrive, Smartphone, Target, Heart, Zap, Globe, Calendar, Clock, MapPin, Play, Download, ArrowRight } from 'lucide-react';
import ChatAssistantWidget from '@/components/ChatAssistantWidget';
import ContactComponent from '@/components/ContactComponent';
import ProtectionToggle from '@/components/ProtectionToggle';

export default function BasicsCoursePage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);

      setShowScrollToTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* شريط تقدم الصفحة */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-slate-600 z-50"
        style={{ width: `${scrollProgress}%`, transition: 'width 0.2s' }}
      />

      <div className="relative z-10">
        {/* قسم الهيرو */}
        <section className="relative bg-gradient-to-br from-white via-slate-50/30 to-slate-100/50 py-24 lg:py-36 xl:py-48 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-green-100/30 to-blue-100/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <motion.div
                  className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-full shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-slate-700 font-medium text-sm">دورة متخصصة - مبتدئ</span>
                </motion.div>

                <motion.h1
                  className="text-4xl lg:text-6xl xl:text-7xl font-bold text-blue-600 leading-tight tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  أساسيات المراجعة الداخلية
                </motion.h1>

                <motion.p
                  className="text-xl lg:text-2xl text-slate-700 leading-relaxed font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  دورة شاملة تغطي المفاهيم الأساسية للمراجعة الداخلية مع تطبيقات عملية وحالات دراسية حقيقية من السوق السعودي
                </motion.p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-blue-700 font-medium">8 أسابيع</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-xl">
                    <Users className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 font-medium">2,450 طالب</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-xl">
                    <Star className="w-5 h-5 text-purple-600" />
                    <span className="text-purple-700 font-medium">4.9 تقييم</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/subscription"
                    className="inline-flex items-center justify-center px-8 py-5 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    ابدأ الدورة مجاناً
                    <ArrowRight className="w-5 h-5 mr-3" />
                  </Link>
                  <Link
                    href="#curriculum"
                    className="inline-flex items-center justify-center px-8 py-5 border-2 border-blue-600 text-blue-600 text-lg font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 hover:shadow-md"
                  >
                    عرض المنهج
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900 mb-2">مجاني</div>
                      <div className="text-slate-600">للمتدربين الجدد</div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-slate-700">محتوى تفاعلي شامل</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-slate-700">تمارين عملية</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-slate-700">شهادة إتمام</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-slate-700">دعم فني 24/7</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <div className="text-center text-sm text-slate-600">
                        المدرب: د. أحمد العتيبي - خبير معتمد من IIA
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* قسم المنهج التعليمي */}
        <section id="curriculum" className="relative py-24 lg:py-36 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                المنهج التعليمي
              </h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                منهج مصمم بعناية ليغطي جميع المفاهيم الأساسية مع التركيز على التطبيق العملي
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  week: "الأسبوع 1-2",
                  title: "مقدمة في المراجعة الداخلية",
                  topics: ["تعريف المراجعة الداخلية", "أهداف وأهمية المراجعة", "المعايير الدولية للممارسة المهنية", "دور المراجع الداخلي في المنظمة"],
                  duration: "8 ساعات",
                  color: "from-blue-500 to-blue-600"
                },
                {
                  week: "الأسبوع 3-4",
                  title: "إطار عمل المراجعة الداخلية",
                  topics: ["مكونات إطار المراجعة", "الكفاءة والموضوعية", "مبادئ الاستقلالية", "إدارة المخاطر والرقابة"],
                  duration: "10 ساعات",
                  color: "from-green-500 to-green-600"
                },
                {
                  week: "الأسبوع 5-6",
                  title: "عمليات المراجعة الأساسية",
                  topics: ["تخطيط المراجعة", "جمع الأدلة", "تقييم الضوابط", "إعداد تقارير المراجعة"],
                  duration: "12 ساعات",
                  color: "from-purple-500 to-purple-600"
                },
                {
                  week: "الأسبوع 7-8",
                  title: "التطبيقات العملية والتقييم",
                  topics: ["دراسات حالة سعودية", "تمارين عملية", "تقييم الدورة", "الخطوات التالية في مسيرتك المهنية"],
                  duration: "10 ساعات",
                  color: "from-orange-500 to-orange-600"
                }
              ].map((module, index) => (
                <motion.div
                  key={module.title}
                  className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 bg-gradient-to-r ${module.color} rounded-2xl flex items-center justify-center`}>
                        <BookOpen className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <div className="text-sm font-semibold text-slate-500 mb-1">{module.week}</div>
                          <h3 className="text-2xl font-bold text-slate-900">{module.title}</h3>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl">
                          <Clock className="w-4 h-4 text-slate-600" />
                          <span className="text-slate-700 font-medium">{module.duration}</span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3">
                        {module.topics.map((topic, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-slate-700">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* قسم المدرب */}
        <section className="relative py-24 lg:py-36 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                المدرب
              </h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                خبير معتمد يجمع بين الخبرة الأكاديمية والعملية
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-200">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-2">د. أحمد العتيبي</h3>
                      <p className="text-blue-600 font-medium mb-4">خبير مراجعة داخلية معتمد من IIA</p>
                      <p className="text-slate-700 leading-relaxed">
                        مدرب معتمد في مجال المراجعة الداخلية مع أكثر من 15 عاماً من الخبرة العملية في أكبر الشركات السعودية.
                        حاصل على شهادة CIA وشهادات متخصصة في إدارة المخاطر والرقابة الداخلية.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-slate-50 rounded-2xl">
                        <div className="text-2xl font-bold text-slate-900">15+</div>
                        <div className="text-sm text-slate-600">سنوات خبرة</div>
                      </div>
                      <div className="text-center p-4 bg-slate-50 rounded-2xl">
                        <div className="text-2xl font-bold text-slate-900">CIA</div>
                        <div className="text-sm text-slate-600">معتمد</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-purple-600" />
                        <span className="text-slate-700">محاضر في جامعة الملك سعود</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Building className="w-5 h-5 text-blue-600" />
                        <span className="text-slate-700">مدير مراجعة داخلية سابق في أرامكو</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-green-600" />
                        <span className="text-slate-700">مستشار لأكثر من 50 شركة سعودية</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto flex items-center justify-center">
                      <User className="w-32 h-32 text-slate-600" />
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                      4.9 ★ تقييم
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* قسم آراء المتدربين */}
        <section className="relative py-24 lg:py-36 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                آراء المتدربين
              </h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                ما يقوله المتدربون السابقون عن تجربتهم في الدورة
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "سارة الزهراني",
                  role: "محاسبة في شركة الاتصالات السعودية",
                  rating: 5,
                  comment: "دورة ممتازة غطت جميع المفاهيم الأساسية بطريقة مبسطة وعملية. ساعدتني كثيراً في فهم دوري كمراجع داخلي.",
                  avatar: "/avatars/natali-craig.png"
                },
                {
                  name: "محمد العمري",
                  role: "مدير مالي في شركة صناعية",
                  rating: 5,
                  comment: "المحتوى العملي والحالات الدراسية من السوق السعودي جعل الدورة فريدة. أنصح بها لكل من يبدأ في مجال المراجعة.",
                  avatar: "/avatars/drew-cano.png"
                },
                {
                  name: "فاطمة السالم",
                  role: "مطورة أعمال في بنك سعودي",
                  rating: 5,
                  comment: "شرح واضح ومفصل مع أمثلة عملية ساعدتني في تطبيق المفاهيم مباشرة في عملي. شكراً للمدرب الدكتور أحمد.",
                  avatar: "/avatars/orlando-diggs.png"
                }
              ].map((review, index) => (
                <motion.div
                  key={review.name}
                  className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-slate-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{review.name}</div>
                        <div className="text-sm text-slate-600">{review.role}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    <p className="text-slate-700 leading-relaxed italic">
                      "{review.comment}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* قسم التسجيل */}
        <section className="relative py-24 lg:py-36 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                ابدأ رحلتك المهنية اليوم
              </h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                انضم إلى آلاف المتخصصين الذين طوروا مهاراتهم مع منصة خطى
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12 border border-blue-100">
                <div className="text-center space-y-8">
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">
                      دورة أساسيات المراجعة الداخلية
                    </h3>
                    <p className="text-lg text-slate-700">
                      دورة مجانية شاملة للمبتدئين مع شهادة إتمام معتمدة
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900 mb-2">8</div>
                      <div className="text-slate-600">أسابيع تدريبية</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900 mb-2">40</div>
                      <div className="text-slate-600">ساعة تعليمية</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900 mb-2">CIA</div>
                      <div className="text-slate-600">معتمدة</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/subscription"
                      className="inline-flex items-center justify-center px-8 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      ابدأ الدورة مجاناً
                      <Play className="w-5 h-5 mr-3" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-8 py-5 border-2 border-slate-900 text-slate-900 text-lg font-semibold rounded-xl hover:bg-slate-50 transition-all duration-200"
                    >
                      لديك أسئلة؟
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <ChatAssistantWidget />
      <ProtectionToggle />

      {/* زر العودة للأعلى */}
      <AnimatePresence>
        {showScrollToTop && (
          <button
            className="fixed bottom-8 right-8 z-40 bg-blue-600 text-white p-4 rounded-full shadow transition hover:scale-105"
            onClick={scrollToTop}
            aria-label="العودة إلى الأعلى"
            style={{ transition: 'all 0.2s' }}
          >
            <ChevronUp className="w-6 h-6" />
          </button>
        )}
      </AnimatePresence>
    </div>
  );
}
