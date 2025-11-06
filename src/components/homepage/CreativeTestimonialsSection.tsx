'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/primitives';
import Image from 'next/image';

/**
 * Creative Testimonials Section - تصميم إبداعي لآراء الطلاب
 * عرض مبتكر مع تأثيرات 3D و Parallax
 */

interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
  course?: string;
  gradient: string;
}

const CreativeTestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Removed 3D tilt effects - reduced motion
  // const mouseX = useMotionValue(0);
  // const mouseY = useMotionValue(0);
  // const springConfig = { stiffness: 500, damping: 100 };
  // const x = useSpring(mouseX, springConfig);
  // const y = useSpring(mouseY, springConfig);
  // const rotateX = useMotionValue(0);
  // const rotateY = useMotionValue(0);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'أحمد محمد',
      role: 'مدقق داخلي',
      image: '/avatars/student1.jpg',
      rating: 5,
      text: 'تجربة ممتازة! الدورات واضحة والمحتوى احترافي. استطعت تطوير مهاراتي بشكل كبير والحصول على شهادة معتمدة.',
      course: 'دورة المراجعة الداخلية',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: '2',
      name: 'سارة علي',
      role: 'محاسبة',
      image: '/avatars/student2.jpg',
      rating: 5,
      text: 'المنصة سهلت علي الوصول لمحتوى تعليمي عالي الجودة. الدعم الفني ممتاز والتفاعل مع المحاضرين رائع.',
      course: 'دورة المحاسبة المالية',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: '3',
      name: 'محمد حسن',
      role: 'خبير محاسبة',
      image: '/avatars/student3.jpg',
      rating: 5,
      text: 'أفضل منصة تعليمية تعاملت معها. المحتوى محدّث دائماً والموارد التعليمية شاملة ومفيدة جداً.',
      course: 'دورة المعايير المحاسبية',
      gradient: 'from-emerald-500 to-teal-500',
    },
  ];

  // Removed handleMouseMove and handleMouseLeave - reduced motion
  // const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (!isHovered) return;
    
  //   const rect = e.currentTarget.getBoundingClientRect();
  //   const centerX = rect.left + rect.width / 2;
  //   const centerY = rect.top + rect.height / 2;
    
  //   mouseX.set((e.clientX - centerX) / 20);
  //   mouseY.set((e.clientY - centerY) / 20);
    
  //   rotateX.set((e.clientY - centerY) / 15);
  //   rotateY.set((e.clientX - centerX) / 15);
  // };

  // const handleMouseLeave = () => {
  //   setIsHovered(false);
  //   mouseX.set(0);
  //   mouseY.set(0);
  //   rotateX.set(0);
  //   rotateY.set(0);
  // };

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <Container size="xl" className="relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-6 h-6 text-primary-400" />
            </motion.div>
            <span className="text-primary-400 font-semibold text-lg">
              آراء حقيقية من طلابنا
            </span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-6">
            قصص نجاح
            <br />
            <span className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
              ملهمة
            </span>
          </h2>
        </motion.div>

        {/* 3D Testimonial Cards */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className={`relative bg-gradient-to-br ${testimonials[currentIndex].gradient} p-1 rounded-3xl`}>
                {/* Glow Effect */}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 rounded-3xl blur-2xl opacity-50"
                  animate={{
                    opacity: 0.45,
                  }}
                  transition={{ duration: 0 }}
                />

                {/* Card Content */}
                <div className="relative bg-neutral-900 rounded-3xl p-8 lg:p-12 backdrop-blur-xl">
                  {/* Quote Icon */}
                  <motion.div
                    className="absolute top-6 left-6 w-16 h-16"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Quote className="w-full h-full text-primary-400/20" />
                  </motion.div>

                  <div className="relative z-10">
                    {/* Rating */}
                    <div className="flex items-center justify-center gap-1 mb-6">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        >
                          <Star className="w-6 h-6 text-warning-400 fill-warning-400" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Text */}
                    <blockquote className="text-xl lg:text-2xl text-neutral-800 dark:text-neutral-100 leading-relaxed mb-8 font-medium text-center max-w-3xl mx-auto">
                      "{testimonials[currentIndex].text}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center justify-center gap-6">
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${testimonials[currentIndex].gradient} p-0.5`}>
                          <div className="w-full h-full rounded-full bg-neutral-800 flex items-center justify-center overflow-hidden">
                            {testimonials[currentIndex].image ? (
                              <Image
                                src={testimonials[currentIndex].image}
                                alt={testimonials[currentIndex].name}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                                {testimonials[currentIndex].name.charAt(0)}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Ring Animation */}
                        <motion.div
                          className={`absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r ${testimonials[currentIndex].gradient} opacity-0 group-hover:opacity-100`}
                          animate={{
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        />
                      </motion.div>

                      <div className="text-right">
                        <div className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="text-sm text-neutral-400">
                          {testimonials[currentIndex].role}
                          {testimonials[currentIndex].course && (
                            <>
                              {' • '}
                              {testimonials[currentIndex].course}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-primary-400 scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                }`}

              >
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary-400 blur-md"
                    initial={{ opacity: 0.5, scale: 1 }}
                    animate={{ opacity: 0.75 }}
                    transition={{ duration: 0 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CreativeTestimonialsSection;

