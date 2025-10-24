'use client';
  
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials, highlightStats } from './testimonials-data';
  
/**
 * Individual testimonial card with user info, rating, content, and achievement metrics. Features gradient overlays, animated stars, and hover effects.
 */
interface TestimonialCardProps {
  testimonial: typeof testimonials[0];
  index: number;
}
  
const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => (
  <div
    key={index}
    className="group relative overflow-hidden rounded-3xl border border-purple-100/60 bg-white/80 p-8 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:bg-white hover:shadow-2xl animate-fadeIn"
  >
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-100/40 via-purple-100/30 to-slate-50/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    <div className="absolute -top-14 right-10 h-28 w-28 rounded-full bg-gradient-to-br from-emerald-200/50 via-purple-200/40 to-transparent blur-3xl" />
    <div className="absolute -bottom-16 left-12 h-32 w-32 rounded-full bg-gradient-to-br from-purple-200/40 via-emerald-200/40 to-transparent blur-3xl" />
  
    <div className="flex items-center justify-between">
      <div
        className="relative flex items-center gap-3"
      >
        <div className="relative h-14 w-14 overflow-hidden rounded-2xl">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-slate-900">
            {testimonial.name}
          </h4>
          <p className="text-sm text-slate-500">{testimonial.role}</p>
          <span className="mt-1 inline-flex items-center gap-2 rounded-full bg-emerald-100/70 px-3 py-1 text-[11px] font-semibold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            شهادة موثقة من {testimonial.company}
          </span>
        </div>
      </div>
      <div className="rounded-2xl bg-emerald-100/80 px-3 py-2 text-xs font-semibold text-emerald-700 shadow-sm">
        معدل {testimonial.rating}.0 ★
      </div>
    </div>
  
    <p className="mt-6 text-base leading-relaxed text-slate-800">
      &ldquo;{testimonial.content}&rdquo;
    </p>
  
    <div className="mt-6 flex items-center justify-between">
      <div className="flex items-center gap-1 text-amber-500">
        {[...Array(testimonial.rating)].map((_, i) => (
          <span
            key={i}
            className="inline-flex"
          >
            <Star className="h-5 w-5 fill-current text-amber-400" />
          </span>
        ))}
      </div>
      <div className="rounded-full bg-purple-100/80 px-4 py-2 text-xs font-medium text-purple-700 shadow-sm">
        {testimonial.company}
      </div>
    </div>
  
    <div className="mt-6 grid grid-cols-1 gap-3 rounded-2xl border border-purple-100/60 bg-white/70 p-4 text-sm text-slate-600 transition-colors duration-300 group-hover:border-emerald-200/70 group-hover:bg-white">
      <div className="flex items-center justify-between">
        <span className="font-medium text-slate-700">أبرز إنجاز</span>
        <span className="text-emerald-600">{testimonial.achievement}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-medium text-slate-700">أثر ملموس</span>
        <span className="text-purple-600">{testimonial.impact}</span>
      </div>
    </div>
  </div>
);
  
/**
 * Highlight statistic card displaying key platform metrics with gradient hover effects.
 */
interface HighlightStatCardProps {
  stat: typeof highlightStats[0];
}
  
const HighlightStatCard: React.FC<HighlightStatCardProps> = ({ stat }) => (
  <div
    key={stat.label}
    className="group relative overflow-hidden rounded-3xl border border-purple-100/60 bg-white/80 px-8 py-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white hover-lift-subtle"
  >
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-100/50 via-purple-100/40 to-slate-100/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    <p className="text-sm font-medium text-slate-500">{stat.label}</p>
    <p className="mt-2 text-2xl font-bold text-slate-900">{stat.value}</p>
  </div>
);
  
/**
 * Testimonials section displaying verified user reviews with ratings, achievements, and impact metrics. Features animated cards with gradient overlays, star ratings, and highlight statistics. Includes call-to-action button for registration.
 */
const TestimonialsComponent = () => {
  return (
    <section
      className="relative py-20 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-slate-50 via-purple-50/30 to-slate-100 overflow-hidden"
      id="testimonials"
    >
      {/* Enhanced decorative elements with static gradients */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-purple-200/20 to-indigo-200/20 rounded-full blur-xl"></div>
      </div>
  
      <div className="relative grid-container">
        <div
          className="text-center space-element-xl animate-fadeIn"
        >
          <h2 className="heading-1 gradient-text mb-8 text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
            آراء المتدربين
          </h2>
          <p className="body-text text-text-secondary content-wide mx-auto mb-16 text-lg sm:text-xl text-slate-700 max-w-3xl leading-relaxed">
            شهادات موثقة من قادة محاسبة ومدققين حصلوا على اعتماد رسمي عبر منصتنا.
          </p>
        </div>
  
        <div
          className="mb-14 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fadeIn"
        >
          {/* Platform statistics highlighting certifications, renewal rate, and average rating */}
          {highlightStats.map((item) => (
            <HighlightStatCard key={item.label} stat={item} />
          ))}
        </div>
  
        {/* Grid of testimonial cards with staggered entrance animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
  
        <div
          className="text-center mt-16 animate-fadeIn"
        >
          <Link href="/register" className="btn-modern-primary animate-gradient-shift hover-glow-primary no-underline">
            <motion.button
              className="bg-transparent border-none cursor-pointer w-full h-full"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                انضم إلينا
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Quote className="w-6 h-6" />
                </motion.div>
              </span>
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};
  
export default TestimonialsComponent;
