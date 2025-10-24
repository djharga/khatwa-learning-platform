'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Shield, GraduationCap, BookOpen, CalculatorIcon, CheckCircle, Star, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const CareerPathSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  const careerPaths = [
    {
      id: 1,
      title: "المراجع الداخلي المتقدم",
      subtitle: "CIA معتمد",
      description: "برنامج شامل من 3 مستويات معتمد من IIA يغطي جميع جوانب المراجعة الداخلية الحديثة مع تطبيقات عملية وحالات دراسية حقيقية.",
      icon: Shield,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 via-blue-25 to-blue-50",
      borderColor: "border-blue-100",
      features: [
        "3 مستويات تعليمية",
        "500+ ساعة تدريبية",
        "شهادة CIA معتمدة"
      ],
      stats: {
        students: "2,450",
        rating: 4.9,
        duration: "20 أسبوع",
        price: "899 ريال"
      },
      href: "/auditors-fellowship",
      badge: "الأكثر طلباً",
      badgeColor: "bg-blue-500"
    },
    {
      id: 2,
      title: "المسار التنفيذي للمراجعة",
      subtitle: "للقيادات",
      description: "مسار متخصص للمديرين والقادة مع تركيز على الاستراتيجية والحوكمة الرشيدة والقيادة في مجال المراجعة الداخلية.",
      icon: GraduationCap,
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 via-green-25 to-green-50",
      borderColor: "border-green-100",
      features: [
        "للمديرين والقادة",
        "الاستراتيجية والحوكمة",
        "شهادات متقدمة"
      ],
      stats: {
        students: "1,890",
        rating: 4.8,
        duration: "16 أسبوع",
        price: "699 ريال"
      },
      href: "/auditors-fellowship",
      badge: "تنفيذي",
      badgeColor: "bg-green-500"
    },
    {
      id: 3,
      title: "المكتبة الرقمية المتخصصة",
      subtitle: "1000+ مورد",
      description: "أكبر مجموعة من المراجع والدراسات والأبحاث في المجال المالي والمراجعي مع تحديثات مستمرة ومحتوى متخصص.",
      icon: BookOpen,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 via-purple-25 to-purple-50",
      borderColor: "border-purple-100",
      features: [
        "مراجع محدثة",
        "دراسات وبحوث",
        "محتوى شامل"
      ],
      stats: {
        students: "3,200",
        rating: 4.9,
        duration: "مدى الحياة",
        price: "299 ريال/سنة"
      },
      href: "/resources",
      badge: "شامل",
      badgeColor: "bg-purple-500"
    },
    {
      id: 4,
      title: "حلول الإدارة المالية",
      subtitle: "حلول متكاملة",
      description: "أدوات متقدمة للإدارة المالية والرقابة التشغيلية مع دعم فني متخصص وأمان متقدم لحماية بياناتك.",
      icon: CalculatorIcon,
      gradient: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 via-orange-25 to-orange-50",
      borderColor: "border-orange-100",
      features: [
        "أدوات متقدمة",
        "24/7 دعم فني",
        "أمان متقدم"
      ],
      stats: {
        students: "1,650",
        rating: 4.7,
        duration: "12 أسبوع",
        price: "499 ريال"
      },
      href: "/financial-management",
      badge: "عملي",
      badgeColor: "bg-orange-500"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % careerPaths.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, careerPaths.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % careerPaths.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + careerPaths.length) % careerPaths.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentPath = careerPaths[currentSlide];

  return (
    <div className="relative">
      {/* Main Slider Container */}
      <div className="relative overflow-hidden rounded-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`relative bg-gradient-to-r ${currentPath.bgGradient} rounded-3xl p-8 lg:p-12 ${currentPath.borderColor} overflow-hidden`}
          >
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center min-h-[500px]">
              {/* Content Section */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${currentPath.gradient} rounded-2xl flex items-center justify-center border border-white/20`}>
                    <currentPath.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-sm font-semibold bg-gradient-to-r ${currentPath.gradient} text-white px-4 py-2 rounded-full`}>
                    {currentPath.subtitle}
                  </span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                    {currentPath.title}
                  </h3>
                  <p className="text-lg text-slate-700 leading-relaxed">
                    {currentPath.description}
                  </p>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-4">
                  {currentPath.features.map((feature, featureIndex) => (
                    <span key={featureIndex} className="flex items-center gap-2 text-sm text-slate-600 bg-white/60 px-3 py-2 rounded-full">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 py-4">
                  <div className="text-center p-3 bg-white/60 rounded-xl">
                    <div className="text-lg font-bold text-slate-900">{currentPath.stats.students}</div>
                    <div className="text-xs text-slate-600">طالب</div>
                  </div>
                  <div className="text-center p-3 bg-white/60 rounded-xl">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-lg font-bold text-slate-900">{currentPath.stats.rating}</span>
                    </div>
                    <div className="text-xs text-slate-600">تقييم</div>
                  </div>
                  <div className="text-center p-3 bg-white/60 rounded-xl">
                    <div className="text-lg font-bold text-slate-900">{currentPath.stats.duration}</div>
                    <div className="text-xs text-slate-600">المدة</div>
                  </div>
                  <div className="text-center p-3 bg-white/60 rounded-xl">
                    <div className="text-lg font-bold text-slate-900">{currentPath.stats.price}</div>
                    <div className="text-xs text-slate-600">السعر</div>
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href={currentPath.href}
                  className="group/btn relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 w-full lg:w-auto"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center gap-3">
                    ابدأ المسار الآن
                    <motion.svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </span>
                </Link>
              </motion.div>

              {/* Visual Section */}
              <motion.div
                className="relative lg:pl-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40">
                  {/* Progress Visualization */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">التقدم في المسار</span>
                      <span className={`text-xs px-3 py-1 rounded-full ${currentPath.badgeColor} text-white font-bold`}>
                        {currentPath.badge}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-slate-600">
                        <span>المستوى الأول</span>
                        <span>75% مكتمل</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className={`bg-gradient-to-r ${currentPath.gradient} h-3 rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: "75%" }}
                          transition={{ duration: 1.5, delay: 0.8 }}
                        />
                      </div>
                    </div>

                    {/* Achievement Badges */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-green-50 rounded-xl border border-green-200">
                        <div className="text-lg font-bold text-green-600">✓</div>
                        <div className="text-xs text-green-700">مكتمل</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="text-lg font-bold text-blue-600">○</div>
                        <div className="text-xs text-blue-700">قيد الدراسة</div>
                      </div>
                    </div>

                    {/* Next Milestone */}
                    <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                      <div className="text-sm font-bold text-slate-900 mb-2">الخطوة التالية</div>
                      <div className="text-sm text-slate-600">المستوى الثاني - التحليل المتقدم</div>
                      <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                        <div className={`bg-gradient-to-r ${currentPath.gradient} h-2 rounded-full w-1/3`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 left-4 right-4 flex justify-between items-center -translate-y-1/2 z-20">
          <button
            onClick={prevSlide}
            className="group p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-white/40"
            aria-label="السابق"
          >
            <ChevronRight className="w-6 h-6 text-slate-700 group-hover:text-slate-900 transition-colors" />
          </button>
          <button
            onClick={nextSlide}
            className="group p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-white/40"
            aria-label="التالي"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700 group-hover:text-slate-900 transition-colors" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {careerPaths.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`group relative w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-slate-900 scale-125'
                  : 'bg-slate-300 hover:bg-slate-400 hover:scale-110'
              }`}
              aria-label={`الانتقال إلى السلايد ${index + 1}`}
            >
              {index === currentSlide && (
                <motion.div
                  className="absolute inset-0 bg-slate-900 rounded-full"
                  layoutId="activeSlide"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-1 mt-6 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full"
            animate={{ width: `${((currentSlide + 1) / careerPaths.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default CareerPathSlider;
