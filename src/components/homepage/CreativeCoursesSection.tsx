'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Star,
  TrendingUp 
} from 'lucide-react';
import { Container } from '@/components/ui/primitives';
import CourseCard from '@/components/CourseCard';
import type { Course } from '@/types/course';
import Image from 'next/image';

/**
 * Creative Courses Section - تصميم إبداعي للدورات
 * عرض مبتكر مع تأثيرات Parallax و 3D
 */

const CreativeCoursesSection = () => {
  const [activeCategory, setActiveCategory] = useState('جميع');
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);

  const categories = ['جميع', 'المراجعة الداخلية', 'المحاسبة', 'التدريب المهني'];

  const sampleCourses: Course[] = [
    {
      id: '1',
      title: 'أساسيات المراجعة الداخلية',
      description: 'دورة شاملة في المراجعة الداخلية والمعايير الدولية',
      instructor: {
        id: '1',
        name: 'د. أحمد محمد',
        title: 'خبير معتمد',
        avatar: '/avatars/instructor1.jpg',
        rating: 4.8,
        students: 1250,
        courses: 5,
      },
      level: 'متوسط' as any,
      category: 'المراجعة الداخلية' as any,
      duration: '6 أسابيع',
      students: 1250,
      rating: 4.8,
      reviewCount: 89,
      price: 499,
      originalPrice: 799,
      image: '/banar-cours.png',
      filesCount: 25,
      isOngoing: true,
      isPopular: true,
      isFeatured: true,
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-white dark:bg-neutral-900">
      {/* Creative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-br from-primary-200/30 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-accent-200/30 via-transparent to-transparent rounded-full blur-3xl" />
        </div>
        
        {/* Animated Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <Container size="xl" className="relative z-10">
        {/* Header with Animated Elements */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
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
              <TrendingUp className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </motion.div>
            <span className="text-primary-600 dark:text-primary-400 font-semibold">
              اكتشف الأكثر شعبية
            </span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-6">
            دورات تغير
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-clip-text text-transparent">
                مسارك المهني
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h2>
        </motion.div>

        {/* Floating Category Pills */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                relative px-6 py-3 rounded-full font-medium text-sm lg:text-base
                transition-all duration-300 overflow-hidden
                ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-elevation-4 scale-110'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }
              `}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeCategory === category && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {activeCategory === category && (
                  <Star className="w-4 h-4 fill-current" />
                )}
                {category}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Courses with 3D Effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {sampleCourses.map((course, index) => (
            <motion.div
              key={course.id}
              className="relative"
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
              }}
              onHoverStart={() => setHoveredCourse(course.id)}
              onHoverEnd={() => setHoveredCourse(null)}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <motion.div
                animate={{
                  rotateY: hoveredCourse === course.id ? 5 : 0,
                  rotateX: hoveredCourse === course.id ? -5 : 0,
                  scale: hoveredCourse === course.id ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative">
                  {/* Glow Effect */}
                  {hoveredCourse === course.id && (
                    <motion.div
                      className="absolute -inset-2 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 rounded-2xl blur-xl opacity-50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      exit={{ opacity: 0 }}
                    />
                  )}

                  <CourseCard course={course} variant="default" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA with Particle Effect */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all text-lg"
          >
            <span>استكشف المكتبة الكاملة</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};

export default CreativeCoursesSection;

