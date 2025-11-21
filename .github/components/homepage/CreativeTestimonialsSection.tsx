'use client';

import { useState } from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/primitives';
import Image from 'next/image';

/**
 * Creative Testimonials Section - تصميم إبداعي لآراء الطلاب
 * عرض بسيط بدون animations
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

  return (
    <section className="relative py-12 lg:py-16 overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-900">
      {/* Static Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-full blur-3xl" />
      </div>

      <Container size="xl" className="relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-primary-400" />
            <span className="text-primary-400 font-semibold text-lg">
              آراء حقيقية من طلابنا
            </span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            قصص نجاح
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              ملهمة
            </span>
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="relative max-w-5xl mx-auto">
          <div key={currentIndex} className="relative">
            <div className={`relative bg-gradient-to-br ${testimonials[currentIndex].gradient} p-1 rounded-3xl`}>
              {/* Static Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 rounded-3xl blur-2xl opacity-30" />

              {/* Card Content */}
              <div className="relative bg-neutral-900 rounded-3xl p-8 lg:p-12">
                {/* Quote Icon */}
                <div className="absolute top-6 left-6 w-16 h-16">
                  <Quote className="w-full h-full text-primary-400/20" />
                </div>

                <div className="relative z-10">
                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <div key={i}>
                        <Star className="w-6 h-6 text-warning-400 fill-warning-400" />
                      </div>
                    ))}
                  </div>

                  {/* Text */}
                  <blockquote className="text-xl lg:text-2xl text-neutral-100 leading-relaxed mb-8 font-medium text-center max-w-3xl mx-auto">
                    &ldquo;{testimonials[currentIndex].text}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center justify-center gap-6">
                    <div className="relative">
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
                            <span className="text-2xl font-bold text-white">
                              {testimonials[currentIndex].name.charAt(0)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-bold text-white mb-1">
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
          </div>

          {/* Navigation Dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex
                    ? 'bg-primary-400 scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`انتقل إلى الشهادة ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CreativeTestimonialsSection;
