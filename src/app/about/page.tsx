'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, ChevronUp, Crown, GraduationCap, HelpCircle, Star, TrendingUp, User, Users, BookOpen, Brain, Shield, CheckCircle, CreditCard, Warehouse, FileText, Calculator, Award, Lock, EyeOff, FileX, HardDrive, Smartphone, Target, Heart, Zap, Globe } from 'lucide-react';
import ChatAssistantWidget from '@/components/ChatAssistantWidget';
import ContactComponent from '@/components/ContactComponent';
import ProtectionToggle from '@/components/ProtectionToggle';

export default function AboutPage() {
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
        className="fixed top-0 left-0 right-0 h-1 bg-primary-600 dark:bg-primary-500 z-50"
        style={{ width: `${scrollProgress}%`, transition: 'width 0.2s' }}
      />

      <div className="relative z-10">
        {/* قسم الهيرو */}
        <section className="relative bg-gradient-to-br from-white dark:from-neutral-900 via-neutral-50/30 dark:via-neutral-800/30 to-neutral-100/50 dark:to-neutral-800/50 py-24 lg:py-36 xl:py-48 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary-100/40 dark:from-primary-900/40 to-secondary-innovate-100/40 dark:to-secondary-innovate-900/40 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-success-100/30 dark:from-success-900/30 to-primary-100/30 dark:to-primary-900/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-8">
              <motion.div
                className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-full shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                <span className="text-slate-700 font-medium text-sm">منصة خطى للتعليم والتدريب</span>
              </motion.div>

              <motion.h1
                className="text-5xl lg:text-7xl xl:text-8xl font-bold text-primary-600 dark:text-primary-400 leading-none tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                عن خطى
              </motion.h1>

              <motion.p
                className="text-xl lg:text-2xl text-slate-700 leading-relaxed max-w-4xl mx-auto font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                منصة تعليمية رائدة تجمع بين الخبرة العملية والمعرفة الأكاديمية لتطوير المهارات المهنية في المجال المالي والمراجعي
              </motion.p>
            </div>
          </div>
        </section>

        {/* قسم القصة */}
        <section className="relative py-24 lg:py-36 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                    قصة بدايتنا
                  </h2>
                  <p className="text-lg text-slate-700 leading-relaxed">
                    تأسست منصة خطى في عام 2023 بهدف سد الفجوة بين التعليم الأكاديمي والمتطلبات العملية في سوق العمل السعودي والعربي.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">الرؤية</h3>
                      <p className="text-slate-700">
                        أن نصبح المنصة العربية الرائدة في تعليم وتطوير مهارات الشباب لمواكبة سوق العمل العالمي.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">الرسالة</h3>
                      <p className="text-slate-700">
                        تمكين الخريجين ورواد الأعمال من امتلاك المهارات والأدوات اللازمة لرفع جودة أعمال الشركات.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">القيم</h3>
                      <p className="text-slate-700">
                        التميز، الابتكار، النزاهة، والتركيز على النتائج العملية في كل ما نقدمه.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-slate-900 mb-2">5000+</div>
                      <div className="text-slate-600">متخصص معتمد</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-slate-50 rounded-2xl">
                        <div className="text-2xl font-bold text-slate-900">50+</div>
                        <div className="text-sm text-slate-600">خبير معتمد</div>
                      </div>
                      <div className="text-center p-4 bg-slate-50 rounded-2xl">
                        <div className="text-2xl font-bold text-slate-900">CIA</div>
                        <div className="text-sm text-slate-600">شهادات</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-slate-700">خبراء من أكبر الشركات السعودية</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-slate-700">شراكات مع الجامعات الرائدة</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-slate-700">معتمدة من IIA دولياً</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* قسم الفريق */}
        <section className="relative py-24 lg:py-36 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                فريق العمل
              </h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                نخبة من الخبراء والمتخصصين في مجالات المحاسبة والمراجعة الداخلية
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "د. أحمد العتيبي",
                  role: "مؤسس ومدير تنفيذي",
                  specialty: "خبير مراجعة داخلية معتمد من IIA",
                  experience: "15+ سنة خبرة",
                  image: "/avatars/drew-cano.png"
                },
                {
                  name: "د. سارة المحمد",
                  role: "مديرة التعليم",
                  specialty: "خبيرة في تحليل المخاطر المالية",
                  experience: "12+ سنة خبرة",
                  image: "/avatars/natali-craig.png"
                },
                {
                  name: "د. محمد السالم",
                  role: "مدير الاستشارات",
                  specialty: "خبير حوكمة شركات وامتثال",
                  experience: "18+ سنة خبرة",
                  image: "/avatars/orlando-diggs.png"
                }
              ].map((member, index) => (
                <motion.div
                  key={member.name}
                  className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="space-y-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto flex items-center justify-center">
                      <User className="w-12 h-12 text-slate-600" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                      <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">{member.role}</p>
                      <p className="text-sm text-slate-600 mb-3">{member.specialty}</p>
                      <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
                        {member.experience}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* قسم الإنجازات */}
        <section className="relative py-24 lg:py-36 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                إنجازاتنا
              </h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                مسيرة من التميز والابتكار في خدمة التعليم المهني
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  number: "5000+",
                  label: "متخصص معتمد",
                  icon: <Users className="w-8 h-8" />,
                  color: "from-blue-500 to-blue-600"
                },
                {
                  number: "50+",
                  label: "دورة تدريبية",
                  icon: <BookOpen className="w-8 h-8" />,
                  color: "from-green-500 to-green-600"
                },
                {
                  number: "95%",
                  label: "رضا المتدربين",
                  icon: <Star className="w-8 h-8" />,
                  color: "from-purple-500 to-purple-600"
                },
                {
                  number: "24/7",
                  label: "دعم فني",
                  icon: <Shield className="w-8 h-8" />,
                  color: "from-orange-500 to-orange-600"
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="space-y-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto`}>
                      <div className="text-white">
                        {stat.icon}
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-slate-900 mb-2">{stat.number}</div>
                      <div className="text-slate-600 font-medium">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* قسم التواصل */}
        <section className="relative py-24 lg:py-36 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                تواصل معنا
              </h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                نحن هنا لمساعدتك في رحلتك المهنية وتطوير مهاراتك
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <ContactComponent />
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
            className="fixed bottom-8 right-8 z-40 bg-primary-600 dark:bg-primary-500 text-white p-4 rounded-full shadow-lg shadow-primary-500/50 transition hover:scale-105"
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
